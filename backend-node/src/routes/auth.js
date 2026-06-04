const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const { authenticate, supabaseAdmin } = require("../middleware/authMiddleware");

const SALT_ROUNDS = 12;

// Cliente con anon key para operaciones de sesión (signInWithPassword devuelve session con este cliente)
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Validación de inputs (EP 2.6a) ────────────────────────────────────────────
// Validación en el backend, independiente del cliente, para proteger contra
// datos malformados o maliciosos sin importar el origen de la solicitud.

// RUT chileno: 7-8 dígitos, guión, dígito verificador (0-9 o k/K). Sin puntos.
function validarRut(rut) {
  return /^\d{7,8}-[\dkK]$/.test(rut);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mínimo 6 caracteres (Supabase Auth también impone este límite por defecto)
function validarPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

const router = Router();

// POST /auth/registro
router.post("/registro", async (req, res, next) => {
  try {
    // ── Sanitización de inputs (EP 2.6d) ──────────────────────────────────────
    // .trim() normaliza los valores antes de validar o usar en consultas.
    // El Supabase SDK usa internamente consultas parametrizadas (prepared statements),
    // lo que previene inyección SQL sin necesidad de escapado manual.
    const email    = (req.body.email    || "").trim();
    const password = (req.body.password || "").trim();
    const nombre   = (req.body.nombre   || "").trim();
    const rut      = (req.body.rut      || "").trim();
    const telefono         = (req.body.telefono         || "").trim() || null;
    const fecha_nacimiento = (req.body.fecha_nacimiento || "").trim() || null;
    const genero   = (req.body.genero  || "").trim() || null;
    const region   = (req.body.region  || "").trim() || null;
    const comuna   = (req.body.comuna  || "").trim() || null;

    // ── Validación de inputs (EP 2.6a) ────────────────────────────────────────
    const errores = {};

    if (!nombre) {
      errores.nombre = "El nombre es requerido.";
    }
    if (!rut) {
      errores.rut = "El RUT es requerido.";
    } else if (!validarRut(rut)) {
      errores.rut = "Formato de RUT inválido. Use el formato 12345678-9 (sin puntos, con guión).";
    }
    if (!email) {
      errores.email = "El email es requerido.";
    } else if (!validarEmail(email)) {
      errores.email = "Formato de email inválido.";
    }
    if (!password) {
      errores.password = "La contraseña es requerida.";
    } else if (!validarPassword(password)) {
      errores.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({ error: "Datos de registro inválidos.", errores });
    }

    // Verificar si el RUT ya está registrado antes de crear el usuario
    const { data: rutExistente } = await supabaseAdmin
      .from("perfiles")
      .select("id")
      .eq("rut", rut)
      .maybeSingle();

    if (rutExistente) {
      return res.status(409).json({ error: "El RUT ya está registrado." });
    }

    // ── Hash de contraseña con bcrypt (EP 2.6b) ───────────────────────────────
    // Se genera un hash con factor de costo 12 (2^12 = 4096 iteraciones, ~300ms).
    // Este hash se almacena en perfiles.password_hash para verificación explícita.
    // Supabase Auth también almacena su propio hash internamente para gestionar JWTs.
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Crear usuario en Supabase Auth (maneja la sesión y generación de JWT)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { nombre, rut },
      email_confirm: true,
    });

    if (authError) {
      if (
        authError.message?.toLowerCase().includes("already registered") ||
        authError.message?.toLowerCase().includes("already been registered")
      ) {
        return res.status(409).json({ error: "El email ya está registrado." });
      }
      throw authError;
    }

    // Actualizar perfil con datos adicionales + password_hash bcrypt (EP 2.6b)
    // El trigger on_auth_user_created ya creó la fila base en perfiles.
    await supabaseAdmin
      .from("perfiles")
      .update({
        rut,
        telefono,
        fecha_nacimiento,
        genero,
        region,
        comuna,
        password_hash,
      })
      .eq("id", authData.user.id);

    // Iniciar sesión para obtener el token JWT de Supabase
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) throw signInError;

    const { data: perfil } = await supabaseAdmin
      .from("perfiles")
      .select("id, nombre, rol, sucursal_id")
      .eq("id", authData.user.id)
      .single();

    res.status(201).json({ token: signInData.session.access_token, user: perfil });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login — recibe rut + password
router.post("/login", async (req, res, next) => {
  try {
    // ── Sanitización de inputs (EP 2.6d) ──────────────────────────────────────
    // .trim() elimina espacios que podrían usarse para evadir validaciones.
    // Las consultas al SDK de Supabase usan parámetros vinculados, protegiendo
    // contra inyección SQL sin necesidad de escapado adicional.
    const rut      = (req.body.rut      || "").trim();
    const password = (req.body.password || "").trim();

    // ── Validación de inputs (EP 2.6a) ────────────────────────────────────────
    const errores = {};

    if (!rut) {
      errores.rut = "El RUT es requerido.";
    } else if (!validarRut(rut)) {
      errores.rut = "Formato de RUT inválido. Use el formato 12345678-9 (sin puntos, con guión).";
    }
    if (!password) {
      errores.password = "La contraseña es requerida.";
    } else if (!validarPassword(password)) {
      errores.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (Object.keys(errores).length > 0) {
      return res.status(400).json({ error: "Datos de login inválidos.", errores });
    }

    // Buscar perfil por RUT — consulta parametrizada (protección SQL injection, EP 2.6d)
    const { data: perfil, error: perfilError } = await supabaseAdmin
      .from("perfiles")
      .select("id, password_hash")
      .eq("rut", rut)
      .single();

    if (perfilError || !perfil) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos." });
    }

    // ── Verificación con bcrypt (EP 2.6b) ─────────────────────────────────────
    // Si el perfil tiene un hash bcrypt almacenado (usuarios registrados tras EP 2.6),
    // se compara el password ingresado contra el hash ANTES de llamar a Supabase Auth.
    // Si no coincide, la autenticación falla inmediatamente sin consultar el proveedor.
    // Usuarios anteriores a EP 2.6 (password_hash = NULL) continúan el flujo normal.
    if (perfil.password_hash) {
      const hashValido = await bcrypt.compare(password, perfil.password_hash);
      if (!hashValido) {
        return res.status(401).json({ error: "RUT o contraseña incorrectos." });
      }
    }

    // Obtener email desde auth.users para iniciar sesión en Supabase Auth
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(perfil.id);

    if (userError || !userData?.user) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos." });
    }

    // Autenticar con Supabase Auth para generar el token JWT de sesión
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email: userData.user.email,
      password,
    });

    if (signInError) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos." });
    }

    if (!signInData?.session?.access_token) {
      return res.status(500).json({ error: "No se pudo generar sesión." });
    }

    const { data: fullPerfil } = await supabaseAdmin
      .from("perfiles")
      .select("id, nombre, rol, sucursal_id")
      .eq("id", perfil.id)
      .single();

    res.json({ token: signInData.session.access_token, user: fullPerfil });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me — devuelve el perfil del usuario autenticado
router.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});

module.exports = router;

const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const { authenticate, supabaseAdmin } = require("../middleware/authMiddleware");

// Cliente con anon key para operaciones de sesión (signInWithPassword devuelve session con este cliente)
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const router = Router();

// POST /auth/registro
router.post("/registro", async (req, res, next) => {
  try {
    const { email, password, nombre, rut, telefono, fecha_nacimiento, genero, region, comuna } = req.body;

    if (!email || !password || !nombre || !rut) {
      return res.status(400).json({ error: "email, password, nombre y rut son requeridos" });
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { nombre, rut },
      email_confirm: true,
    });

    if (authError) {
      if (authError.message?.toLowerCase().includes("already registered") ||
          authError.message?.toLowerCase().includes("already been registered")) {
        return res.status(409).json({ error: "El email ya está registrado" });
      }
      throw authError;
    }

    // Update profile with additional fields (trigger already created base profile)
    await supabaseAdmin
      .from("perfiles")
      .update({ rut, telefono, fecha_nacimiento: fecha_nacimiento || null, genero, region, comuna })
      .eq("id", authData.user.id);

    // Sign in to get a session token (anon client generates a real session with access_token)
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
    const { rut, password } = req.body;

    if (!rut || !password) {
      return res.status(400).json({ error: "rut y password son requeridos" });
    }

    // Find the user ID by RUT
    const { data: perfil, error: perfilError } = await supabaseAdmin
      .from("perfiles")
      .select("id")
      .eq("rut", rut)
      .single();

    if (perfilError || !perfil) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos" });
    }

    // Get email from auth.users via admin API
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(perfil.id);

    if (userError || !userData?.user) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos" });
    }

    // Authenticate with email + password (anon client generates a real session with access_token)
    const { data: signInData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email: userData.user.email,
      password,
    });

    if (signInError) {
      return res.status(401).json({ error: "RUT o contraseña incorrectos" });
    }

    if (!signInData?.session?.access_token) {
      return res.status(500).json({ error: "No se pudo generar sesión" });
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

const bcrypt = require("bcrypt");
const repository = require("../../data/repositories/authRepository");
const { validarRut, validarEmail, validarPassword } = require("../authValidators");

const SALT_ROUNDS = 12;

async function registerUserUseCase(body) {
  // ── Sanitización de inputs (EP 2.6d) ──────────────────────────────────────
  const email = (body.email || "").trim();
  const password = (body.password || "").trim();
  const nombre = (body.nombre || "").trim();
  const rut = (body.rut || "").trim();
  const telefono = (body.telefono || "").trim() || null;
  const fecha_nacimiento = (body.fecha_nacimiento || "").trim() || null;
  const genero = (body.genero || "").trim() || null;
  const region = (body.region || "").trim() || null;
  const comuna = (body.comuna || "").trim() || null;

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
    const err = new Error("Datos de registro inválidos.");
    err.status = 400;
    err.errores = errores;
    throw err;
  }

  // Verificar si el RUT ya está registrado antes de crear el usuario
  const rutExistente = await repository.findPerfilByRut(rut);
  if (rutExistente) {
    const err = new Error("El RUT ya está registrado.");
    err.status = 409;
    throw err;
  }

  // ── Hash de contraseña con bcrypt (EP 2.6b) ───────────────────────────────
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  // Crear usuario en Supabase Auth (el trigger on_auth_user_created crea la fila base en perfiles)
  const { data: authData, error: authError } = await repository.createAuthUser({
    email,
    password,
    nombre,
    rut,
  });

  if (authError) {
    if (
      authError.message?.toLowerCase().includes("already registered") ||
      authError.message?.toLowerCase().includes("already been registered")
    ) {
      const err = new Error("El email ya está registrado.");
      err.status = 409;
      throw err;
    }
    throw authError;
  }

  // Completar perfil con datos adicionales + password_hash bcrypt (EP 2.6b)
  await repository.updatePerfilData(authData.user.id, {
    rut,
    telefono,
    fecha_nacimiento,
    genero,
    region,
    comuna,
    password_hash,
  });

  // Iniciar sesión para obtener el token JWT de Supabase
  const { data: signInData, error: signInError } = await repository.signIn(email, password);
  if (signInError) throw signInError;

  const perfil = await repository.findResumenById(authData.user.id);

  return { token: signInData.session.access_token, user: perfil };
}

module.exports = { registerUserUseCase };

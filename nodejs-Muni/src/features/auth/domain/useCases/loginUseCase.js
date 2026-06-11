const bcrypt = require("bcrypt");
const repository = require("../../data/repositories/authRepository");
const { validarRut, validarPassword } = require("../authValidators");

async function loginUseCase(body) {
  // ── Sanitización de inputs (EP 2.6d) ──────────────────────────────────────
  const rut = (body.rut || "").trim();
  const password = (body.password || "").trim();

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
    const err = new Error("Datos de login inválidos.");
    err.status = 400;
    err.errores = errores;
    throw err;
  }

  // Buscar perfil por RUT — consulta parametrizada (protección SQL injection, EP 2.6d)
  const { data: perfil, error: perfilError } = await repository.findCredencialesByRut(rut);
  if (perfilError || !perfil) {
    const err = new Error("RUT o contraseña incorrectos.");
    err.status = 401;
    throw err;
  }

  // ── Verificación con bcrypt (EP 2.6b) ─────────────────────────────────────
  // Usuarios anteriores a EP 2.6 (password_hash = NULL) continúan el flujo normal.
  if (perfil.password_hash) {
    const hashValido = await bcrypt.compare(password, perfil.password_hash);
    if (!hashValido) {
      const err = new Error("RUT o contraseña incorrectos.");
      err.status = 401;
      throw err;
    }
  }

  // Obtener email desde auth.users para iniciar sesión en Supabase Auth
  const { data: userData, error: userError } = await repository.getAuthUserById(perfil.id);
  if (userError || !userData?.user) {
    const err = new Error("RUT o contraseña incorrectos.");
    err.status = 401;
    throw err;
  }

  // Autenticar con Supabase Auth para generar el token JWT de sesión
  const { data: signInData, error: signInError } = await repository.signIn(userData.user.email, password);
  if (signInError) {
    const err = new Error("RUT o contraseña incorrectos.");
    err.status = 401;
    throw err;
  }
  if (!signInData?.session?.access_token) {
    const err = new Error("No se pudo generar sesión.");
    err.status = 500;
    throw err;
  }

  const fullPerfil = await repository.findResumenById(perfil.id);

  return { token: signInData.session.access_token, user: fullPerfil };
}

module.exports = { loginUseCase };

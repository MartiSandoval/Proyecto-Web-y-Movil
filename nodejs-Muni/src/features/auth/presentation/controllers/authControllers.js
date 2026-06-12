const { registerUserUseCase } = require("../../domain/useCases/registerUserUseCase");
const { loginUseCase } = require("../../domain/useCases/loginUseCase");

async function registro(req, res, next) {
  try {
    const result = await registerUserUseCase(req.body);
    res.status(201).json({ token: result.token, user: result.user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginUseCase(req.body);
    res.json({ token: result.token, user: result.user });
  } catch (err) {
    next(err);
  }
}

// /auth/me — el middleware authenticate ya cargó el perfil en req.user
function getCurrentUser(req, res) {
  res.json(req.user);
}

const actualizarPerfilUseCase = require("../../domain/useCases/actualizarPerfilUseCase");

async function actualizarPerfil(req, res, next) {
  try {
    const usuarioId = req.user?.id || req.user?.sub;
    const datosActualizados = req.body;

    if (!usuarioId) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    const perfilActualizado = await actualizarPerfilUseCase(usuarioId, datosActualizados);
    res.status(200).json(perfilActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registro, login, getCurrentUser, actualizarPerfil };

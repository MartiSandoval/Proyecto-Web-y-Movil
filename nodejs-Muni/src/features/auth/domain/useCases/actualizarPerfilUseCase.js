const authRepository = require("../../data/repositories/authRepository");

async function actualizarPerfilUseCase(usuarioId, datosActualizados) {
  return await authRepository.actualizarPerfil(usuarioId, datosActualizados);
}

module.exports = actualizarPerfilUseCase;
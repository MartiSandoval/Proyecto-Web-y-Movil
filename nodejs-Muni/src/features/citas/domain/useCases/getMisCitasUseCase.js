const repository = require("../../data/repositories/citasRepository");

async function getMisCitasUseCase(usuarioId) {
  return repository.findByUsuario(usuarioId);
}

module.exports = { getMisCitasUseCase };

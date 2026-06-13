const repository = require("../../data/repositories/citasRepository");

async function getMisCitasUseCase(usuarioId, page = 1, limit = 10) {
  return repository.findByUsuario(usuarioId, page, limit);
}

module.exports = { getMisCitasUseCase };

const repository = require("../../data/repositories/bloqueosRepository");

async function getBloqueosUseCase(tramiteId, fecha) {
  if (!tramiteId) {
    const err = new Error("tramite_id es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.findByTramite(tramiteId, fecha);
}

module.exports = { getBloqueosUseCase };

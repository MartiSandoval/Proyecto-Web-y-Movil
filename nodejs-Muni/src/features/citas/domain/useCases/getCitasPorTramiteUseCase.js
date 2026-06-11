const repository = require("../../data/repositories/citasRepository");

async function getCitasPorTramiteUseCase(tramiteId, fecha) {
  if (!tramiteId) {
    const err = new Error("El ID del trámite es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.findByTramite(tramiteId, fecha);
}

module.exports = { getCitasPorTramiteUseCase };

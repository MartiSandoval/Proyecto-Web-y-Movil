const citasRepository = require("../../data/repositories/citasRepository");

async function cancelarMiCitaUseCase(citaId, usuarioId) {
  return await citasRepository.cancelarCitaCiudadano(citaId, usuarioId);
}

module.exports = cancelarMiCitaUseCase;
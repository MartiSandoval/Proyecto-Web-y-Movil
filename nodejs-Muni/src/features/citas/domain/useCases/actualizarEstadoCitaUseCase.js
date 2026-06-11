const repository = require("../../data/repositories/citasRepository");

const ESTADOS_VALIDOS = ["pendiente", "confirmado", "cancelado", "completado"];

async function actualizarEstadoCitaUseCase(id, estado) {
  if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
    const err = new Error(`Estado inválido. Debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`);
    err.status = 400;
    throw err;
  }
  return repository.updateEstado(id, estado);
}

module.exports = { actualizarEstadoCitaUseCase };

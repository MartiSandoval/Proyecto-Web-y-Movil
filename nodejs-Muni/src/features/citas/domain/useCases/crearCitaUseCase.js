const repository = require("../../data/repositories/citasRepository");

async function crearCitaUseCase(usuarioId, { tramite_id, fecha, hora }) {
  if (!tramite_id || !fecha || !hora) {
    const err = new Error("tramite_id, fecha y hora son requeridos");
    err.status = 400;
    throw err;
  }
  return repository.insertCita({ usuarioId, tramiteId: tramite_id, fecha, hora });
}

module.exports = { crearCitaUseCase };

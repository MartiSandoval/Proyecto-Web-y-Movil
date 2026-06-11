const repository = require("../../data/repositories/bloqueosRepository");

const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const HORA_REGEX = /^\d{2}:\d{2}(:\d{2})?$/;

async function crearBloqueoUseCase(createdBy, { tramite_id, fecha, hora, motivo }) {
  if (!tramite_id) {
    const err = new Error("tramite_id es obligatorio");
    err.status = 400;
    throw err;
  }
  if (!fecha || !FECHA_REGEX.test(fecha)) {
    const err = new Error("fecha es obligatoria con formato YYYY-MM-DD");
    err.status = 400;
    throw err;
  }
  if (hora && !HORA_REGEX.test(hora)) {
    const err = new Error("hora debe tener formato HH:MM");
    err.status = 400;
    throw err;
  }

  return repository.insertBloqueo({
    tramiteId: tramite_id,
    fecha,
    hora: hora || null,
    motivo,
    createdBy,
  });
}

module.exports = { crearBloqueoUseCase };

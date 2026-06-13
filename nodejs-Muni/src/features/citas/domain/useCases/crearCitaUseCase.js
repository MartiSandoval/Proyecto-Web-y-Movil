const repository = require("../../data/repositories/citasRepository");
const notificacionesRepo = require("../../../notificaciones/data/repositories/notificacionesRepository");
async function crearCitaUseCase(usuarioId, { tramite_id, fecha, hora }) {
  if (!tramite_id || !fecha || !hora) {
    const err = new Error("tramite_id, fecha y hora son requeridos");
    err.status = 400;
    throw err;
  }

  const nuevaCita = await repository.insertCita({ usuarioId, tramiteId: tramite_id, fecha, hora });

  notificacionesRepo.crearNotificacion(
    "Nueva Cita Agendada",
    `Un ciudadano ha agendado una nueva cita. Revisa el calendario para más detalles.`
  ).catch(() => {});

  return nuevaCita;
}

module.exports = { crearCitaUseCase };
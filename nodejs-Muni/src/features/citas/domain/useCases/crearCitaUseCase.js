const repository = require("../../data/repositories/citasRepository");
const notificacionesRepo = require("../../../notificaciones/data/repositories/notificacionesRepository");
async function crearCitaUseCase(usuarioId, { tramite_id, fecha, hora }) {
  if (!tramite_id || !fecha || !hora) {
    const err = new Error("tramite_id, fecha y hora son requeridos");
    err.status = 400;
    throw err;
  }

  // 1. PRIMERO guardamos la cita
  const nuevaCita = await repository.insertCita({ usuarioId, tramiteId: tramite_id, fecha, hora });

  // 2. DESPUÉS lanzamos la notificación al admin
  await notificacionesRepo.crearNotificacion(
    "Nueva Cita Agendada",
    `Un ciudadano ha agendado una nueva cita. Revisa el calendario para más detalles.`
  );

  // 3. Retornamos la cita creada
  return nuevaCita;
}

module.exports = { crearCitaUseCase };
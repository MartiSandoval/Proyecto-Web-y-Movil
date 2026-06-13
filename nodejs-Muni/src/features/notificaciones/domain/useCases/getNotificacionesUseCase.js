const notificacionesRepo = require("../../data/repositories/notificacionesRepository");

async function getNotificacionesUseCase() {
  // Aquí podrías agregar lógica extra de negocio si fuera necesario en el futuro
  return await notificacionesRepo.obtenerNotificaciones();
}

module.exports = { getNotificacionesUseCase };
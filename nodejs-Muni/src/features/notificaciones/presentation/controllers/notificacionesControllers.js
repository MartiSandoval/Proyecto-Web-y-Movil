const { getNotificacionesUseCase } = require("../../domain/useCases/getNotificacionesUseCase");
const notificacionesRepo = require("../../data/repositories/notificacionesRepository");

async function marcarLeidas(req, res, next) {
  try {
    await notificacionesRepo.marcarTodasLeidas();
    res.status(200).json({ success: true, message: "Notificaciones marcadas como leídas" });
  } catch (err) {
    next(err);
  }
}

async function getNotificaciones(req, res, next) {
  try {
    const notificaciones = await getNotificacionesUseCase();
    res.status(200).json(notificaciones);
  } catch (err) {
    next(err);
  }
}

module.exports = { getNotificaciones, marcarLeidas };
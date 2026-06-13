const { getNotificacionesUseCase } = require("../../domain/useCases/getNotificacionesUseCase");
const notificacionesRepo = require("../../data/repositories/notificacionesRepository");

async function marcarLeidas(req, res, next) {
  try {
    await notificacionesRepo.marcarTodasLeidas();
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function marcarUnaLeida(req, res, next) {
  try {
    const { id } = req.params;
    await notificacionesRepo.marcarUnaLeida(id);
    res.status(200).json({ success: true });
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

module.exports = { getNotificaciones, marcarLeidas, marcarUnaLeida };
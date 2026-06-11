const { getDisponibilidadUseCase } = require("../../domain/useCases/getDisponibilidadUseCase");

async function getDisponibilidad(req, res, next) {
  try {
    const { tramiteId, fecha } = req.params;
    const disponibilidad = await getDisponibilidadUseCase(tramiteId, fecha);
    res.json(disponibilidad);
  } catch (err) {
    next(err);
  }
}

module.exports = { getDisponibilidad };

const { crearBloqueoUseCase } = require("../../domain/useCases/crearBloqueoUseCase");
const { getBloqueosUseCase } = require("../../domain/useCases/getBloqueosUseCase");
const { eliminarBloqueoUseCase } = require("../../domain/useCases/eliminarBloqueoUseCase");

async function crearBloqueo(req, res, next) {
  try {
    const { tramite_id, fecha, hora, motivo } = req.body;
    const bloqueo = await crearBloqueoUseCase(req.user.id, { tramite_id, fecha, hora, motivo });
    res.status(201).json(bloqueo);
  } catch (err) {
    next(err);
  }
}

async function obtenerBloqueos(req, res, next) {
  try {
    const { tramite_id, fecha } = req.query;
    const bloqueos = await getBloqueosUseCase(tramite_id, fecha);
    res.status(200).json(bloqueos);
  } catch (err) {
    next(err);
  }
}

async function eliminarBloqueo(req, res, next) {
  try {
    const { id } = req.params;
    await eliminarBloqueoUseCase(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { crearBloqueo, obtenerBloqueos, eliminarBloqueo };

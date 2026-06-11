const { getTramitesUseCase } = require("../../domain/useCases/getTramitesUseCase");
const { getTramiteUseCase } = require("../../domain/useCases/getTramiteUseCase");
const { crearTramiteUseCase } = require("../../domain/useCases/crearTramiteUseCase");
const { actualizarTramiteUseCase } = require("../../domain/useCases/actualizarTramiteUseCase");
const { eliminarTramiteUseCase } = require("../../domain/useCases/eliminarTramiteUseCase");

async function getTramites(req, res, next) {
  try {
    const { sucursal_id } = req.query;
    const tramites = await getTramitesUseCase(sucursal_id);
    res.json(tramites);
  } catch (err) {
    next(err);
  }
}

async function getTramiteById(req, res, next) {
  try {
    const { id } = req.params;
    const tramite = await getTramiteUseCase(id);
    res.json(tramite);
  } catch (err) {
    next(err);
  }
}

async function crearTramite(req, res, next) {
  try {
    const { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos } = req.body;
    const tramite = await crearTramiteUseCase({
      sucursal_id,
      nombre,
      descripcion,
      costo,
      es_en_linea,
      documentos_requeridos,
    });
    res.status(201).json(tramite);
  } catch (err) {
    next(err);
  }
}

async function actualizarTramite(req, res, next) {
  try {
    const { id } = req.params;
    const { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos } = req.body;
    const tramite = await actualizarTramiteUseCase(id, {
      sucursal_id,
      nombre,
      descripcion,
      costo,
      es_en_linea,
      documentos_requeridos,
    });
    res.status(200).json(tramite);
  } catch (err) {
    next(err);
  }
}

async function eliminarTramite(req, res, next) {
  try {
    const { id } = req.params;
    const tramite = await eliminarTramiteUseCase(id);
    res.status(200).json({ mensaje: "Trámite eliminado correctamente", tramite });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTramites, getTramiteById, crearTramite, actualizarTramite, eliminarTramite };

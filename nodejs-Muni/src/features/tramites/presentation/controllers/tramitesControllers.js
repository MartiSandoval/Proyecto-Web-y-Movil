const { getTramitesUseCase } = require("../../domain/useCases/getTramitesUseCase");
const { getTramiteUseCase } = require("../../domain/useCases/getTramiteUseCase");
const { crearTramiteUseCase } = require("../../domain/useCases/crearTramiteUseCase");
const { actualizarTramiteUseCase } = require("../../domain/useCases/actualizarTramiteUseCase");
const { eliminarTramiteUseCase } = require("../../domain/useCases/eliminarTramiteUseCase");
const { asignarFuncionariosUseCase } = require("../../domain/useCases/asignarFuncionariosUseCase");

async function getTramites(req, res, next) {
  try {
    const { sucursal_id, funcionario_id } = req.query;
    const tramites = await getTramitesUseCase(sucursal_id, funcionario_id);
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
    const { nombre, descripcion, costo, es_en_linea, documentos_requeridos, horarios } = req.body;
    // El jefe solo crea trámites para su propia sucursal; created_by sale del token.
    const tramite = await crearTramiteUseCase(
      {
        sucursal_id: req.user.sucursal_id,
        nombre,
        descripcion,
        costo,
        es_en_linea,
        documentos_requeridos,
        created_by: req.user.id,
      },
      horarios
    );
    res.status(201).json(tramite);
  } catch (err) {
    next(err);
  }
}

async function actualizarTramite(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, costo, es_en_linea, documentos_requeridos, horarios } = req.body;
    const tramite = await actualizarTramiteUseCase(
      id,
      {
        sucursal_id: req.user.sucursal_id,
        nombre,
        descripcion,
        costo,
        es_en_linea,
        documentos_requeridos,
      },
      horarios
    );
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

async function asignarFuncionarios(req, res, next) {
  try {
    const { id } = req.params;
    const { funcionario_ids } = req.body;
    const funcionarioIds = await asignarFuncionariosUseCase(id, funcionario_ids);
    res.status(200).json({ funcionarioIds });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTramites,
  getTramiteById,
  crearTramite,
  actualizarTramite,
  eliminarTramite,
  asignarFuncionarios,
};

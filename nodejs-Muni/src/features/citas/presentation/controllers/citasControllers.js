const { crearCitaUseCase } = require("../../domain/useCases/crearCitaUseCase");
const { registrarArchivoUseCase } = require("../../domain/useCases/registrarArchivoUseCase");
const { actualizarEstadoCitaUseCase } = require("../../domain/useCases/actualizarEstadoCitaUseCase");
const { getMisCitasUseCase } = require("../../domain/useCases/getMisCitasUseCase");
const { getCitasPorTramiteUseCase } = require("../../domain/useCases/getCitasPorTramiteUseCase");

async function crearCita(req, res, next) {
  try {
    const { tramite_id, fecha, hora } = req.body;
    const cita = await crearCitaUseCase(req.user.id, { tramite_id, fecha, hora });
    res.status(201).json(cita);
  } catch (err) {
    next(err);
  }
}

async function registrarArchivo(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, url } = req.body;
    const archivo = await registrarArchivoUseCase(id, { nombre, url });
    res.status(201).json(archivo);
  } catch (err) {
    next(err);
  }
}

async function actualizarEstadoCita(req, res, next) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const cita = await actualizarEstadoCitaUseCase(id, estado);
    res.status(200).json(cita);
  } catch (err) {
    next(err);
  }
}

async function obtenerMisCitas(req, res, next) {
  try {
    const citas = await getMisCitasUseCase(req.user.id);
    res.status(200).json(citas);
  } catch (err) {
    next(err);
  }
}

async function obtenerCitasPorTramite(req, res, next) {
  try {
    const { tramite_id } = req.params;
    const { fecha } = req.query;
    const citas = await getCitasPorTramiteUseCase(tramite_id, fecha);
    res.status(200).json(citas);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  crearCita,
  registrarArchivo,
  actualizarEstadoCita,
  obtenerMisCitas,
  obtenerCitasPorTramite,
};

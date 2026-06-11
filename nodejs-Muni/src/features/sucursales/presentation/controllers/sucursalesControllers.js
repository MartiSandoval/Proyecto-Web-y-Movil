const { getSucursalesUseCase } = require("../../domain/useCases/getSucursalesUseCase");
const { crearSucursalUseCase } = require("../../domain/useCases/crearSucursalUseCase");
const { actualizarSucursalUseCase } = require("../../domain/useCases/actualizarSucursalUseCase");
const { eliminarSucursalUseCase } = require("../../domain/useCases/eliminarSucursalUseCase");

async function getSucursales(req, res, next) {
  try {
    const sucursales = await getSucursalesUseCase();
    res.status(200).json(sucursales);
  } catch (err) {
    next(err);
  }
}

async function crearSucursal(req, res, next) {
  try {
    const { nombre, tipo, direccion, telefono, email } = req.body;
    const sucursal = await crearSucursalUseCase({ nombre, tipo, direccion, telefono, email });
    res.status(201).json(sucursal);
  } catch (err) {
    next(err);
  }
}

async function actualizarSucursal(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, tipo, direccion, telefono, email } = req.body;
    const sucursal = await actualizarSucursalUseCase(id, { nombre, tipo, direccion, telefono, email });
    res.status(200).json(sucursal);
  } catch (err) {
    next(err);
  }
}

async function eliminarSucursal(req, res, next) {
  try {
    const { id } = req.params;
    const sucursal = await eliminarSucursalUseCase(id);
    res.status(200).json({ mensaje: "Sucursal eliminada con éxito", sucursal_eliminada: sucursal });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSucursales, crearSucursal, actualizarSucursal, eliminarSucursal };

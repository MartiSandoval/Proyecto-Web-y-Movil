const repository = require("../../data/repositories/sucursalesRepository");

async function crearSucursalUseCase(params) {
  if (!params.nombre) {
    const err = new Error("El nombre de la sucursal es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.insertSucursal(params);
}

module.exports = { crearSucursalUseCase };

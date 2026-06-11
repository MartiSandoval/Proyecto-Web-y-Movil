const repository = require("../../data/repositories/sucursalesRepository");

async function eliminarSucursalUseCase(id) {
  if (!id) {
    const err = new Error("El ID de la sucursal es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.deleteSucursal(id);
}

module.exports = { eliminarSucursalUseCase };

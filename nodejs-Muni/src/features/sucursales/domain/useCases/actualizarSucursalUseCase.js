const repository = require("../../data/repositories/sucursalesRepository");

async function actualizarSucursalUseCase(id, params) {
  if (!id) {
    const err = new Error("El ID de la sucursal es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.updateSucursal(id, params);
}

module.exports = { actualizarSucursalUseCase };

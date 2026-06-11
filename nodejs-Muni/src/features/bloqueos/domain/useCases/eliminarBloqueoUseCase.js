const repository = require("../../data/repositories/bloqueosRepository");

async function eliminarBloqueoUseCase(id) {
  if (!id) {
    const err = new Error("id es obligatorio");
    err.status = 400;
    throw err;
  }
  await repository.deleteBloqueo(id);
}

module.exports = { eliminarBloqueoUseCase };

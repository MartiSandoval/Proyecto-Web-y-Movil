const repository = require("../../data/repositories/tramitesRepository");

async function eliminarTramiteUseCase(id) {
  if (!id) {
    const err = new Error("id es obligatorio");
    err.status = 400;
    throw err;
  }
  return repository.deleteTramite(id);
}

module.exports = { eliminarTramiteUseCase };

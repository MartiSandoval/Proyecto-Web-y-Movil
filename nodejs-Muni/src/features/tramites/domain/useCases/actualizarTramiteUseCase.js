const repository = require("../../data/repositories/tramitesRepository");

async function actualizarTramiteUseCase(id, params) {
  if (!id || !params.sucursal_id || !params.nombre) {
    const err = new Error("Faltan datos obligatorios para actualizar");
    err.status = 400;
    throw err;
  }
  return repository.updateTramite(id, params);
}

module.exports = { actualizarTramiteUseCase };

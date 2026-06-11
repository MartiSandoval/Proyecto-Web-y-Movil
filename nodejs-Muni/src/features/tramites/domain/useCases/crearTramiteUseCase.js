const repository = require("../../data/repositories/tramitesRepository");

async function crearTramiteUseCase(params) {
  if (!params.sucursal_id || !params.nombre) {
    const err = new Error("sucursal_id y nombre son obligatorios");
    err.status = 400;
    throw err;
  }
  return repository.insertTramite(params);
}

module.exports = { crearTramiteUseCase };

const repository = require("../../data/repositories/tramitesRepository");

async function crearTramiteUseCase(params, horarios) {
  if (!params.sucursal_id || !params.nombre) {
    const err = new Error("sucursal_id y nombre son obligatorios");
    err.status = 400;
    throw err;
  }
  const tramite = await repository.insertTramite(params);
  if (horarios) {
    await repository.replaceHorarios(tramite.id, horarios);
  }
  return tramite;
}

module.exports = { crearTramiteUseCase };

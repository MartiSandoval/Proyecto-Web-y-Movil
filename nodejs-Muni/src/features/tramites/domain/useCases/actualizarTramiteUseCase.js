const repository = require("../../data/repositories/tramitesRepository");

async function actualizarTramiteUseCase(id, params, horarios) {
  if (!id || !params.sucursal_id || !params.nombre) {
    const err = new Error("Faltan datos obligatorios para actualizar");
    err.status = 400;
    throw err;
  }
  const tramite = await repository.updateTramite(id, params);
  if (horarios) {
    await repository.replaceHorarios(id, horarios);
  }
  return tramite;
}

module.exports = { actualizarTramiteUseCase };

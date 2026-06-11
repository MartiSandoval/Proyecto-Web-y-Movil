const repository = require("../../data/repositories/tramitesRepository");

async function asignarFuncionariosUseCase(tramiteId, funcionarioIds) {
  if (!tramiteId) {
    const err = new Error("El id del trámite es obligatorio");
    err.status = 400;
    throw err;
  }
  if (!Array.isArray(funcionarioIds)) {
    const err = new Error("funcionario_ids debe ser un arreglo");
    err.status = 400;
    throw err;
  }
  await repository.replaceFuncionarios(tramiteId, funcionarioIds);
  return repository.findFuncionarioIds(tramiteId);
}

module.exports = { asignarFuncionariosUseCase };

const repository = require("../../data/repositories/funcionariosRepository");

async function getFuncionariosUseCase(sucursalId) {
  return repository.findBySucursal(sucursalId);
}

module.exports = { getFuncionariosUseCase };

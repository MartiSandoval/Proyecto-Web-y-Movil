const repository = require("../../data/repositories/tramitesRepository");

async function getTramitesUseCase(sucursalId, funcionarioId) {
  return repository.findActivos(sucursalId, funcionarioId);
}

module.exports = { getTramitesUseCase };

const repository = require("../../data/repositories/tramitesRepository");

async function getTramitesUseCase(sucursalId) {
  return repository.findActivos(sucursalId);
}

module.exports = { getTramitesUseCase };

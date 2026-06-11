const repository = require("../../data/repositories/tramitesRepository");

async function getTramiteUseCase(id) {
  return repository.findById(id);
}

module.exports = { getTramiteUseCase };

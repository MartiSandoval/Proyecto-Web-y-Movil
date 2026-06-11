const repository = require("../../data/repositories/sucursalesRepository");

async function getSucursalesUseCase() {
  return repository.findAllActivas();
}

module.exports = { getSucursalesUseCase };

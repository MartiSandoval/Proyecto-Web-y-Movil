const repository = require("../../data/repositories/citasRepository");

async function registrarArchivoUseCase(citaId, { nombre, url }) {
  if (!nombre || !url) {
    const err = new Error("nombre y url son requeridos");
    err.status = 400;
    throw err;
  }
  return repository.insertArchivo({ citaId, nombre, url });
}

module.exports = { registrarArchivoUseCase };

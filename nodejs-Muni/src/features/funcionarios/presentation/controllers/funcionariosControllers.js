const { getFuncionariosUseCase } = require("../../domain/useCases/getFuncionariosUseCase");

async function obtenerFuncionarios(req, res, next) {
  try {
    // El jefe solo ve funcionarios de su propia sucursal.
    const funcionarios = await getFuncionariosUseCase(req.user.sucursal_id);
    res.status(200).json(funcionarios);
  } catch (err) {
    next(err);
  }
}

module.exports = { obtenerFuncionarios };

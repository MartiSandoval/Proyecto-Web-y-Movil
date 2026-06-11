import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { AsignarFuncionariosUseCaseProtocol } from "./protocols/asignarFuncionariosUseCaseProtocol";

export function createAsignarFuncionariosUseCase(
  repository: TramitesRepository
): AsignarFuncionariosUseCaseProtocol {
  return function asignarFuncionariosUseCase(id, funcionarioIds) {
    return repository.asignarFuncionarios(id, funcionarioIds);
  };
}

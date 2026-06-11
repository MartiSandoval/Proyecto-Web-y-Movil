import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { GetFuncionariosUseCaseProtocol } from "./protocols/getFuncionariosUseCaseProtocol";

export function createGetFuncionariosUseCase(
  repository: TramitesRepository
): GetFuncionariosUseCaseProtocol {
  return function getFuncionariosUseCase() {
    return repository.getFuncionarios();
  };
}

import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { GetTramiteUseCaseProtocol } from "./protocols/getTramiteUseCaseProtocol";

export function createGetTramiteUseCase(
  repository: TramitesRepository
): GetTramiteUseCaseProtocol {
  return function getTramiteUseCase(id: string) {
    return repository.getTramite(id);
  };
}

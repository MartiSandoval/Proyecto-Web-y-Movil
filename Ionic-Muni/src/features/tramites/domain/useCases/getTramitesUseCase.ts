import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { GetTramitesUseCaseProtocol } from "./protocols/getTramitesUseCaseProtocol";

export function createGetTramitesUseCase(
  repository: TramitesRepository
): GetTramitesUseCaseProtocol {
  return function getTramitesUseCase(sucursalId?: string) {
    return repository.getTramites(sucursalId);
  };
}

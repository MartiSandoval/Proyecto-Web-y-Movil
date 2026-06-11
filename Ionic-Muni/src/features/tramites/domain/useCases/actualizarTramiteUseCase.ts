import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { ActualizarTramiteUseCaseProtocol } from "./protocols/actualizarTramiteUseCaseProtocol";

export function createActualizarTramiteUseCase(
  repository: TramitesRepository
): ActualizarTramiteUseCaseProtocol {
  return function actualizarTramiteUseCase(id, input) {
    return repository.actualizarTramite(id, input);
  };
}

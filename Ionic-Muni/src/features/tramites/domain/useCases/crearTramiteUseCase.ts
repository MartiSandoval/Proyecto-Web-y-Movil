import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { CrearTramiteUseCaseProtocol } from "./protocols/crearTramiteUseCaseProtocol";

export function createCrearTramiteUseCase(
  repository: TramitesRepository
): CrearTramiteUseCaseProtocol {
  return function crearTramiteUseCase(input) {
    return repository.crearTramite(input);
  };
}

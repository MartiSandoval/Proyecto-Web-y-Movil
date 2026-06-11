import type { TramitesRepository } from "../repositories/tramitesRepository";
import type { EliminarTramiteUseCaseProtocol } from "./protocols/eliminarTramiteUseCaseProtocol";

export function createEliminarTramiteUseCase(
  repository: TramitesRepository
): EliminarTramiteUseCaseProtocol {
  return function eliminarTramiteUseCase(id) {
    return repository.eliminarTramite(id);
  };
}

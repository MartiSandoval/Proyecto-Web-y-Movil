import type { BloqueosRepository } from "../repositories/bloqueosRepository";
import type { EliminarBloqueoUseCaseProtocol } from "./protocols/bloqueosUseCasesProtocol";

export function createEliminarBloqueoUseCase(
  repository: BloqueosRepository
): EliminarBloqueoUseCaseProtocol {
  return function eliminarBloqueoUseCase(id: string) {
    return repository.eliminarBloqueo(id);
  };
}

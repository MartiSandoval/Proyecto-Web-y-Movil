import type { BloqueosRepository } from "../repositories/bloqueosRepository";
import type { GetBloqueosUseCaseProtocol } from "./protocols/bloqueosUseCasesProtocol";

export function createGetBloqueosUseCase(
  repository: BloqueosRepository
): GetBloqueosUseCaseProtocol {
  return function getBloqueosUseCase(tramiteId: string, fecha?: string) {
    return repository.getBloqueos(tramiteId, fecha);
  };
}

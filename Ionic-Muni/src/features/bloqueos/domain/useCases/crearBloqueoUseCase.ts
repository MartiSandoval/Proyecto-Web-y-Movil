import type { NuevoBloqueo } from "../entities/BloqueoModel";
import type { BloqueosRepository } from "../repositories/bloqueosRepository";
import type { CrearBloqueoUseCaseProtocol } from "./protocols/bloqueosUseCasesProtocol";

export function createCrearBloqueoUseCase(
  repository: BloqueosRepository
): CrearBloqueoUseCaseProtocol {
  return function crearBloqueoUseCase(bloqueo: NuevoBloqueo) {
    return repository.crearBloqueo(bloqueo);
  };
}

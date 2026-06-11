import type { CitasRepository } from "../repositories/citasRepository";
import type { GetDisponibilidadUseCaseProtocol } from "./protocols/getDisponibilidadUseCaseProtocol";

export function createGetDisponibilidadUseCase(
  repository: CitasRepository
): GetDisponibilidadUseCaseProtocol {
  return function getDisponibilidadUseCase(tramiteId: string, fecha: string) {
    return repository.getDisponibilidad(tramiteId, fecha);
  };
}

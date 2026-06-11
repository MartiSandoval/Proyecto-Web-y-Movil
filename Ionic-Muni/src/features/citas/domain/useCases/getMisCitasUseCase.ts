import type { CitasRepository } from "../repositories/citasRepository";
import type { GetMisCitasUseCaseProtocol } from "./protocols/getMisCitasUseCaseProtocol";

export function createGetMisCitasUseCase(
  repository: CitasRepository
): GetMisCitasUseCaseProtocol {
  return function getMisCitasUseCase() {
    return repository.getMisCitas();
  };
}

import type { CitasRepository } from "../repositories/citasRepository";
import type { GetCitasPorTramiteUseCaseProtocol } from "./protocols/getCitasPorTramiteUseCaseProtocol";

export function createGetCitasPorTramiteUseCase(
  repository: CitasRepository
): GetCitasPorTramiteUseCaseProtocol {
  return function getCitasPorTramiteUseCase(tramiteId: string, fecha?: string) {
    return repository.getCitasPorTramite(tramiteId, fecha);
  };
}

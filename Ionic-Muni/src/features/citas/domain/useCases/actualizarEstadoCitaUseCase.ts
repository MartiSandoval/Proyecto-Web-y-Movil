import type { EstadoCita } from "../entities/CitaGestionModel";
import type { CitasRepository } from "../repositories/citasRepository";
import type { ActualizarEstadoCitaUseCaseProtocol } from "./protocols/actualizarEstadoCitaUseCaseProtocol";

export function createActualizarEstadoCitaUseCase(
  repository: CitasRepository
): ActualizarEstadoCitaUseCaseProtocol {
  return function actualizarEstadoCitaUseCase(citaId: string, estado: EstadoCita) {
    return repository.actualizarEstadoCita(citaId, estado);
  };
}

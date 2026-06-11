import type { CitasRepository } from "../repositories/citasRepository";
import type { PostCitaUseCaseProtocol } from "./protocols/postCitaUseCaseProtocol";

export function createPostCitaUseCase(
  repository: CitasRepository
): PostCitaUseCaseProtocol {
  return function postCitaUseCase(tramiteId: string, fecha: string, hora: string) {
    return repository.crearCita(tramiteId, fecha, hora);
  };
}

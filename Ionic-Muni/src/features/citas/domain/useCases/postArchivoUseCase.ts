import type { CitasRepository } from "../repositories/citasRepository";
import type { PostArchivoUseCaseProtocol } from "./protocols/postArchivoUseCaseProtocol";

export function createPostArchivoUseCase(
  repository: CitasRepository
): PostArchivoUseCaseProtocol {
  return function postArchivoUseCase(citaId: string, nombre: string, url: string) {
    return repository.registrarArchivo(citaId, nombre, url);
  };
}

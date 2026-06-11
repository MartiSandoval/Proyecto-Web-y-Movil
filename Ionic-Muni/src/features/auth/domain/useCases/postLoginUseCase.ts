import type { AuthRepository } from "../repositories/authRepository";
import type { PostLoginUseCaseProtocol } from "./protocols/postLoginUseCaseProtocol";

export function createPostLoginUseCase(repository: AuthRepository): PostLoginUseCaseProtocol {
  return function postLoginUseCase(rut: string, password: string) {
    return repository.login(rut, password);
  };
}

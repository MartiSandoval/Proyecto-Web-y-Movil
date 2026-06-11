import type { AuthRepository } from "../repositories/authRepository";
import type { GetCurrentUserUseCaseProtocol } from "./protocols/getCurrentUserUseCaseProtocol";

export function createGetCurrentUserUseCase(
  repository: AuthRepository,
): GetCurrentUserUseCaseProtocol {
  return function getCurrentUserUseCase(token: string) {
    return repository.getCurrentUser(token);
  };
}

import type { RegisterDataModel } from "../entities/RegisterDataModel";
import type { AuthRepository } from "../repositories/authRepository";
import type { PostRegisterUseCaseProtocol } from "./protocols/postRegisterUseCaseProtocol";

export function createPostRegisterUseCase(repository: AuthRepository): PostRegisterUseCaseProtocol {
  return function postRegisterUseCase(data: RegisterDataModel) {
    return repository.register(data);
  };
}

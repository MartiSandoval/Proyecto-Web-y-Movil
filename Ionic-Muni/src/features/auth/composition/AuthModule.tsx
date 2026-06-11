import { remoteAuthDataSource } from "../data/dataSources/remoteAuthDataSource";
import { createRemoteAuthRepository } from "../data/repositories/remoteAuthRepository";
import type { AuthUseCasesProtocol } from "../domain/useCases/protocols/authUseCasesProtocol";
import { createPostLoginUseCase } from "../domain/useCases/postLoginUseCase";
import { createPostRegisterUseCase } from "../domain/useCases/postRegisterUseCase";
import { createGetCurrentUserUseCase } from "../domain/useCases/getCurrentUserUseCase";
import { createAuthProvider } from "../presentation/hooks/useAuth";

// MARK: Data
export function resolveAuthData() {
  const dataSource = remoteAuthDataSource;
  const repository = createRemoteAuthRepository(dataSource);

  return { dataSource, repository };
}

// MARK: Domain
export function resolveAuthDomain(): AuthUseCasesProtocol {
  const { repository } = resolveAuthData();

  return {
    postLoginUseCase: createPostLoginUseCase(repository),
    postRegisterUseCase: createPostRegisterUseCase(repository),
    getCurrentUserUseCase: createGetCurrentUserUseCase(repository),
  };
}

// MARK: Presentation
export function resolveAuthPresentation(useCases: AuthUseCasesProtocol) {
  return {
    AuthProvider: createAuthProvider(useCases),
  };
}

// MARK: Module
export function useAuthModule() {
  return {
    resolveData: resolveAuthData,
    resolveDomain: resolveAuthDomain,
    resolvePresentation: () => resolveAuthPresentation(resolveAuthDomain()),
  };
}

// MARK: Public Provider
const { resolvePresentation } = useAuthModule();
const { AuthProvider } = resolvePresentation();

export { AuthProvider };

import { remoteBloqueosDataSource } from "../data/dataSources/remoteBloqueosDataSource";
import { createRemoteBloqueosRepository } from "../data/repositories/remoteBloqueosRepository";
import type { BloqueosUseCasesProtocol } from "../domain/useCases/protocols/bloqueosUseCasesProtocol";
import { createGetBloqueosUseCase } from "../domain/useCases/getBloqueosUseCase";
import { createCrearBloqueoUseCase } from "../domain/useCases/crearBloqueoUseCase";
import { createEliminarBloqueoUseCase } from "../domain/useCases/eliminarBloqueoUseCase";
import { createUseBloqueosData } from "../presentation/hooks/useBloqueosData";

// MARK: Data
export function resolveBloqueosData() {
  const dataSource = remoteBloqueosDataSource;
  const repository = createRemoteBloqueosRepository(dataSource);

  return { dataSource, repository };
}

// MARK: Domain
export function resolveBloqueosDomain(): BloqueosUseCasesProtocol {
  const { repository } = resolveBloqueosData();

  return {
    getBloqueosUseCase: createGetBloqueosUseCase(repository),
    crearBloqueoUseCase: createCrearBloqueoUseCase(repository),
    eliminarBloqueoUseCase: createEliminarBloqueoUseCase(repository),
  };
}

// MARK: Presentation
export function resolveBloqueosPresentation(useCases: BloqueosUseCasesProtocol) {
  return {
    useBloqueosData: createUseBloqueosData(useCases),
  };
}

// MARK: Module
export function useBloqueosModule() {
  return {
    resolveData: resolveBloqueosData,
    resolveDomain: resolveBloqueosDomain,
    resolvePresentation: () => resolveBloqueosPresentation(resolveBloqueosDomain()),
  };
}

// MARK: Public Hook (use cases de API)
export function useBloqueosData() {
  const { resolvePresentation } = useBloqueosModule();
  const { useBloqueosData: useBloqueosDataHook } = resolvePresentation();

  return useBloqueosDataHook();
}

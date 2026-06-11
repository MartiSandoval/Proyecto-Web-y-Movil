import { remoteTramitesDataSource } from "../data/dataSources/remoteTramitesDataSource";
import { createRemoteTramitesRepository } from "../data/repositories/remoteTramitesRepository";
import type { TramitesUseCasesProtocol } from "../domain/useCases/protocols/tramitesUseCasesProtocol";
import { createGetTramitesUseCase } from "../domain/useCases/getTramitesUseCase";
import { createGetTramiteUseCase } from "../domain/useCases/getTramiteUseCase";
import { createUseTramites } from "../presentation/hooks/useTramites";

// MARK: Data
export function resolveTramitesData() {
  const dataSource = remoteTramitesDataSource;
  const repository = createRemoteTramitesRepository(dataSource);

  return { dataSource, repository };
}

// MARK: Domain
export function resolveTramitesDomain(): TramitesUseCasesProtocol {
  const { repository } = resolveTramitesData();

  return {
    getTramitesUseCase: createGetTramitesUseCase(repository),
    getTramiteUseCase: createGetTramiteUseCase(repository),
  };
}

// MARK: Presentation
export function resolveTramitesPresentation(useCases: TramitesUseCasesProtocol) {
  return {
    useTramites: createUseTramites(useCases),
  };
}

// MARK: Module
export function useTramitesModule() {
  return {
    resolveData: resolveTramitesData,
    resolveDomain: resolveTramitesDomain,
    resolvePresentation: () => resolveTramitesPresentation(resolveTramitesDomain()),
  };
}

// MARK: Public Hook
export function useTramites() {
  const { resolvePresentation } = useTramitesModule();
  const { useTramites: useTramitesHook } = resolvePresentation();

  return useTramitesHook();
}

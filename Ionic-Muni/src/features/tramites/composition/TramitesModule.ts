import { remoteTramitesDataSource } from "../data/dataSources/remoteTramitesDataSource";
import { createRemoteTramitesRepository } from "../data/repositories/remoteTramitesRepository";
import type { TramitesUseCasesProtocol } from "../domain/useCases/protocols/tramitesUseCasesProtocol";
import { createGetTramitesUseCase } from "../domain/useCases/getTramitesUseCase";
import { createGetTramiteUseCase } from "../domain/useCases/getTramiteUseCase";
import { createCrearTramiteUseCase } from "../domain/useCases/crearTramiteUseCase";
import { createActualizarTramiteUseCase } from "../domain/useCases/actualizarTramiteUseCase";
import { createEliminarTramiteUseCase } from "../domain/useCases/eliminarTramiteUseCase";
import { createAsignarFuncionariosUseCase } from "../domain/useCases/asignarFuncionariosUseCase";
import { createGetFuncionariosUseCase } from "../domain/useCases/getFuncionariosUseCase";
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
    crearTramiteUseCase: createCrearTramiteUseCase(repository),
    actualizarTramiteUseCase: createActualizarTramiteUseCase(repository),
    eliminarTramiteUseCase: createEliminarTramiteUseCase(repository),
    asignarFuncionariosUseCase: createAsignarFuncionariosUseCase(repository),
    getFuncionariosUseCase: createGetFuncionariosUseCase(repository),
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

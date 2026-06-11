import type { TramitesUseCasesProtocol } from "../../domain/useCases/protocols/tramitesUseCasesProtocol";

export function createUseTramites(useCases: TramitesUseCasesProtocol) {
  return function useTramites() {
    return {
      getTramitesUseCase: useCases.getTramitesUseCase,
      getTramiteUseCase: useCases.getTramiteUseCase,
      crearTramiteUseCase: useCases.crearTramiteUseCase,
      actualizarTramiteUseCase: useCases.actualizarTramiteUseCase,
      eliminarTramiteUseCase: useCases.eliminarTramiteUseCase,
      asignarFuncionariosUseCase: useCases.asignarFuncionariosUseCase,
      getFuncionariosUseCase: useCases.getFuncionariosUseCase,
    };
  };
}

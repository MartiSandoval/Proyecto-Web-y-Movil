import type { TramitesUseCasesProtocol } from "../../domain/useCases/protocols/tramitesUseCasesProtocol";

export function createUseTramites(useCases: TramitesUseCasesProtocol) {
  return function useTramites() {
    return {
      getTramitesUseCase: useCases.getTramitesUseCase,
      getTramiteUseCase: useCases.getTramiteUseCase,
    };
  };
}

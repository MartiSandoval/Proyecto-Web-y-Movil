import type { BloqueosUseCasesProtocol } from "../../domain/useCases/protocols/bloqueosUseCasesProtocol";

export function createUseBloqueosData(useCases: BloqueosUseCasesProtocol) {
  return function useBloqueosData() {
    return {
      getBloqueosUseCase: useCases.getBloqueosUseCase,
      crearBloqueoUseCase: useCases.crearBloqueoUseCase,
      eliminarBloqueoUseCase: useCases.eliminarBloqueoUseCase,
    };
  };
}

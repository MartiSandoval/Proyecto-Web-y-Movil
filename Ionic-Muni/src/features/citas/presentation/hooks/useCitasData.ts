import type { CitasUseCasesProtocol } from "../../domain/useCases/protocols/citasUseCasesProtocol";

export function createUseCitasData(useCases: CitasUseCasesProtocol) {
  return function useCitasData() {
    return {
      getDisponibilidadUseCase: useCases.getDisponibilidadUseCase,
      postCitaUseCase: useCases.postCitaUseCase,
      postArchivoUseCase: useCases.postArchivoUseCase,
      getMisCitasUseCase: useCases.getMisCitasUseCase,
    };
  };
}

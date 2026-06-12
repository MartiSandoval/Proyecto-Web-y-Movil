import { remoteCitasDataSource } from "../data/dataSources/remoteCitasDataSource";
import { createRemoteCitasRepository } from "../data/repositories/remoteCitasRepository";
import type { CitasUseCasesProtocol } from "../domain/useCases/protocols/citasUseCasesProtocol";
import { createGetDisponibilidadUseCase } from "../domain/useCases/getDisponibilidadUseCase";
import { createPostCitaUseCase } from "../domain/useCases/postCitaUseCase";
import { createPostArchivoUseCase } from "../domain/useCases/postArchivoUseCase";
import { createGetMisCitasUseCase } from "../domain/useCases/getMisCitasUseCase";
import { createGetCitasPorTramiteUseCase } from "../domain/useCases/getCitasPorTramiteUseCase";
import { createActualizarEstadoCitaUseCase } from "../domain/useCases/actualizarEstadoCitaUseCase";
import { createUseCitasData } from "../presentation/hooks/useCitasData";

// 1. Tu importación
import { cancelarMiCitaUseCase } from '../domain/useCases/cancelarMiCitaUseCase';

// MARK: Data
export function resolveCitasData() {
  const dataSource = remoteCitasDataSource;
  const repository = createRemoteCitasRepository(dataSource);

  return { dataSource, repository };
}

// MARK: Domain
export function resolveCitasDomain(): CitasUseCasesProtocol {
  const { repository } = resolveCitasData();

  return {
    getDisponibilidadUseCase: createGetDisponibilidadUseCase(repository),
    postCitaUseCase: createPostCitaUseCase(repository),
    postArchivoUseCase: createPostArchivoUseCase(repository),
    getMisCitasUseCase: createGetMisCitasUseCase(repository),
    getCitasPorTramiteUseCase: createGetCitasPorTramiteUseCase(repository),
    actualizarEstadoCitaUseCase: createActualizarEstadoCitaUseCase(repository),
    
    // 2. AQUÍ ES EL LUGAR CORRECTO PARA INYECTARLO
    cancelarMiCitaUseCase: cancelarMiCitaUseCase(repository), 
  };
}

// MARK: Presentation
export function resolveCitasPresentation(useCases: CitasUseCasesProtocol) {
  return {
    useCitasData: createUseCitasData(useCases),
  };
}

// MARK: Module
export function useCitasModule() {
  // 3. Volvemos a dejar esto como estaba, limpio.
  return {
    resolveData: resolveCitasData,
    resolveDomain: resolveCitasDomain,
    resolvePresentation: () => resolveCitasPresentation(resolveCitasDomain())
  };
}

// MARK: Public Hook (use cases de API)
export function useCitasData() {
  const { resolvePresentation } = useCitasModule();
  const { useCitasData: useCitasDataHook } = resolvePresentation();
  
  return useCitasDataHook();
}

// MARK: Public Provider y hook de estado local
export { CitasProvider, useCitas } from "../presentation/hooks/useCitas";
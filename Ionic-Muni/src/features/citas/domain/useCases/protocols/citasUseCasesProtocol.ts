import type { ActualizarEstadoCitaUseCaseProtocol } from "./actualizarEstadoCitaUseCaseProtocol";
import type { GetCitasPorTramiteUseCaseProtocol } from "./getCitasPorTramiteUseCaseProtocol";
import type { GetDisponibilidadUseCaseProtocol } from "./getDisponibilidadUseCaseProtocol";
import type { GetMisCitasUseCaseProtocol } from "./getMisCitasUseCaseProtocol";
import type { PostArchivoUseCaseProtocol } from "./postArchivoUseCaseProtocol";
import type { PostCitaUseCaseProtocol } from "./postCitaUseCaseProtocol";

export type CitasUseCasesProtocol = {
  getDisponibilidadUseCase: GetDisponibilidadUseCaseProtocol;
  postCitaUseCase: PostCitaUseCaseProtocol;
  postArchivoUseCase: PostArchivoUseCaseProtocol;
  getMisCitasUseCase: GetMisCitasUseCaseProtocol;
  getCitasPorTramiteUseCase: GetCitasPorTramiteUseCaseProtocol;
  actualizarEstadoCitaUseCase: ActualizarEstadoCitaUseCaseProtocol;
};

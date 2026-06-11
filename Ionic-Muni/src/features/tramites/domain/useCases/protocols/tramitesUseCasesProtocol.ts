import type { GetTramiteUseCaseProtocol } from "./getTramiteUseCaseProtocol";
import type { GetTramitesUseCaseProtocol } from "./getTramitesUseCaseProtocol";
import type { CrearTramiteUseCaseProtocol } from "./crearTramiteUseCaseProtocol";
import type { ActualizarTramiteUseCaseProtocol } from "./actualizarTramiteUseCaseProtocol";
import type { EliminarTramiteUseCaseProtocol } from "./eliminarTramiteUseCaseProtocol";
import type { AsignarFuncionariosUseCaseProtocol } from "./asignarFuncionariosUseCaseProtocol";
import type { GetFuncionariosUseCaseProtocol } from "./getFuncionariosUseCaseProtocol";

export type TramitesUseCasesProtocol = {
  getTramitesUseCase: GetTramitesUseCaseProtocol;
  getTramiteUseCase: GetTramiteUseCaseProtocol;
  crearTramiteUseCase: CrearTramiteUseCaseProtocol;
  actualizarTramiteUseCase: ActualizarTramiteUseCaseProtocol;
  eliminarTramiteUseCase: EliminarTramiteUseCaseProtocol;
  asignarFuncionariosUseCase: AsignarFuncionariosUseCaseProtocol;
  getFuncionariosUseCase: GetFuncionariosUseCaseProtocol;
};

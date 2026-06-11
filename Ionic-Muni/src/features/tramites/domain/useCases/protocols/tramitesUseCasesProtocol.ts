import type { GetTramiteUseCaseProtocol } from "./getTramiteUseCaseProtocol";
import type { GetTramitesUseCaseProtocol } from "./getTramitesUseCaseProtocol";

export type TramitesUseCasesProtocol = {
  getTramitesUseCase: GetTramitesUseCaseProtocol;
  getTramiteUseCase: GetTramiteUseCaseProtocol;
};

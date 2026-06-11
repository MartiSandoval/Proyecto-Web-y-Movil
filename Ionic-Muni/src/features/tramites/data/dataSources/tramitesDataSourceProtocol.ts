import type { TramiteDTO } from "../entities/TramiteDTO";

export type TramitesDataSourceProtocol = {
  getTramites: (sucursalId?: string) => Promise<TramiteDTO[]>;
  getTramite: (id: string) => Promise<TramiteDTO>;
};

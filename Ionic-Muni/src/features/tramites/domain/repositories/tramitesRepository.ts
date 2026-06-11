import type { TramiteModel } from "../entities/TramiteModel";

export type TramitesRepository = {
  getTramites: (sucursalId?: string) => Promise<TramiteModel[]>;
  getTramite: (id: string) => Promise<TramiteModel>;
};

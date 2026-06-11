import type { BloqueoModel, NuevoBloqueo } from "../entities/BloqueoModel";

export type BloqueosRepository = {
  getBloqueos: (tramiteId: string, fecha?: string) => Promise<BloqueoModel[]>;
  crearBloqueo: (bloqueo: NuevoBloqueo) => Promise<BloqueoModel>;
  eliminarBloqueo: (id: string) => Promise<void>;
};

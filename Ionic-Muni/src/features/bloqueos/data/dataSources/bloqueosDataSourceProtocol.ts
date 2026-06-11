import type { BloqueoDTO } from "../entities/BloqueoDTO";

export type CrearBloqueoPayload = {
  tramite_id: string;
  fecha: string;
  hora?: string;
  motivo?: string;
};

export type BloqueosDataSourceProtocol = {
  getBloqueos: (tramiteId: string, fecha?: string) => Promise<BloqueoDTO[]>;
  crearBloqueo: (payload: CrearBloqueoPayload) => Promise<BloqueoDTO>;
  eliminarBloqueo: (id: string) => Promise<void>;
};

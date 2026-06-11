import type { TramiteDTO } from "../entities/TramiteDTO";
import type { TramiteDetalleDTO } from "../entities/TramiteDetalleDTO";
import type { FuncionarioDTO } from "../entities/FuncionarioDTO";
import type { TramiteInput } from "../../domain/entities/TramiteInput";

export type TramitesDataSourceProtocol = {
  getTramites: (sucursalId?: string, funcionarioId?: string) => Promise<TramiteDTO[]>;
  getTramite: (id: string) => Promise<TramiteDetalleDTO>;
  crearTramite: (input: TramiteInput) => Promise<{ id: string }>;
  actualizarTramite: (id: string, input: TramiteInput) => Promise<void>;
  eliminarTramite: (id: string) => Promise<void>;
  asignarFuncionarios: (id: string, funcionarioIds: string[]) => Promise<void>;
  getFuncionarios: () => Promise<FuncionarioDTO[]>;
};

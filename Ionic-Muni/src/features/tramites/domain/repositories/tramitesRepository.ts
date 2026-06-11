import type { TramiteModel } from "../entities/TramiteModel";
import type { FuncionarioModel } from "../entities/FuncionarioModel";
import type { TramiteInput } from "../entities/TramiteInput";

export type TramitesRepository = {
  getTramites: (sucursalId?: string, funcionarioId?: string) => Promise<TramiteModel[]>;
  getTramite: (id: string) => Promise<TramiteModel>;
  crearTramite: (input: TramiteInput) => Promise<{ id: string }>;
  actualizarTramite: (id: string, input: TramiteInput) => Promise<void>;
  eliminarTramite: (id: string) => Promise<void>;
  asignarFuncionarios: (id: string, funcionarioIds: string[]) => Promise<void>;
  getFuncionarios: () => Promise<FuncionarioModel[]>;
};

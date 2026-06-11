import type { HorarioModel } from "./HorarioModel";

export interface TramiteModel {
  id: string;
  nombre: string;
  descripcion: string;
  costo: string;
  departamento: string;
  esEnLinea: boolean;
  documentosRequeridos: string[];
  // Presentes solo al pedir el detalle (`getTramite`), para edición del jefe.
  sucursalId?: string;
  horarios?: HorarioModel[];
  funcionarioIds?: string[];
}

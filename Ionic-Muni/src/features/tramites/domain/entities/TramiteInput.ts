import type { HorarioModel } from "./HorarioModel";

// Datos que el jefe de sucursal envía al crear/editar un trámite.
export interface TramiteInput {
  nombre: string;
  descripcion: string;
  costo: string;
  esEnLinea: boolean;
  documentosRequeridos: string[];
  horarios: HorarioModel[];
}

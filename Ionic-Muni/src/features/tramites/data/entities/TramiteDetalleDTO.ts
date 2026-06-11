import type { TramiteDTO } from "./TramiteDTO";
import type { HorarioDTO } from "./HorarioDTO";

// Respuesta de `GET /tramites/:id`: incluye horarios y funcionarios asignados.
export interface TramiteDetalleDTO extends TramiteDTO {
  sucursalId?: string;
  horarios?: HorarioDTO[];
  funcionarioIds?: string[];
}

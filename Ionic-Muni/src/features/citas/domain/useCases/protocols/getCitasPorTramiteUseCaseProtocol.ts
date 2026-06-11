import type { CitaGestionModel } from "../../entities/CitaGestionModel";

/**
 * API contract:
 * - Endpoint: `GET /citas/tramite/:tramiteId?fecha=YYYY-MM-DD`
 * - Roles: funcionario, jefe_sucursal
 */
export type GetCitasPorTramiteUseCaseProtocol = (
  tramiteId: string,
  fecha?: string
) => Promise<CitaGestionModel[]>;

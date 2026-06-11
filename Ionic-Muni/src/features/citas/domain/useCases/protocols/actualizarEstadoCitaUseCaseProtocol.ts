import type { CitaGestionModel, EstadoCita } from "../../entities/CitaGestionModel";

/**
 * API contract:
 * - Endpoint: `PUT /citas/:citaId/estado`
 * - Roles: funcionario, jefe_sucursal
 */
export type ActualizarEstadoCitaUseCaseProtocol = (
  citaId: string,
  estado: EstadoCita
) => Promise<CitaGestionModel>;

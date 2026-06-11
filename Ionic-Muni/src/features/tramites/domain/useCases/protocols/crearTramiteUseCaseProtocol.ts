import type { TramiteInput } from "../../entities/TramiteInput";

/**
 * API contract:
 * - Endpoint: `POST /tramites` (rol jefe_sucursal). Devuelve el id creado.
 */
export type CrearTramiteUseCaseProtocol = (input: TramiteInput) => Promise<{ id: string }>;

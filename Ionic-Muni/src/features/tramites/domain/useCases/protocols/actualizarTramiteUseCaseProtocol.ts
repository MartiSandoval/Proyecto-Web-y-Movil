import type { TramiteInput } from "../../entities/TramiteInput";

/**
 * API contract:
 * - Endpoint: `PUT /tramites/:id` (rol jefe_sucursal).
 */
export type ActualizarTramiteUseCaseProtocol = (id: string, input: TramiteInput) => Promise<void>;

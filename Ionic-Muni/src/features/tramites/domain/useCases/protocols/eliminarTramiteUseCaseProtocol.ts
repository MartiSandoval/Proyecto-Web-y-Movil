/**
 * API contract:
 * - Endpoint: `DELETE /tramites/:id` (rol jefe_sucursal).
 */
export type EliminarTramiteUseCaseProtocol = (id: string) => Promise<void>;

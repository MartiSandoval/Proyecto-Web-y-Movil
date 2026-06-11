import type { TramiteModel } from "../../entities/TramiteModel";

/**
 * API contract:
 * - Endpoint: `GET /tramites` (opcional `?sucursal_id=`)
 */
export type GetTramitesUseCaseProtocol = (sucursalId?: string) => Promise<TramiteModel[]>;

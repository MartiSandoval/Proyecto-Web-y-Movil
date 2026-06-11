import type { TramiteModel } from "../../entities/TramiteModel";

/**
 * API contract:
 * - Endpoint: `GET /tramites` (opcional `?sucursal_id=` y/o `?funcionario_id=`)
 */
export type GetTramitesUseCaseProtocol = (
  sucursalId?: string,
  funcionarioId?: string
) => Promise<TramiteModel[]>;

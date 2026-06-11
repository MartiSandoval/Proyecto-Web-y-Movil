import type { TramiteModel } from "../../entities/TramiteModel";

/**
 * API contract:
 * - Endpoint: `GET /tramites/:id`
 */
export type GetTramiteUseCaseProtocol = (id: string) => Promise<TramiteModel>;

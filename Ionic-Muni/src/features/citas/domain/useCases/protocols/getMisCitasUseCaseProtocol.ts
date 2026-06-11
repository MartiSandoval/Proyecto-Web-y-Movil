import type { CitaHistorialModel } from "../../entities/CitaHistorialModel";

/**
 * API contract:
 * - Endpoint: `GET /citas/mis-citas`
 */
export type GetMisCitasUseCaseProtocol = () => Promise<CitaHistorialModel[]>;

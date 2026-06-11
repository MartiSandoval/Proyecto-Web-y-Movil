import type { CitaModel } from "../../entities/CitaModel";

/**
 * API contract:
 * - Endpoint: `POST /citas`
 * - Body: `{ tramite_id, fecha, hora }`
 */
export type PostCitaUseCaseProtocol = (
  tramiteId: string,
  fecha: string,
  hora: string
) => Promise<CitaModel>;

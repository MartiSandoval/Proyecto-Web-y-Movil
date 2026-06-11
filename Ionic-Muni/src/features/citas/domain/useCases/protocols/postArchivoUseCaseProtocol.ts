/**
 * API contract:
 * - Endpoint: `POST /citas/:citaId/archivos`
 * - Body: `{ nombre, url }`
 */
export type PostArchivoUseCaseProtocol = (
  citaId: string,
  nombre: string,
  url: string
) => Promise<void>;

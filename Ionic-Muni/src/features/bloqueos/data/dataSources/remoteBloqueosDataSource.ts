import httpClient, { buildApiError } from "../../../../network/httpClient";
import type { BloqueoDTO } from "../entities/BloqueoDTO";
import type {
  BloqueosDataSourceProtocol,
  CrearBloqueoPayload,
} from "./bloqueosDataSourceProtocol";

export const remoteBloqueosDataSource: BloqueosDataSourceProtocol = {
  async getBloqueos(tramiteId: string, fecha?: string): Promise<BloqueoDTO[]> {
    try {
      const params = new URLSearchParams({ tramite_id: tramiteId });
      if (fecha) params.set("fecha", fecha);
      const response = await httpClient.get(`/bloqueos?${params.toString()}`);
      return response.data as BloqueoDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener los bloqueos");
    }
  },

  async crearBloqueo(payload: CrearBloqueoPayload): Promise<BloqueoDTO> {
    try {
      const response = await httpClient.post("/bloqueos", payload);
      return response.data as BloqueoDTO;
    } catch (error) {
      throw buildApiError(error, "Error al crear el bloqueo");
    }
  },

  async eliminarBloqueo(id: string): Promise<void> {
    try {
      await httpClient.delete(`/bloqueos/${id}`);
    } catch (error) {
      throw buildApiError(error, "Error al eliminar el bloqueo");
    }
  },
};

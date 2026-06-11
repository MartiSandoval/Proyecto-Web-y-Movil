import httpClient, { buildApiError } from "../../../../network/httpClient";
import type { TramiteDTO } from "../entities/TramiteDTO";
import type { TramitesDataSourceProtocol } from "./tramitesDataSourceProtocol";

export const remoteTramitesDataSource: TramitesDataSourceProtocol = {
  async getTramites(sucursalId?: string): Promise<TramiteDTO[]> {
    try {
      const url = sucursalId ? `/tramites?sucursal_id=${sucursalId}` : "/tramites";
      const response = await httpClient.get(url);
      return response.data as TramiteDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener trámites");
    }
  },

  async getTramite(id: string): Promise<TramiteDTO> {
    try {
      const response = await httpClient.get(`/tramites/${id}`);
      return response.data as TramiteDTO;
    } catch (error) {
      throw buildApiError(error, "Trámite no encontrado");
    }
  },
};

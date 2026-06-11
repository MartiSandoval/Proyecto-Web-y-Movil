import httpClient, { buildApiError } from "../../../../network/httpClient";
import type { TramiteDTO } from "../entities/TramiteDTO";
import type { TramiteDetalleDTO } from "../entities/TramiteDetalleDTO";
import type { FuncionarioDTO } from "../entities/FuncionarioDTO";
import type { TramitesDataSourceProtocol } from "./tramitesDataSourceProtocol";
import type { TramiteInput } from "../../domain/entities/TramiteInput";

// Convierte el input de dominio (camelCase) al cuerpo que espera el backend (snake_case).
function toBody(input: TramiteInput) {
  return {
    nombre: input.nombre,
    descripcion: input.descripcion,
    costo: input.costo,
    es_en_linea: input.esEnLinea,
    documentos_requeridos: input.documentosRequeridos,
    horarios: input.horarios.map((h) => ({
      dia_semana: h.diaSemana,
      hora_inicio: h.horaInicio,
      hora_fin: h.horaFin,
      intervalo_minutos: h.intervaloMinutos,
    })),
  };
}

export const remoteTramitesDataSource: TramitesDataSourceProtocol = {
  async getTramites(sucursalId?: string, funcionarioId?: string): Promise<TramiteDTO[]> {
    try {
      const params = new URLSearchParams();
      if (sucursalId) params.set("sucursal_id", sucursalId);
      if (funcionarioId) params.set("funcionario_id", funcionarioId);
      const qs = params.toString();
      const response = await httpClient.get(qs ? `/tramites?${qs}` : "/tramites");
      return response.data as TramiteDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener trámites");
    }
  },

  async getTramite(id: string): Promise<TramiteDetalleDTO> {
    try {
      const response = await httpClient.get(`/tramites/${id}`);
      return response.data as TramiteDetalleDTO;
    } catch (error) {
      throw buildApiError(error, "Trámite no encontrado");
    }
  },

  async crearTramite(input: TramiteInput): Promise<{ id: string }> {
    try {
      const response = await httpClient.post("/tramites", toBody(input));
      return response.data as { id: string };
    } catch (error) {
      throw buildApiError(error, "Error al crear el trámite");
    }
  },

  async actualizarTramite(id: string, input: TramiteInput): Promise<void> {
    try {
      await httpClient.put(`/tramites/${id}`, toBody(input));
    } catch (error) {
      throw buildApiError(error, "Error al actualizar el trámite");
    }
  },

  async eliminarTramite(id: string): Promise<void> {
    try {
      await httpClient.delete(`/tramites/${id}`);
    } catch (error) {
      throw buildApiError(error, "Error al eliminar el trámite");
    }
  },

  async asignarFuncionarios(id: string, funcionarioIds: string[]): Promise<void> {
    try {
      await httpClient.put(`/tramites/${id}/funcionarios`, { funcionario_ids: funcionarioIds });
    } catch (error) {
      throw buildApiError(error, "Error al asignar funcionarios");
    }
  },

  async getFuncionarios(): Promise<FuncionarioDTO[]> {
    try {
      const response = await httpClient.get("/funcionarios");
      return response.data as FuncionarioDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener funcionarios");
    }
  },
};

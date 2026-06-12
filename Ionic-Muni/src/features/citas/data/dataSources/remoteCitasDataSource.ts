import httpClient, { buildApiError } from "../../../../network/httpClient";
import type { CitaDTO } from "../entities/CitaDTO";
import type { CitaGestionDTO } from "../entities/CitaGestionDTO";
import type { CitaHistorialDTO } from "../entities/CitaHistorialDTO";
import type { DisponibilidadResponseDTO, TimeSlotDTO } from "../entities/TimeSlotDTO";
import type { CitasDataSourceProtocol } from "./citasDataSourceProtocol";

export const remoteCitasDataSource: CitasDataSourceProtocol = {
  async getDisponibilidad(tramiteId: string, fecha: string): Promise<TimeSlotDTO[]> {
    try {
      const response = await httpClient.get(`/disponibilidad/${tramiteId}/${fecha}`);
      return (response.data as DisponibilidadResponseDTO).slots;
    } catch (error) {
      throw buildApiError(error, "Error al obtener disponibilidad");
    }
  },

  async crearCita(tramiteId: string, fecha: string, hora: string): Promise<CitaDTO> {
    try {
      const response = await httpClient.post("/citas", { tramite_id: tramiteId, fecha, hora });
      return response.data as CitaDTO;
    } catch (error) {
      throw buildApiError(error, "Error al crear cita");
    }
  },

  async registrarArchivo(citaId: string, nombre: string, url: string): Promise<void> {
    try {
      await httpClient.post(`/citas/${citaId}/archivos`, { nombre, url });
    } catch (error) {
      throw buildApiError(error, "Error al registrar archivo");
    }
  },

  async getMisCitas(): Promise<CitaHistorialDTO[]> {
    try {
      const response = await httpClient.get("/citas/mis-citas");
      return response.data as CitaHistorialDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener historial");
    }
  },

  async getCitasPorTramite(tramiteId: string, fecha?: string): Promise<CitaGestionDTO[]> {
    try {
      const url = fecha
        ? `/citas/tramite/${tramiteId}?fecha=${fecha}`
        : `/citas/tramite/${tramiteId}`;
      const response = await httpClient.get(url);
      return response.data as CitaGestionDTO[];
    } catch (error) {
      throw buildApiError(error, "Error al obtener las citas del trámite");
    }
  },

  async actualizarEstadoCita(citaId: string, estado: string): Promise<CitaGestionDTO> {
    try {
      const response = await httpClient.put(`/citas/${citaId}/estado`, { estado });
      return response.data as CitaGestionDTO;
    } catch (error) {
      throw buildApiError(error, "Error al actualizar el estado de la cita");
    }
  },

  async cancelarMiCita(citaId: string): Promise<any> {
    const response = await httpClient.put(`/citas/mis-citas/${citaId}/cancelar`);
    return response.data;
}
};

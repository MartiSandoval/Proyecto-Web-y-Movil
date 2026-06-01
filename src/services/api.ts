import { IAppointment, ITimeSlot, ITramite } from "../types/tramite";
import httpClient, { buildApiError } from "./http";

export async function getTramites(): Promise<ITramite[]> {
  try {
    const response = await httpClient.get("/tramites");
    return response.data as ITramite[];
  } catch (error) {
    throw buildApiError(error, "Error al obtener trámites");
  }
}

export async function getTramite(id: string): Promise<ITramite> {
  try {
    const response = await httpClient.get(`/tramites/${id}`);
    return response.data as ITramite;
  } catch (error) {
    throw buildApiError(error, "Trámite no encontrado");
  }
}

export async function getDisponibilidad(tramiteId: string, fecha: string): Promise<ITimeSlot[]> {
  try {
    const response = await httpClient.get(`/disponibilidad/${tramiteId}/${fecha}`);
    return response.data.slots as ITimeSlot[];
  } catch (error) {
    throw buildApiError(error, "Error al obtener disponibilidad");
  }
}

export async function crearCita(tramiteId: string, fecha: string, hora: string): Promise<IAppointment> {
  try {
    const response = await httpClient.post("/citas", { tramite_id: tramiteId, fecha, hora });
    return {
      id: response.data.id,
      tramiteId: response.data.tramite_id,
      fecha: response.data.fecha,
      hora: response.data.hora,
      estado: response.data.estado,
    } as IAppointment;
  } catch (error) {
    throw buildApiError(error, "Error al crear cita");
  }
}

export async function registrarArchivo(citaId: string, nombre: string, url: string): Promise<void> {
  try {
    await httpClient.post(`/citas/${citaId}/archivos`, { nombre, url });
  } catch (error) {
    throw buildApiError(error, "Error al registrar archivo");
  }
}

export async function getMisCitas(): Promise<Record<string, unknown>[]> {
  try {
    const response = await httpClient.get("/citas/mis-citas");
    return response.data as Record<string, unknown>[];
  } catch (error) {
    throw buildApiError(error, "Error al obtener historial");
  }
}

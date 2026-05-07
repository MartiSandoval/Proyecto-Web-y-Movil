import { ITramite, ITimeSlot, IAppointment } from "../types/tramite";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getTramites(): Promise<ITramite[]> {
  const res = await fetch(`${BASE_URL}/tramites/`);
  if (!res.ok) throw new Error("Error al obtener trámites");
  const data = await res.json();
  return data.map((t: any) => ({
    id: t.id,
    nombre: t.nombre,
    descripcion: t.descripcion,
    costo: t.costo,
    departamento: t.departamento,
    esEnLinea: t.es_en_linea,
    documentosRequeridos: t.documentos_requeridos ?? [],
  }));
}

export async function getTramite(id: string): Promise<ITramite> {
  const res = await fetch(`${BASE_URL}/tramites/${id}`);
  if (!res.ok) throw new Error("Trámite no encontrado");
  const data = await res.json();
  return {
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    costo: data.costo,
    departamento: data.departamento,
    esEnLinea: data.es_en_linea,
    documentosRequeridos: data.documentos_requeridos ?? [],
  };
}

export async function getDisponibilidad(
  tramiteId: string,
  fecha: string
): Promise<ITimeSlot[]> {
  const res = await fetch(`${BASE_URL}/disponibilidad/${tramiteId}/${fecha}`);
  if (!res.ok) throw new Error("Error al obtener disponibilidad");
  const data = await res.json();
  return data.slots;
}

export async function crearCita(
  tramiteId: string,
  fecha: string,
  hora: string
): Promise<IAppointment> {
  const res = await fetch(`${BASE_URL}/citas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tramite_id: tramiteId, fecha, hora }),
  });
  if (!res.ok) throw new Error("Error al crear la cita");
  const data = await res.json();
  return {
    id: data.id,
    tramiteId: data.tramite_id,
    fecha: data.fecha,
    hora: data.hora,
    estado: data.estado,
  };
}

export async function registrarArchivo(
  citaId: string,
  nombre: string,
  url: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/citas/${citaId}/archivos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, url }),
  });
  if (!res.ok) throw new Error("Error al registrar el archivo");
}

import { ITramite, ITimeSlot, IAppointment } from "../types/tramite";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ── Datos mock (espejo de backend/mock_data.py) ──────────────────────────────

const MOCK_TRAMITES: ITramite[] = [
  {
    id: "1",
    nombre: "Subsidio de Agua Potable",
    descripcion: "Obtén un beneficio económico para financiar parte del costo de tu boleta de agua potable y alcantarillado.",
    costo: "Sin costo",
    departamento: "DIDECO",
    esEnLinea: true,
    documentosRequeridos: ["Cédula de identidad", "Última boleta de agua potable"],
  },
  {
    id: "2",
    nombre: "Inscripción descuento en la compra de gas",
    descripcion: "La Ilustre Municipalidad de Santo Domingo le apoya para acceder a un descuento en la compra de su gas domiciliario Gasco o Lipigas.",
    costo: "Sin costo",
    departamento: "DIDECO",
    esEnLinea: true,
    documentosRequeridos: ["Cédula de identidad", "Última boleta de gas", "Certificado de residencia"],
  },
  {
    id: "3",
    nombre: "Subsidio al pago del Derecho de Aseo",
    descripcion: "Solicita la rebaja o exención total del pago por derechos de aseo municipal según tu calificación socioeconómica.",
    costo: "Sin costo",
    departamento: "Administración Municipal",
    esEnLinea: false,
    documentosRequeridos: ["Cédula de identidad", "Certificado de residencia", "Cartola de cuenta corriente"],
  },
  {
    id: "4",
    nombre: "Permiso de Edificación",
    descripcion: "Solicita el permiso municipal para construir, ampliar o modificar una edificación dentro del territorio comunal.",
    costo: "$15.000",
    departamento: "Dirección de Obras Municipales",
    esEnLinea: false,
    documentosRequeridos: ["Planos arquitectónicos", "Cédula de identidad", "Escritura del terreno", "Certificado de informaciones previas"],
  },
];

const MOCK_SLOTS: ITimeSlot[] = [
  { hora: "08:00", disponible: true },
  { hora: "08:30", disponible: true },
  { hora: "09:00", disponible: false },
  { hora: "09:30", disponible: true },
  { hora: "10:00", disponible: true },
  { hora: "10:30", disponible: false },
  { hora: "11:00", disponible: true },
  { hora: "11:30", disponible: true },
  { hora: "12:00", disponible: true },
  { hora: "15:00", disponible: true },
  { hora: "15:30", disponible: false },
  { hora: "16:00", disponible: true },
];

let mockCitaCounter = 1;

// ── API functions (con fallback automático a mock si el backend no responde) ──

export async function getTramites(): Promise<ITramite[]> {
  try {
    const res = await fetch(`${BASE_URL}/tramites/`);
    if (!res.ok) throw new Error();
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
  } catch {
    return MOCK_TRAMITES;
  }
}

export async function getTramite(id: string): Promise<ITramite> {
  try {
    const res = await fetch(`${BASE_URL}/tramites/${id}`);
    if (!res.ok) throw new Error();
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
  } catch {
    const tramite = MOCK_TRAMITES.find((t) => t.id === id);
    if (!tramite) throw new Error("Trámite no encontrado");
    return tramite;
  }
}

export async function getDisponibilidad(
  tramiteId: string,
  fecha: string
): Promise<ITimeSlot[]> {
  try {
    const res = await fetch(`${BASE_URL}/disponibilidad/${tramiteId}/${fecha}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.slots;
  } catch {
    return MOCK_SLOTS;
  }
}

export async function crearCita(
  tramiteId: string,
  fecha: string,
  hora: string
): Promise<IAppointment> {
  try {
    const res = await fetch(`${BASE_URL}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tramite_id: tramiteId, fecha, hora }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      id: data.id,
      tramiteId: data.tramite_id,
      fecha: data.fecha,
      hora: data.hora,
      estado: data.estado,
    };
  } catch {
    return { id: String(mockCitaCounter++), tramiteId, fecha, hora, estado: "confirmado" };
  }
}

export async function registrarArchivo(
  citaId: string,
  nombre: string,
  url: string
): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/citas/${citaId}/archivos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, url }),
    });
    if (!res.ok) throw new Error();
  } catch {
    // En modo mock no hay persistencia de archivos
  }
}

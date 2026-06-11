export interface CitaGestionDTO {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  notas?: string | null;
  ciudadano?: {
    nombre?: string;
    rut?: string;
  } | null;
}

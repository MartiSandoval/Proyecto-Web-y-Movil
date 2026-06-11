export interface CitaHistorialDTO {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  tramites?: {
    nombre?: string;
  };
}

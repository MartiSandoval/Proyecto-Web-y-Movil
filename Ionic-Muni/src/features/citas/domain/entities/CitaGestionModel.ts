export type EstadoCita = "pendiente" | "confirmado" | "cancelado" | "completado";

export interface CitaGestionModel {
  id: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  ciudadanoNombre: string;
  ciudadanoRut: string;
}

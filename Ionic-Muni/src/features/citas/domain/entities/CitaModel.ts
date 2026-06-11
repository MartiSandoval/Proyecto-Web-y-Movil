export interface CitaModel {
  id?: string;
  tramiteId: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
}

export interface CitaDTO {
  id: string;
  tramite_id: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
}

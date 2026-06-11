export interface BloqueoDTO {
  id: string;
  tramite_id: string;
  fecha: string;
  hora?: string | null;
  motivo?: string | null;
  created_at?: string;
}

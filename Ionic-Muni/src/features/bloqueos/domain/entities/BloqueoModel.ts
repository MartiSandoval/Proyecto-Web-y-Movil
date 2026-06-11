export interface BloqueoModel {
  id: string;
  tramiteId: string;
  fecha: string;
  hora: string | null;
  motivo: string;
  esDiaCompleto: boolean;
}

export interface NuevoBloqueo {
  tramiteId: string;
  fecha: string;
  hora?: string;
  motivo?: string;
}

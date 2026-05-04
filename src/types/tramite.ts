export interface ITramite {
  id: string;
  nombre: string;
  descripcion: string;
  costo: string;
  departamento: string;
  esEnLinea: boolean;
  documentosRequeridos: string[];
}

export interface ITimeSlot {
  hora: string;
  disponible: boolean;
}

export interface IAppointment {
  id?: string;
  tramiteId: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "cancelado";
}

export interface IUploadedFile {
  nombre: string;
  file: File;
  estado: "subiendo" | "completado" | "error";
  progreso: number;
  url?: string;
}

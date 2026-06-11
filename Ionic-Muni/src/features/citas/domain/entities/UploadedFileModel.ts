export interface UploadedFileModel {
  nombre: string;
  file: File;
  estado: "subiendo" | "completado" | "error";
  progreso: number;
  url?: string;
}

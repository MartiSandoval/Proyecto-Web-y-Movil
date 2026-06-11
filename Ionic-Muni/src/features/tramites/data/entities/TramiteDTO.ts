export interface TramiteDTO {
  id: string;
  nombre: string;
  descripcion: string;
  costo: string;
  departamento: string;
  esEnLinea: boolean;
  documentosRequeridos: string[];
}

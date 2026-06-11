import type { CitaDTO } from "../entities/CitaDTO";
import type { CitaHistorialDTO } from "../entities/CitaHistorialDTO";
import type { TimeSlotDTO } from "../entities/TimeSlotDTO";

export type CitasDataSourceProtocol = {
  getDisponibilidad: (tramiteId: string, fecha: string) => Promise<TimeSlotDTO[]>;
  crearCita: (tramiteId: string, fecha: string, hora: string) => Promise<CitaDTO>;
  registrarArchivo: (citaId: string, nombre: string, url: string) => Promise<void>;
  getMisCitas: () => Promise<CitaHistorialDTO[]>;
};

import type { CitaHistorialModel } from "../entities/CitaHistorialModel";
import type { CitaModel } from "../entities/CitaModel";
import type { TimeSlotModel } from "../entities/TimeSlotModel";

export type CitasRepository = {
  getDisponibilidad: (tramiteId: string, fecha: string) => Promise<TimeSlotModel[]>;
  crearCita: (tramiteId: string, fecha: string, hora: string) => Promise<CitaModel>;
  registrarArchivo: (citaId: string, nombre: string, url: string) => Promise<void>;
  getMisCitas: () => Promise<CitaHistorialModel[]>;
};

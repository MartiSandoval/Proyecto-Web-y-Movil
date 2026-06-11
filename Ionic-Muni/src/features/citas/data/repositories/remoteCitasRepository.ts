import type { CitaHistorialModel } from "../../domain/entities/CitaHistorialModel";
import type { CitaModel } from "../../domain/entities/CitaModel";
import type { TimeSlotModel } from "../../domain/entities/TimeSlotModel";
import type { CitasRepository } from "../../domain/repositories/citasRepository";
import type { CitaDTO } from "../entities/CitaDTO";
import type { CitaHistorialDTO } from "../entities/CitaHistorialDTO";
import type { TimeSlotDTO } from "../entities/TimeSlotDTO";
import type { CitasDataSourceProtocol } from "../dataSources/citasDataSourceProtocol";

function mapTimeSlot(dto: TimeSlotDTO): TimeSlotModel {
  return {
    hora: dto.hora,
    disponible: dto.disponible,
  };
}

function mapCita(dto: CitaDTO): CitaModel {
  return {
    id: dto.id,
    tramiteId: dto.tramite_id,
    fecha: dto.fecha,
    hora: dto.hora,
    estado: dto.estado,
  };
}

function mapCitaHistorial(dto: CitaHistorialDTO): CitaHistorialModel {
  return {
    id: dto.id,
    fecha: dto.fecha,
    hora: dto.hora,
    estado: dto.estado,
    tramiteNombre: dto.tramites?.nombre ?? "Trámite",
  };
}

export function createRemoteCitasRepository(
  dataSource: CitasDataSourceProtocol
): CitasRepository {
  return {
    async getDisponibilidad(tramiteId: string, fecha: string) {
      return (await dataSource.getDisponibilidad(tramiteId, fecha)).map(mapTimeSlot);
    },

    async crearCita(tramiteId: string, fecha: string, hora: string) {
      return mapCita(await dataSource.crearCita(tramiteId, fecha, hora));
    },

    async registrarArchivo(citaId: string, nombre: string, url: string) {
      return dataSource.registrarArchivo(citaId, nombre, url);
    },

    async getMisCitas() {
      return (await dataSource.getMisCitas()).map(mapCitaHistorial);
    },
  };
}

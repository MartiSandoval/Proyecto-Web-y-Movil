import type { TramiteModel } from "../../domain/entities/TramiteModel";
import type { FuncionarioModel } from "../../domain/entities/FuncionarioModel";
import type { HorarioModel } from "../../domain/entities/HorarioModel";
import type { TramitesRepository } from "../../domain/repositories/tramitesRepository";
import type { TramiteDTO } from "../entities/TramiteDTO";
import type { TramiteDetalleDTO } from "../entities/TramiteDetalleDTO";
import type { HorarioDTO } from "../entities/HorarioDTO";
import type { FuncionarioDTO } from "../entities/FuncionarioDTO";
import type { TramitesDataSourceProtocol } from "../dataSources/tramitesDataSourceProtocol";

function mapHorario(dto: HorarioDTO): HorarioModel {
  return {
    diaSemana: dto.dia_semana,
    horaInicio: (dto.hora_inicio ?? "").slice(0, 5),
    horaFin: (dto.hora_fin ?? "").slice(0, 5),
    intervaloMinutos: dto.intervalo_minutos ?? 30,
  };
}

function mapFuncionario(dto: FuncionarioDTO): FuncionarioModel {
  return { id: dto.id, nombre: dto.nombre, rut: dto.rut };
}

function mapTramite(dto: TramiteDTO): TramiteModel {
  return {
    id: dto.id,
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    costo: dto.costo,
    departamento: dto.departamento,
    esEnLinea: dto.esEnLinea,
    documentosRequeridos: dto.documentosRequeridos ?? [],
  };
}

function mapTramiteDetalle(dto: TramiteDetalleDTO): TramiteModel {
  return {
    ...mapTramite(dto),
    sucursalId: dto.sucursalId,
    horarios: (dto.horarios ?? []).map(mapHorario),
    funcionarioIds: dto.funcionarioIds ?? [],
  };
}

export function createRemoteTramitesRepository(
  dataSource: TramitesDataSourceProtocol
): TramitesRepository {
  return {
    async getTramites(sucursalId?: string, funcionarioId?: string) {
      return (await dataSource.getTramites(sucursalId, funcionarioId)).map(mapTramite);
    },

    async getTramite(id: string) {
      return mapTramiteDetalle(await dataSource.getTramite(id));
    },

    async crearTramite(input) {
      return dataSource.crearTramite(input);
    },

    async actualizarTramite(id, input) {
      return dataSource.actualizarTramite(id, input);
    },

    async eliminarTramite(id) {
      return dataSource.eliminarTramite(id);
    },

    async asignarFuncionarios(id, funcionarioIds) {
      return dataSource.asignarFuncionarios(id, funcionarioIds);
    },

    async getFuncionarios() {
      return (await dataSource.getFuncionarios()).map(mapFuncionario);
    },
  };
}

import type { TramiteModel } from "../../domain/entities/TramiteModel";
import type { TramitesRepository } from "../../domain/repositories/tramitesRepository";
import type { TramiteDTO } from "../entities/TramiteDTO";
import type { TramitesDataSourceProtocol } from "../dataSources/tramitesDataSourceProtocol";

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

export function createRemoteTramitesRepository(
  dataSource: TramitesDataSourceProtocol
): TramitesRepository {
  return {
    async getTramites(sucursalId?: string) {
      return (await dataSource.getTramites(sucursalId)).map(mapTramite);
    },

    async getTramite(id: string) {
      return mapTramite(await dataSource.getTramite(id));
    },
  };
}

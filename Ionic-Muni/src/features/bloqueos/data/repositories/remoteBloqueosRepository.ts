import type { BloqueoModel, NuevoBloqueo } from "../../domain/entities/BloqueoModel";
import type { BloqueosRepository } from "../../domain/repositories/bloqueosRepository";
import type { BloqueoDTO } from "../entities/BloqueoDTO";
import type { BloqueosDataSourceProtocol } from "../dataSources/bloqueosDataSourceProtocol";

function mapBloqueo(dto: BloqueoDTO): BloqueoModel {
  return {
    id: dto.id,
    tramiteId: dto.tramite_id,
    fecha: dto.fecha,
    hora: dto.hora ?? null,
    motivo: dto.motivo ?? "",
    esDiaCompleto: !dto.hora,
  };
}

export function createRemoteBloqueosRepository(
  dataSource: BloqueosDataSourceProtocol
): BloqueosRepository {
  return {
    async getBloqueos(tramiteId: string, fecha?: string) {
      return (await dataSource.getBloqueos(tramiteId, fecha)).map(mapBloqueo);
    },

    async crearBloqueo(bloqueo: NuevoBloqueo) {
      const dto = await dataSource.crearBloqueo({
        tramite_id: bloqueo.tramiteId,
        fecha: bloqueo.fecha,
        hora: bloqueo.hora,
        motivo: bloqueo.motivo,
      });
      return mapBloqueo(dto);
    },

    async eliminarBloqueo(id: string) {
      return dataSource.eliminarBloqueo(id);
    },
  };
}

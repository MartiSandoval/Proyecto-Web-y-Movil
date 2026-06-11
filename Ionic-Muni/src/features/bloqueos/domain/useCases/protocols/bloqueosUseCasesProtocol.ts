import type { BloqueoModel, NuevoBloqueo } from "../../entities/BloqueoModel";

export type GetBloqueosUseCaseProtocol = (
  tramiteId: string,
  fecha?: string
) => Promise<BloqueoModel[]>;

export type CrearBloqueoUseCaseProtocol = (
  bloqueo: NuevoBloqueo
) => Promise<BloqueoModel>;

export type EliminarBloqueoUseCaseProtocol = (id: string) => Promise<void>;

export type BloqueosUseCasesProtocol = {
  getBloqueosUseCase: GetBloqueosUseCaseProtocol;
  crearBloqueoUseCase: CrearBloqueoUseCaseProtocol;
  eliminarBloqueoUseCase: EliminarBloqueoUseCaseProtocol;
};

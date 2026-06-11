import type { AuthSessionModel } from "../../domain/entities/AuthSessionModel";
import type { AuthUserModel } from "../../domain/entities/AuthUserModel";
import type { RegisterDataModel } from "../../domain/entities/RegisterDataModel";
import type { AuthRepository } from "../../domain/repositories/authRepository";
import type { AuthSessionDTO } from "../entities/AuthSessionDTO";
import type { AuthUserDTO } from "../entities/AuthUserDTO";
import type { AuthDataSourceProtocol } from "../dataSources/authDataSourceProtocol";

function mapUser(dto: AuthUserDTO): AuthUserModel {
  return {
    id: dto.id,
    nombre: dto.nombre,
    rol: dto.rol,
    sucursal_id: dto.sucursal_id,
  };
}

function mapSession(dto: AuthSessionDTO): AuthSessionModel {
  return {
    token: dto.token,
    user: mapUser(dto.user),
  };
}

export function createRemoteAuthRepository(dataSource: AuthDataSourceProtocol): AuthRepository {
  return {
    async login(rut: string, password: string) {
      return mapSession(await dataSource.login({ rut, password }));
    },

    async register(data: RegisterDataModel) {
      return mapSession(await dataSource.register(data));
    },

    async getCurrentUser(token: string) {
      return mapUser(await dataSource.getCurrentUser(token));
    },
  };
}

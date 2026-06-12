import type { AuthSessionModel } from "../entities/AuthSessionModel";
import type { AuthUserModel } from "../entities/AuthUserModel";
import type { RegisterDataModel } from "../entities/RegisterDataModel";

export type AuthRepository = {
  login: (rut: string, password: string) => Promise<AuthSessionModel>;
  register: (data: RegisterDataModel) => Promise<AuthSessionModel>;
  getCurrentUser: (token: string) => Promise<AuthUserModel>;
  actualizarPerfil: (datos: any) => Promise<any>;
};

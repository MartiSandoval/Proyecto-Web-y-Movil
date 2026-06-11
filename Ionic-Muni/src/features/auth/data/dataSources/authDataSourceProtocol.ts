import type { AuthSessionDTO } from "../entities/AuthSessionDTO";
import type { AuthUserDTO } from "../entities/AuthUserDTO";

export type LoginPayloadDTO = {
  rut: string;
  password: string;
};

export type RegisterPayloadDTO = {
  email: string;
  password: string;
  nombre: string;
  rut: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  region?: string;
  comuna?: string;
};

export type AuthDataSourceProtocol = {
  login: (payload: LoginPayloadDTO) => Promise<AuthSessionDTO>;
  register: (payload: RegisterPayloadDTO) => Promise<AuthSessionDTO>;
  getCurrentUser: (token: string) => Promise<AuthUserDTO>;
};

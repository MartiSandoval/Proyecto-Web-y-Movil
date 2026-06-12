import httpClient, { buildApiError } from "../../../../network/httpClient";
import { setToken } from "../../../../core/auth/authTokenStorage";
import type { AuthSessionDTO } from "../entities/AuthSessionDTO";
import type { AuthUserDTO } from "../entities/AuthUserDTO";
import type {
  AuthDataSourceProtocol,
  LoginPayloadDTO,
  RegisterPayloadDTO,
} from "./authDataSourceProtocol";

export const remoteAuthDataSource: AuthDataSourceProtocol = {
  async login(payload: LoginPayloadDTO): Promise<AuthSessionDTO> {
    try {
      const response = await httpClient.post("/auth/login", payload);
      const data = response.data as AuthSessionDTO;
      setToken(data.token);
      return data;
    } catch (error) {
      throw buildApiError(error, "Error al iniciar sesión");
    }
  },

  async register(payload: RegisterPayloadDTO): Promise<AuthSessionDTO> {
    try {
      const response = await httpClient.post("/auth/registro", payload);
      const data = response.data as AuthSessionDTO;
      setToken(data.token);
      return data;
    } catch (error) {
      throw buildApiError(error, "Error al registrarse");
    }
  },

  async getCurrentUser(token: string): Promise<AuthUserDTO> {
    try {
      const response = await httpClient.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as AuthUserDTO;
    } catch (error) {
      throw buildApiError(error, "Sesión inválida");
    }
  },
  async actualizarPerfil(datos: any): Promise<any> {
    const response = await httpClient.put('/auth/me', datos);
    return response.data;
  }
};

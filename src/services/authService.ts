import httpClient, { buildApiError, setToken } from "./http";

export interface AuthUser {
  id: string;
  nombre: string;
  rol: "usuario" | "funcionario" | "jefe_sucursal";
  sucursal_id?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  rut: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  region?: string;
  comuna?: string;
}

async function login(rut: string, password: string): Promise<{ token: string; user: AuthUser }> {
  try {
    const response = await httpClient.post("/auth/login", { rut, password });
    const data = response.data as { token: string; user: AuthUser };
    setToken(data.token);
    return data;
  } catch (error) {
    throw buildApiError(error, "Error al iniciar sesión");
  }
}

async function register(data: RegisterData): Promise<{ token: string; user: AuthUser }> {
  try {
    const response = await httpClient.post("/auth/registro", data);
    const result = response.data as { token: string; user: AuthUser };
    setToken(result.token);
    return result;
  } catch (error) {
    throw buildApiError(error, "Error al registrarse");
  }
}

async function getMe(token: string): Promise<AuthUser> {
  try {
    const response = await httpClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as AuthUser;
  } catch (error) {
    throw buildApiError(error, "Sesión inválida");
  }
}

export const authService = { login, register, getMe };

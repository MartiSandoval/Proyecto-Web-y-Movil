const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rut, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al iniciar sesión");
  }
  return res.json();
}

async function register(data: RegisterData): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(`${BASE_URL}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al registrarse");
  }
  return res.json();
}

async function getMe(token: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Sesión inválida");
  return res.json();
}

export const authService = { login, register, getMe };

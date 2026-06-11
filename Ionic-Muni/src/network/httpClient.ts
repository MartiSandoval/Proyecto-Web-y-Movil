import axios, { AxiosError, AxiosInstance } from "axios";
import { apiConfig } from "./apiConfig";
import { getToken, clearToken } from "../core/auth/authTokenStorage";

const httpClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

export function buildApiError(error: unknown, fallback = "Error de comunicación con el servidor"): Error {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    if (responseData && typeof responseData === "object" && "error" in responseData) {
      return new Error((responseData as { error?: string }).error || fallback);
    }
    if (error.response?.status === 401) {
      return new Error("Sesión inválida. Por favor, inicia sesión de nuevo.");
    }
    return new Error(error.message || fallback);
  }
  if (error instanceof Error) return error;
  return new Error(fallback);
}

export default httpClient;

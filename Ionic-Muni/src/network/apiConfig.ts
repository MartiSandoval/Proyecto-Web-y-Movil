const fallbackApiBaseUrl = "http://localhost:8000";

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || fallbackApiBaseUrl,
};

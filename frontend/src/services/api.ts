import axios, { type AxiosInstance } from "axios";
import keycloak from "@/plugins/keycloak";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    await keycloak.updateToken(30);
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export { apiClient };

export interface CardDto {
  title: string;
  description: string;
  score: number;
}

export interface CardResponse {
  id: string;
  title: string;
  description: string;
  score: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const cardApi = {
  getAll: () => apiClient.get<CardResponse[]>("/api/cards"),

  getOne: (id: string) => apiClient.get<CardResponse>(`/api/cards/${id}`),

  create: (data: CardDto) => apiClient.post<CardResponse>("/api/cards", data),

  update: (id: string, data: Partial<CardDto>) =>
    apiClient.put<CardResponse>(`/api/cards/${id}`, data),

  delete: (id: string) => apiClient.delete(`/api/cards/${id}`),
};

export async function getPrivateData() {
  const response = await apiClient.get("/api/private");
  return response.data;
}

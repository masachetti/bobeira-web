import keycloak from "@/plugins/keycloak";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  // Ensure token is fresh before making request
  await keycloak.updateToken(30);

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${keycloak.token}`);
  headers.set("Content-Type", "application/json");

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function getPrivateData() {
  const response = await fetchWithAuth("/api/private");
  return response.json();
}

import { computed, getCurrentInstance } from "vue";
import Keycloak from "keycloak-js";

export function useAuth() {
  const instance = getCurrentInstance();
  const keycloak: Keycloak =
    instance?.appContext.config.globalProperties.$keycloak;

  return {
    isAuthenticated: computed(() => keycloak.authenticated),
    user: computed(() => keycloak.tokenParsed),
    token: computed(() => keycloak.token),
    login: () => keycloak.login(),
    logout: () =>
      keycloak.logout({ redirectUri: "https://sachetti.dev.br/bobeira" }),
    hasRole: (role: string) => keycloak.hasRealmRole(role),
  };
}

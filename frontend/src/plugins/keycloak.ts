import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://sachetti.dev.br",
  realm: "sachettiHub",
  clientId: "bobeira",
});

export default keycloak;

import Keycloak from "keycloak-connect";
import session from "express-session";

const memoryStore = new session.MemoryStore();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "bobeira-secret-key-change-in-production",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

export const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: "sachettiHub",
    "auth-server-url": "https://sachetti.dev.br",
    "ssl-required": "external",
    resource: "bobeira",
    "bearer-only": true,
    "confidential-port": 0,
  }
);

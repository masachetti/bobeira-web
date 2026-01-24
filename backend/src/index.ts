import express, { type Request, type Response } from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { keycloak, sessionMiddleware } from "./config/keycloak.js";
import { createCardRoutes } from "./routes/card-routes.js";

const app = express();

// Setup Prisma with libSQL adapter for SQLite
const libsql = createClient({
  url: "file:./dev.db",
});
// @ts-ignore
const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sachetti.dev.br"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(sessionMiddleware);
app.use(keycloak.middleware());

// Public endpoint
app.get("/api/public", (_req: Request, res: Response) => {
  res.json({
    message: "This is a public endpoint!!",
    timestamp: new Date().toISOString(),
  });
});

// Private endpoint (Keycloak protected)
app.get("/api/private", keycloak.protect(), (req: Request, res: Response) => {
  // Get user data from Keycloak token
  const grant = (req as any).kauth?.grant;
  const token = grant?.access_token;
  const userContent = token?.content;

  // Log user data
  console.log("=== User Data from Keycloak ===");
  console.log("User ID (sub):", userContent?.sub);
  console.log("Username:", userContent?.preferred_username);
  console.log("Email:", userContent?.email);
  console.log("Name:", userContent?.name);
  console.log("Realm roles:", userContent?.realm_access?.roles);
  console.log("================================");

  res.json({
    message: "This is a private endpoint",
    user: {
      id: userContent?.sub,
      username: userContent?.preferred_username,
      email: userContent?.email,
      name: userContent?.name,
    },
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Card routes
app.use("/api/cards", createCardRoutes(prisma, keycloak));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Public endpoint: http://localhost:${PORT}/api/public`);
  console.log(`Private endpoint: http://localhost:${PORT}/api/private`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

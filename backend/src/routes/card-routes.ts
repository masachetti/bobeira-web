import { Router } from "express";
import type { PrismaClient } from "../generated/prisma/client.js";
import type Keycloak from "keycloak-connect";
import { CardService } from "../services/card-service.js";
import { CardController } from "../controllers/card-controller.js";
import { extractUser } from "../middleware/auth.js";
import type { AuthenticatedRequest } from "../types/index.js";

export function createCardRoutes(
  prisma: PrismaClient,
  keycloak: Keycloak.Keycloak
): Router {
  const router = Router();
  const cardService = new CardService(prisma);
  const cardController = new CardController(cardService);

  // All routes are protected and require user extraction
  router.use(keycloak.protect());
  router.use(extractUser as any);

  router.post("/", (req, res) =>
    cardController.create(req as unknown as AuthenticatedRequest, res)
  );
  router.get("/", (req, res) =>
    cardController.findAll(req as unknown as AuthenticatedRequest, res)
  );
  router.get("/:id", (req, res) =>
    cardController.findOne(req as unknown as AuthenticatedRequest, res)
  );
  router.put("/:id", (req, res) =>
    cardController.update(req as unknown as AuthenticatedRequest, res)
  );
  router.delete("/:id", (req, res) =>
    cardController.delete(req as unknown as AuthenticatedRequest, res)
  );

  return router;
}

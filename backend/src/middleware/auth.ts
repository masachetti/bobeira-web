import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest, KeycloakUser } from "../types/index.js";

export function extractUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const grant = (req as any).kauth?.grant;
  const token = grant?.access_token;
  const content = token?.content;

  if (!content?.sub || !content?.preferred_username) {
    res.status(401).json({ error: "Invalid token: missing user information" });
    return;
  }

  req.user = {
    sub: content.sub,
    preferred_username: content.preferred_username,
    email: content.email,
    name: content.name,
  } as KeycloakUser;

  next();
}

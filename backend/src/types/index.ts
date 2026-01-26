import type { Request } from "express";

export interface KeycloakUser {
  sub: string;
  preferred_username: string;
  email?: string;
  name?: string;
}

export interface AuthenticatedRequest extends Request<{ id?: string }> {
  user: KeycloakUser;
}

export interface CreateCardDto {
  title: string;
  description: string;
  score: number;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  score?: number;
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

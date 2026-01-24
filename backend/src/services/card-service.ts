import type { PrismaClient } from "../generated/prisma/client.js";
import type {
  CreateCardDto,
  UpdateCardDto,
  CardResponse,
  KeycloakUser,
} from "../types/index.js";

export class CardService {
  constructor(private prisma: PrismaClient) {}

  private toResponse(card: {
    id: string;
    title: string;
    description: string;
    score: number;
    authorUsername: string;
    createdAt: Date;
    updatedAt: Date;
  }): CardResponse {
    return {
      id: card.id,
      title: card.title,
      description: card.description,
      score: card.score,
      author: card.authorUsername,
      createdAt: card.createdAt.toISOString(),
      updatedAt: card.updatedAt.toISOString(),
    };
  }

  async create(data: CreateCardDto, user: KeycloakUser): Promise<CardResponse> {
    const card = await this.prisma.card.create({
      data: {
        title: data.title,
        description: data.description,
        score: data.score,
        authorUserId: user.sub,
        authorUsername: user.preferred_username,
      },
    });
    return this.toResponse(card);
  }

  async findAllByUser(userId: string): Promise<CardResponse[]> {
    const cards = await this.prisma.card.findMany({
      where: { authorUserId: userId },
      orderBy: { createdAt: "desc" },
    });
    return cards.map((card) => this.toResponse(card));
  }

  async findOneByUser(
    cardId: string,
    userId: string
  ): Promise<CardResponse | null> {
    const card = await this.prisma.card.findFirst({
      where: { id: cardId, authorUserId: userId },
    });
    return card ? this.toResponse(card) : null;
  }

  async update(
    cardId: string,
    data: UpdateCardDto,
    userId: string
  ): Promise<CardResponse | null> {
    const existing = await this.prisma.card.findFirst({
      where: { id: cardId, authorUserId: userId },
    });

    if (!existing) {
      return null;
    }

    const card = await this.prisma.card.update({
      where: { id: cardId },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        score: data.score ?? existing.score,
      },
    });
    return this.toResponse(card);
  }

  async delete(cardId: string, userId: string): Promise<boolean> {
    const existing = await this.prisma.card.findFirst({
      where: { id: cardId, authorUserId: userId },
    });

    if (!existing) {
      return false;
    }

    await this.prisma.card.delete({ where: { id: cardId } });
    return true;
  }
}

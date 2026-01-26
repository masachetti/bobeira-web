import type { Response } from "express";
import type { CardService } from "../services/card-service.js";
import type {
  AuthenticatedRequest,
  CreateCardDto,
  UpdateCardDto,
} from "../types/index.js";

export class CardController {
  constructor(private cardService: CardService) {}

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { title, description, score } = req.body as CreateCardDto;

    if (!title || !description || score === undefined) {
      res
        .status(400)
        .json({ error: "Missing required fields: title, description, score" });
      return;
    }

    if (typeof score !== "number" || score < 0) {
      res.status(400).json({ error: "Score must be a non-negative number" });
      return;
    }

    const card = await this.cardService.create(
      { title, description, score },
      req.user
    );
    res.status(201).json(card);
  }

  async findAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    const cards = await this.cardService.findAllByUser(req.user.sub);
    res.json(cards);
  }

  async findOne(req: AuthenticatedRequest, res: Response): Promise<void> {
    const id = req.params.id!;
    const card = await this.cardService.findOneByUser(id, req.user.sub);

    if (!card) {
      res.status(404).json({ error: "Card not found" });
      return;
    }

    res.json(card);
  }

  async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    const id = req.params.id!;
    const { title, description, score } = req.body as UpdateCardDto;

    if (score !== undefined && (typeof score !== "number" || score < 0)) {
      res.status(400).json({ error: "Score must be a non-negative number" });
      return;
    }

    const card = await this.cardService.update(
      id,
      { title, description, score },
      req.user.sub
    );

    if (!card) {
      res.status(404).json({ error: "Card not found" });
      return;
    }

    res.json(card);
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    const id = req.params.id!;
    const deleted = await this.cardService.delete(id, req.user.sub);

    if (!deleted) {
      res.status(404).json({ error: "Card not found" });
      return;
    }

    res.status(204).send();
  }
}

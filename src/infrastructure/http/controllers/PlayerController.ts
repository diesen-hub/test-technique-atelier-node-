import { Request, Response, NextFunction } from 'express';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';
import { PlayerError } from '@domain/errors/PlayerError';
import { GetAllPlayers } from '@application/use-cases/player/GetAllPlayers';
import { GetPlayerById } from '@application/use-cases/player/GetPlayerById';
import { CreatePlayer } from '@application/use-cases/player/CreatePlayer';
import { UpdatePlayer } from '@application/use-cases/player/UpdatePlayer';

export class PlayerController {
  private readonly getAllPlayers: GetAllPlayers;
  private readonly getPlayerById: GetPlayerById;
  private readonly createPlayer: CreatePlayer;
  private readonly updatePlayer: UpdatePlayer;

  constructor(playerRepository: IPlayerRepository) {
    this.getAllPlayers = new GetAllPlayers(playerRepository);
    this.getPlayerById = new GetPlayerById(playerRepository);
    this.createPlayer = new CreatePlayer(playerRepository);
    this.updatePlayer = new UpdatePlayer(playerRepository);
  }

  private handleResult(result: unknown, res: Response, successStatus = 200): void {
    if (result instanceof PlayerError) {
      res.status(result.statusCode).json({ error: result.message });
      return;
    }
    res.status(successStatus).json(result);
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const players = await this.getAllPlayers.execute();
      res.json(players);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getPlayerById.execute(Number(req.params.id));
      this.handleResult(result, res);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createPlayer.execute(req.body);
      this.handleResult(result, res, 201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.updatePlayer.execute(Number(req.params.id), req.body);
      this.handleResult(result, res);
    } catch (err) {
      next(err);
    }
  }
}

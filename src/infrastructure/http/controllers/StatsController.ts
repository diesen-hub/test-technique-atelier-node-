import { Request, Response, NextFunction } from 'express';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';
import { GetStats } from '@application/use-cases/stats/GetStats';

export class StatsController {
  private readonly getStats: GetStats;

  constructor(playerRepository: IPlayerRepository) {
    this.getStats = new GetStats(playerRepository);
  }

  async get(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await this.getStats.execute();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
}

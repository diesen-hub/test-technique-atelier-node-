import { Player } from '@domain/entities/Player';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';

export class GetAllPlayers {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(): Promise<Player[]> {
    const players = await this.playerRepository.findAll();
    return players.sort((a, b) => a.data.rank - b.data.rank);
  }
}

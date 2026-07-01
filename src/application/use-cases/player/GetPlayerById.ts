import { Player } from '@domain/entities/Player';
import { PlayerError } from '@domain/errors/PlayerError';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';

export class GetPlayerById {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(id: number): Promise<Player | PlayerError> {
    const player = await this.playerRepository.findById(id);
    if (!player) {
      return new PlayerError(`Player with id ${id} not found`, 404);
    }
    return player;
  }
}

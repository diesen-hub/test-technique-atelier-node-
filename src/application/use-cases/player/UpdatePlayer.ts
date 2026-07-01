import { Player, PlayerProps } from '@domain/entities/Player';
import { PlayerError } from '@domain/errors/PlayerError';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';

export class UpdatePlayer {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(id: number, payload: Omit<PlayerProps, 'id'>): Promise<Player | PlayerError> {
    const existing = await this.playerRepository.findById(id);
    if (!existing) {
      return new PlayerError(`Player with id ${id} not found`, 404);
    }
    return this.playerRepository.update(id, payload);
  }
}

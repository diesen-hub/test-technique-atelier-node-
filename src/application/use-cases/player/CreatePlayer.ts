import { Player, PlayerProps } from '@domain/entities/Player';
import { IPlayerRepository } from '@domain/repositories/IPlayerRepository';

type CreatePlayerPayload = Omit<PlayerProps, 'id'>;

export class CreatePlayer {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(payload: CreatePlayerPayload): Promise<Player> {
    const player = new Player({ id: Date.now(), ...payload });
    return this.playerRepository.create(player);
  }
}

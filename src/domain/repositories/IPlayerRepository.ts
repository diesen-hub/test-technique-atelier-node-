import { Player, PlayerProps } from "@domain/entities/Player";

export interface IPlayerRepository {
  findAll(): Promise<Player[]>;
  findById(id: number): Promise<Player | null>;
  create(player: Player): Promise<Player>;
  update(id: number, data: Omit<PlayerProps, 'id'>): Promise<Player>;
}

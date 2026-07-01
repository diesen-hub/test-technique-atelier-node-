import { Player, PlayerProps } from "@domain/entities/Player";
import { IPlayerRepository } from "@domain/repositories/IPlayerRepository";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.resolve(__dirname, "../../../db.json");

interface Db {
  players: PlayerProps[];
}

export class JsonPlayerRepository implements IPlayerRepository {
  private async read(): Promise<Db> {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as Db;
  }

  private async write(db: Db): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  }

  async findAll(): Promise<Player[]> {
    const db = await this.read();
    return db.players.map((p) => new Player(p));
  }

  async findById(id: number): Promise<Player | null> {
    const db = await this.read();
    const found = db.players.find((p) => p.id === id);
    return found ? new Player(found) : null;
  }

  async create(player: Player): Promise<Player> {
    const db = await this.read();
    db.players.push({ ...player });
    await this.write(db);
    return player;
  }

  async update(id: number, payload: Omit<PlayerProps, "id">): Promise<Player> {
    const db = await this.read();
    const index = db.players.findIndex((p) => p.id === id);
    const updated: PlayerProps = {
      ...db.players[index],
      ...payload,
      id: db.players[index].id,
    };
    db.players[index] = updated;
    await this.write(db);
    return new Player(updated);
  }
}

import { Player, PlayerProps } from "@domain/entities/Player";
import { IPlayerRepository } from "@domain/repositories/IPlayerRepository";
import { vi } from "vitest";

export const players: Player[] = [
  new Player({
    id: 1,
    firstname: "Rafael",
    lastname: "Nadal",
    shortname: "R.NAD",
    sex: "M",
    country: { picture: "https://example.com/esp.png", code: "ESP" },
    picture: "https://example.com/nadal.png",
    data: {
      rank: 1,
      points: 1982,
      weight: 85000,
      height: 185,
      age: 33,
      last: [1, 0, 0, 0, 1],
    },
  }),
  new Player({
    id: 2,
    firstname: "Novak",
    lastname: "Djokovic",
    shortname: "N.DJO",
    sex: "M",
    country: { picture: "https://example.com/srb.png", code: "SRB" },
    picture: "https://example.com/djokovic.png",
    data: {
      rank: 2,
      points: 2542,
      weight: 80000,
      height: 188,
      age: 31,
      last: [1, 1, 1, 1, 1],
    },
  }),
  new Player({
    id: 3,
    firstname: "Serena",
    lastname: "Williams",
    shortname: "S.WIL",
    sex: "F",
    country: { picture: "https://example.com/usa.png", code: "USA" },
    picture: "https://example.com/serena.png",
    data: {
      rank: 10,
      points: 3521,
      weight: 72000,
      height: 175,
      age: 37,
      last: [0, 1, 1, 1, 0],
    },
  }),
];

export function createMockPlayerRepository(): IPlayerRepository {
  return {
    findAll: vi.fn().mockResolvedValue(players),
    findById: vi
      .fn()
      .mockImplementation((id: number) =>
        Promise.resolve(players.find((p) => p.id === id) ?? null),
      ),
    create: vi
      .fn()
      .mockImplementation((player: Player) => Promise.resolve(player)),
    update: vi
      .fn()
      .mockImplementation((_id: number, payload: Omit<PlayerProps, "id">) =>
        Promise.resolve(new Player({ id: 1, ...payload })),
      ),
  };
}

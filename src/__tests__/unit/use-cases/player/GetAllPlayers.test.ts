import { GetAllPlayers } from "@application/use-cases/player/GetAllPlayers";
import { describe, expect, it, vi } from "vitest";
import { createMockPlayerRepository } from "../../../mocks/mockPlayerRepository";

describe("GetAllPlayers", () => {
  it("retourne tous les joueurs triés par rank croissant", async () => {
    const useCase = new GetAllPlayers(createMockPlayerRepository());
    const result = await useCase.execute();

    expect(result).toHaveLength(3);
    expect(result[0].data.rank).toBe(1);
    expect(result[1].data.rank).toBe(2);
    expect(result[2].data.rank).toBe(10);
  });

  it("retourne un tableau vide si aucun joueur", async () => {
    const repo = createMockPlayerRepository();
    (repo.findAll as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    const useCase = new GetAllPlayers(repo);

    expect(await useCase.execute()).toEqual([]);
  });
});

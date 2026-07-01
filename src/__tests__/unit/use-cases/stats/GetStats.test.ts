import { GetStats } from "@application/use-cases/stats/GetStats";
import { describe, expect, it, vi } from "vitest";
import { createMockPlayerRepository } from "../../../mocks/mockPlayerRepository";

describe("GetStats", () => {
  it("retourne le pays avec le meilleur ratio de victoires", async () => {
    const useCase = new GetStats(createMockPlayerRepository());
    const { bestCountry } = await useCase.execute();

    expect(bestCountry).not.toBeNull();
    expect(bestCountry?.code).toBe("SRB");
    expect(bestCountry?.winRatio).toBe(1);
  });

  it("calcule correctement l'IMC moyen", async () => {
    const useCase = new GetStats(createMockPlayerRepository());
    const { averageBMI } = await useCase.execute();

    expect(averageBMI).toBeTypeOf("number");
    expect(averageBMI).toBeGreaterThan(0);
  });

  it("calcule correctement la médiane des tailles", async () => {
    const useCase = new GetStats(createMockPlayerRepository());
    const { medianHeight } = await useCase.execute();

    expect(medianHeight).toBe(185);
  });

  it("retourne null pour toutes les stats si aucun joueur", async () => {
    const repo = createMockPlayerRepository();
    (repo.findAll as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    const useCase = new GetStats(repo);
    const stats = await useCase.execute();

    expect(stats.bestCountry).toBeNull();
    expect(stats.averageBMI).toBeNull();
    expect(stats.medianHeight).toBeNull();
  });

  it("gère un seul joueur", async () => {
    const repo = createMockPlayerRepository();
    (repo.findAll as ReturnType<typeof vi.fn>).mockResolvedValue([
      (await createMockPlayerRepository().findAll())[0],
    ]);
    const useCase = new GetStats(repo);
    const stats = await useCase.execute();

    expect(stats.bestCountry).not.toBeNull();
    expect(stats.averageBMI).toBeTypeOf("number");
    expect(stats.medianHeight).toBeTypeOf("number");
  });
});

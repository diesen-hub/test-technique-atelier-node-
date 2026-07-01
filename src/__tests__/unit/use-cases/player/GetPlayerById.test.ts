import { GetPlayerById } from "@application/use-cases/player/GetPlayerById";
import { PlayerError } from "@domain/errors/PlayerError";
import { describe, expect, it } from "vitest";
import { createMockPlayerRepository } from "../../../mocks/mockPlayerRepository";

describe("GetPlayerById", () => {
  it("retourne le joueur si trouvé", async () => {
    const useCase = new GetPlayerById(createMockPlayerRepository());
    const result = await useCase.execute(1);

    expect(result).not.toBeInstanceOf(PlayerError);
    if (!(result instanceof PlayerError)) {
      expect(result.id).toBe(1);
      expect(result.lastname).toBe("Nadal");
    }
  });

  it("retourne un PlayerError 404 si le joueur n'existe pas", async () => {
    const useCase = new GetPlayerById(createMockPlayerRepository());
    const result = await useCase.execute(999);

    expect(result).toBeInstanceOf(PlayerError);
    if (result instanceof PlayerError) {
      expect(result.statusCode).toBe(404);
      expect(result.message).toContain("999");
    }
  });
});

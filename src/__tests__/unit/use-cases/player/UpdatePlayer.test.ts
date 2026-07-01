import { UpdatePlayer } from "@application/use-cases/player/UpdatePlayer";
import { PlayerError } from "@domain/errors/PlayerError";
import { describe, expect, it } from "vitest";
import { createMockPlayerRepository } from "../../../mocks/mockPlayerRepository";

const updatedPayload = {
  firstname: "Rafael",
  lastname: "Nadal",
  shortname: "R.NAD",
  sex: "M" as const,
  country: { picture: "https://example.com/esp.png", code: "ESP" },
  picture: "https://example.com/nadal.png",
  data: {
    rank: 1,
    points: 9999,
    weight: 85000,
    height: 185,
    age: 34,
    last: [1, 1, 1, 1, 1],
  },
};

describe("UpdatePlayer", () => {
  it("met à jour un joueur existant", async () => {
    const useCase = new UpdatePlayer(createMockPlayerRepository());
    const result = await useCase.execute(1, updatedPayload);

    expect(result).not.toBeInstanceOf(PlayerError);
    if (!(result instanceof PlayerError)) {
      expect(result.id).toBe(1);
      expect(result.firstname).toBe("Rafael");
    }
  });

  it("retourne un PlayerError 404 si le joueur n'existe pas", async () => {
    const useCase = new UpdatePlayer(createMockPlayerRepository());
    const result = await useCase.execute(999, updatedPayload);

    expect(result).toBeInstanceOf(PlayerError);
    if (result instanceof PlayerError) {
      expect(result.statusCode).toBe(404);
      expect(result.message).toContain("999");
    }
  });
});

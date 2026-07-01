import { CreatePlayer } from "@application/use-cases/player/CreatePlayer";
import { describe, expect, it } from "vitest";
import { createMockPlayerRepository } from "../../../mocks/mockPlayerRepository";

const validPayload = {
  firstname: "Roger",
  lastname: "Federer",
  shortname: "R.FED",
  sex: "M" as const,
  country: { picture: "https://example.com/sui.png", code: "SUI" },
  picture: "https://example.com/federer.png",
  data: {
    rank: 3,
    points: 2000,
    weight: 85000,
    height: 185,
    age: 36,
    last: [1, 1, 0, 1, 1],
  },
};

describe("CreatePlayer", () => {
  it("crée un joueur avec un id généré", async () => {
    const useCase = new CreatePlayer(createMockPlayerRepository());
    const result = await useCase.execute(validPayload);

    expect(result.id).toBeTypeOf("number");
    expect(result.firstname).toBe("Roger");
  });

  it("transmet correctement le payload au repository", async () => {
    const repo = createMockPlayerRepository();
    const useCase = new CreatePlayer(repo);
    await useCase.execute(validPayload);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({ firstname: "Roger", lastname: "Federer" }),
    );
  });
});

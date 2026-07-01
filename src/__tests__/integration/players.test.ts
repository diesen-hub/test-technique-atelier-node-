import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app";

describe("Players routes", () => {
  describe("GET /players", () => {
    it("retourne la liste triée par rank", async () => {
      const res = await request(app).get("/players");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      for (let i = 1; i < res.body.length; i++) {
        expect(res.body[i].data.rank).toBeGreaterThanOrEqual(
          res.body[i - 1].data.rank,
        );
      }
    });
  });

  describe("GET /players/:id", () => {
    it("retourne un joueur existant", async () => {
      const res = await request(app).get("/players/52");

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(52);
    });

    it("retourne 404 si joueur introuvable", async () => {
      const res = await request(app).get("/players/99999");

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });

    it("retourne 400 si id invalide", async () => {
      const res = await request(app).get("/players/abc");

      expect(res.status).toBe(400);
    });
  });

  describe("POST /players", () => {
    it("crée un joueur valide", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          firstname: "Roger",
          lastname: "Federer",
          shortname: "R.FED",
          sex: "M",
          country: {
            picture: "https://tenisu.latelier.co/resources/Suisse.png",
            code: "SUI",
          },
          picture: "https://tenisu.latelier.co/resources/Federer.png",
          data: {
            rank: 3,
            points: 2000,
            weight: 85000,
            height: 185,
            age: 36,
            last: [1, 1, 0, 1, 1],
          },
        });

      expect(res.status).toBe(201);
      expect(res.body.firstname).toBe("Roger");
      expect(res.body.id).toBeDefined();
    });

    it("retourne 400 si body invalide", async () => {
      const res = await request(app)
        .post("/players")
        .send({ firstname: "Roger" });

      expect(res.status).toBe(400);
      expect(res.body.details).toBeDefined();
    });

    it("retourne 400 si sex invalide", async () => {
      const res = await request(app)
        .post("/players")
        .send({
          firstname: "Roger",
          lastname: "Federer",
          shortname: "R.FED",
          sex: "X",
          country: {
            picture: "https://tenisu.latelier.co/resources/Suisse.png",
            code: "SUI",
          },
          picture: "https://tenisu.latelier.co/resources/Federer.png",
          data: {
            rank: 3,
            points: 2000,
            weight: 85000,
            height: 185,
            age: 36,
            last: [1, 1, 0, 1, 1],
          },
        });

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /players/:id", () => {
    it("met à jour un joueur existant", async () => {
      const res = await request(app)
        .put("/players/52")
        .send({
          firstname: "Novak",
          lastname: "Djokovic",
          shortname: "N.DJO",
          sex: "M",
          country: {
            picture: "https://tenisu.latelier.co/resources/Serbie.png",
            code: "SRB",
          },
          picture: "https://tenisu.latelier.co/resources/Djokovic.png",
          data: {
            rank: 2,
            points: 9999,
            weight: 80000,
            height: 188,
            age: 31,
            last: [1, 1, 1, 1, 1],
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.data.points).toBe(9999);
    });

    it("retourne 404 si joueur introuvable", async () => {
      const res = await request(app)
        .put("/players/99999")
        .send({
          firstname: "X",
          lastname: "X",
          shortname: "X.X",
          sex: "M",
          country: {
            picture: "https://tenisu.latelier.co/resources/Suisse.png",
            code: "SUI",
          },
          picture: "https://tenisu.latelier.co/resources/X.png",
          data: {
            rank: 1,
            points: 1,
            weight: 70000,
            height: 180,
            age: 25,
            last: [],
          },
        });

      expect(res.status).toBe(404);
    });

    it("retourne 400 si body incomplet", async () => {
      const res = await request(app)
        .put("/players/52")
        .send({ firstname: "Novak" });

      expect(res.status).toBe(400);
    });
  });
});

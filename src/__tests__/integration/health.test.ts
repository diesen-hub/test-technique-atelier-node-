import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app";

describe("GET /health", () => {
  it("retourne status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.timestamp).toBeTypeOf("string");
  });
});

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import {
  CreatePlayerSchema,
  PlayerIdParamSchema,
  PlayerSchema,
  UpdatePlayerSchema,
} from "@infrastructure/http/schemas/player.schema";

const registry = new OpenAPIRegistry();

registry.register("Player", PlayerSchema);
registry.register("CreatePlayer", CreatePlayerSchema);
registry.register("UpdatePlayer", UpdatePlayerSchema);

registry.registerPath({
  method: "get",
  path: "/health",
  tags: ["Health"],
  summary: "Health check",
  responses: {
    200: {
      description: "Service is up",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              timestamp: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/players",
  tags: ["Players"],
  summary: "Get all players",
  responses: {
    200: {
      description: "List of players",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Player" },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/players/{id}",
  tags: ["Players"],
  summary: "Get player by id",
  request: { params: PlayerIdParamSchema },
  responses: {
    200: {
      description: "Player found",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/Player" } },
      },
    },
    400: { description: "Invalid id" },
    404: { description: "Player not found" },
  },
});

registry.registerPath({
  method: "post",
  path: "/players",
  tags: ["Players"],
  summary: "Create a player",
  request: {
    body: { content: { "application/json": { schema: CreatePlayerSchema } } },
  },
  responses: {
    201: {
      description: "Player created",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/Player" } },
      },
    },
    400: { description: "Validation error" },
  },
});

registry.registerPath({
  method: "put",
  path: "/players/{id}",
  tags: ["Players"],
  summary: "Update a player",
  request: {
    params: PlayerIdParamSchema,
    body: { content: { "application/json": { schema: UpdatePlayerSchema } } },
  },
  responses: {
    200: {
      description: "Player updated",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/Player" } },
      },
    },
    400: { description: "Validation error" },
    404: { description: "Player not found" },
  },
});

registry.registerPath({
  method: "get",
  path: "/stats",
  tags: ["Stats"],
  summary: "Get players statistics",
  responses: {
    200: {
      description: "Computed statistics",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              bestCountry: {
                type: "object",
                properties: {
                  code: { type: "string", example: "SRB" },
                  winRatio: { type: "number", example: 0.8 },
                },
              },
              averageIMC: { type: "number", example: 23.45 },
              medianHeight: { type: "number", example: 185 },
            },
          },
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: { title: "Atelier Node API", version: "1.0.0" },
  servers: [{ url: process.env.API_URL ?? 'http://localhost:3000' }],
});

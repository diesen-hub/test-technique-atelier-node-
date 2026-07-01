import { PlayerController } from "@infrastructure/http/controllers/PlayerController";
import { validate } from "@infrastructure/http/middlewares/validate";
import {
  CreatePlayerSchema,
  PlayerIdParamSchema,
  UpdatePlayerSchema,
} from "@infrastructure/http/schemas/player.schema";
import { JsonPlayerRepository } from "@infrastructure/repositories/JsonPlayerRepository";
import { Router } from "express";

const router = Router();
const controller = new PlayerController(new JsonPlayerRepository());

router.get("/", (req, res, next) => controller.getAll(req, res, next));

router.get(
  "/:id",
  validate({ params: PlayerIdParamSchema }),
  (req, res, next) => controller.getById(req, res, next),
);

router.post("/", validate({ body: CreatePlayerSchema }), (req, res, next) =>
  controller.create(req, res, next),
);

router.put(
  "/:id",
  validate({ params: PlayerIdParamSchema, body: UpdatePlayerSchema }),
  (req, res, next) => controller.update(req, res, next),
);

export default router;

import { Router } from 'express';
import { StatsController } from '@infrastructure/http/controllers/StatsController';
import { JsonPlayerRepository } from '@infrastructure/repositories/JsonPlayerRepository';

const router = Router();
const controller = new StatsController(new JsonPlayerRepository());

router.get('/', (req, res, next) => controller.get(req, res, next));

export default router;

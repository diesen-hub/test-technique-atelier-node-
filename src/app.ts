import { openApiDocument } from "@infrastructure/http/docs/swagger";
import { errorHandler } from "@infrastructure/http/middlewares/errorHandler";
import healthRouter from "@infrastructure/http/routes/healthRouter";
import playerRouter from "@infrastructure/http/routes/playerRouter";
import statsRouter from "@infrastructure/http/routes/statsRouter";
import express from "express";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, { customSiteTitle: "Atelier Node API" }),
);
app.use("/health", healthRouter);
app.use("/players", playerRouter);
app.use("/stats", statsRouter);

app.use(errorHandler);

export default app;

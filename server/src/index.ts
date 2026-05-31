import cors from "cors";
import express from "express";
import { config, getClickUpConfig } from "./config/env.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { mapClickUpTask } from "./mappers/taskMapper.js";
import { ClickUpApiError, fetchClickUpTasks } from "./services/clickupService.js";
import { logger } from "./utils/logger.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(config.clientOrigin ? [config.clientOrigin] : []),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS."));
    },
  }),
);
app.use(requestLogger);
app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    service: "project-pulse-api",
    status: "ok",
    docs: "/api/health",
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "project-pulse-api",
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/tasks", async (_request, response) => {
  const clickUpConfig = getClickUpConfig();

  if (!clickUpConfig.ok) {
    logger.warn("tasks request missing ClickUp configuration", {
      path: "/api/tasks",
      missingVariables: clickUpConfig.missingVariables,
    });
    response.status(400).json({
      error: "Missing ClickUp configuration.",
      missingVariables: clickUpConfig.missingVariables,
    });
    return;
  }

  try {
    const startedAt = Date.now();
    const tasks = await fetchClickUpTasks(clickUpConfig.token, clickUpConfig.listId);
    const normalizedTasks = tasks.map(mapClickUpTask);
    const statusBreakdown = normalizedTasks.reduce<Record<string, number>>((accumulator, task) => {
      const statusKey = task.status.toLowerCase();
      accumulator[statusKey] = (accumulator[statusKey] ?? 0) + 1;
      return accumulator;
    }, {});

    logger.info("tasks fetched successfully", {
      path: "/api/tasks",
      totalTasks: normalizedTasks.length,
      criticalTasks: normalizedTasks.filter((task) => task.status_critico).length,
      statusBreakdown,
      clickupDurationMs: Date.now() - startedAt,
    });

    response.json({
      tasks: normalizedTasks,
    });
  } catch (error) {
    if (error instanceof ClickUpApiError) {
      logger.error("clickup tasks fetch failed", {
        path: "/api/tasks",
        statusCode: error.statusCode,
        message: error.message,
      });
      response.status(error.statusCode).json({
        error: error.message,
      });
      return;
    }

    logger.error("unexpected tasks fetch failure", {
      path: "/api/tasks",
      message: error instanceof Error ? error.message : "Unknown error",
    });
    response.status(500).json({
      error: "Unexpected error while fetching ClickUp tasks.",
    });
  }
});

app.listen(config.port, () => {
  logger.info("server started", {
    port: config.port,
    clientOrigin: config.clientOrigin ?? "local-only",
  });
});

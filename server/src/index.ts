import cors from "cors";
import express from "express";
import { config, getClickUpConfig } from "./config/env.js";
import { mapClickUpTask } from "./mappers/taskMapper.js";
import { ClickUpApiError, fetchClickUpTasks } from "./services/clickupService.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "project-pulse-api",
  });
});

app.get("/api/tasks", async (_request, response) => {
  const clickUpConfig = getClickUpConfig();

  if (!clickUpConfig.ok) {
    response.status(400).json({
      error: "Missing ClickUp configuration.",
      missingVariables: clickUpConfig.missingVariables,
    });
    return;
  }

  try {
    const tasks = await fetchClickUpTasks(clickUpConfig.token, clickUpConfig.listId);
    response.json({
      tasks: tasks.map(mapClickUpTask),
    });
  } catch (error) {
    if (error instanceof ClickUpApiError) {
      response.status(error.statusCode).json({
        error: error.message,
      });
      return;
    }

    response.status(500).json({
      error: "Unexpected error while fetching ClickUp tasks.",
    });
  }
});

app.listen(config.port, () => {
  console.log(`Project Pulse API listening on port ${config.port}`);
});

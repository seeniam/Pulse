import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export function requestLogger(request: Request, response: Response, next: NextFunction) {
  const startTime = Date.now();

  response.on("finish", () => {
    logger.info("request completed", {
      method: request.method,
      path: request.path,
      statusCode: response.statusCode,
      durationMs: Date.now() - startTime,
    });
  });

  next();
}

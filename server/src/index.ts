import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: "../.env" });

const app = express();
const port = Number(process.env.PORT || 3333);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "project-pulse-api",
  });
});

app.listen(port, () => {
  console.log(`Project Pulse API listening on port ${port}`);
});


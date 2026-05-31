import type { Task } from "../types/task";

const TASKS_API_URL = "http://localhost:3333/api/tasks";

type TasksResponse = {
  tasks: Task[];
};

export async function fetchTasks() {
  const response = await fetch(TASKS_API_URL);

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar as tarefas do backend.");
  }

  const data = (await response.json()) as TasksResponse;
  return data.tasks;
}

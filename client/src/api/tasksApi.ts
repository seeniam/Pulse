import type { Task } from "../types/task";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3333";
const TASKS_API_URL = `${API_BASE_URL}/api/tasks`;

type TasksResponse = {
  tasks: Task[];
};

export async function fetchTasks() {
  const response = await fetch(TASKS_API_URL);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as tarefas do backend.");
  }

  const data = (await response.json()) as TasksResponse;
  return data.tasks;
}

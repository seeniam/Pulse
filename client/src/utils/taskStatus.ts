import type { Task, TaskBoardStatus } from "../types/task";

const DOING_KEYWORDS = ["doing", "progress", "progresso", "em progresso", "in progress"];
const DONE_KEYWORDS = ["done", "complete", "completed", "concluido", "concluida", "finalizado"];

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function classifyTaskStatus(status: string): TaskBoardStatus {
  const normalizedStatus = normalizeText(status);

  if (DOING_KEYWORDS.some((keyword) => normalizedStatus.includes(keyword))) {
    return "doing";
  }

  if (DONE_KEYWORDS.some((keyword) => normalizedStatus.includes(keyword))) {
    return "done";
  }

  return "todo";
}

export function filterTasks(tasks: Task[], query: string) {
  const normalizedQuery = normalizeText(query.trim());

  if (!normalizedQuery) {
    return tasks;
  }

  return tasks.filter((task) => {
    const matchesTaskName = normalizeText(task.name).includes(normalizedQuery);
    const matchesAssignee = task.assignees.some((assignee) =>
      normalizeText(assignee.name).includes(normalizedQuery),
    );

    return matchesTaskName || matchesAssignee;
  });
}

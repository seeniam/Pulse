import type { Task, TaskBoardStatus } from "../types/task";

const DOING_KEYWORDS = ["doing", "progress", "progresso", "em progresso", "in progress"];
const DONE_KEYWORDS = [
  "closed",
  "complete",
  "completed",
  "concluido",
  "concluida",
  "feito",
  "done",
  "finalizado",
];

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

export type TaskQuickFilter = "all" | "critical" | "unassigned" | "doing" | "done";

function getTaskUpdatedAtMs(task: Task) {
  const updatedAtMs = Number(task.dateUpdated);
  return Number.isFinite(updatedAtMs) ? updatedAtMs : Number.MAX_SAFE_INTEGER;
}

export function applyQuickFilter(tasks: Task[], quickFilter: TaskQuickFilter) {
  if (quickFilter === "all") {
    return tasks;
  }

  return tasks.filter((task) => {
    if (quickFilter === "critical") {
      return task.status_critico;
    }

    if (quickFilter === "unassigned") {
      return task.assignees.length === 0;
    }

    if (quickFilter === "doing") {
      return classifyTaskStatus(task.status) === "doing";
    }

    return classifyTaskStatus(task.status) === "done";
  });
}

export function sortTasksForBoard(tasks: Task[]) {
  return [...tasks].sort((leftTask, rightTask) => {
    if (leftTask.status_critico !== rightTask.status_critico) {
      return leftTask.status_critico ? -1 : 1;
    }

    const updatedAtDelta = getTaskUpdatedAtMs(leftTask) - getTaskUpdatedAtMs(rightTask);

    if (updatedAtDelta !== 0) {
      return updatedAtDelta;
    }

    return leftTask.name.localeCompare(rightTask.name, "pt-BR");
  });
}

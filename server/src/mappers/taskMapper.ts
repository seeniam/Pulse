import { isTaskCritical } from "../utils/criticalStatus.js";

type ClickUpStatus = {
  status?: string;
};

type ClickUpPriority = {
  priority?: string;
};

type ClickUpAssignee = {
  id?: number | string;
  username?: string;
  email?: string;
  profilePicture?: string | null;
};

export type ClickUpTask = {
  id: string;
  name: string;
  status?: ClickUpStatus;
  priority?: ClickUpPriority | null;
  assignees?: ClickUpAssignee[];
  due_date?: string | null;
  date_updated?: string | null;
  url?: string;
};

export type NormalizedTask = {
  id: string;
  name: string;
  status: string;
  priority: string | null;
  assignees: Array<{
    id: string;
    name: string;
    email: string | null;
    profilePicture: string | null;
  }>;
  dueDate: string | null;
  dateUpdated: string | null;
  url: string | null;
  status_critico: boolean;
};

export function mapClickUpTask(task: ClickUpTask): NormalizedTask {
  const priority = task.priority?.priority ?? null;

  return {
    id: task.id,
    name: task.name,
    status: task.status?.status ?? "unknown",
    priority,
    assignees: (task.assignees ?? []).map((assignee) => ({
      id: String(assignee.id ?? ""),
      name: assignee.username ?? "Sem responsavel",
      email: assignee.email ?? null,
      profilePicture: assignee.profilePicture ?? null,
    })),
    dueDate: task.due_date ?? null,
    dateUpdated: task.date_updated ?? null,
    url: task.url ?? null,
    status_critico: isTaskCritical(priority, task.date_updated),
  };
}


export type TaskAssignee = {
  id: string;
  name: string;
  email: string | null;
  profilePicture: string | null;
};

export type Task = {
  id: string;
  name: string;
  status: string;
  priority: string | null;
  assignees: TaskAssignee[];
  dueDate: string | null;
  dateUpdated: string | null;
  url: string | null;
  status_critico: boolean;
};

export type TaskBoardStatus = "todo" | "doing" | "done";

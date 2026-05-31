import type { ClickUpTask } from "../mappers/taskMapper.js";

const CLICKUP_API_BASE_URL = "https://api.clickup.com/api/v2";
const MAX_TASK_PAGES = 20;

type ClickUpTasksResponse = {
  tasks?: ClickUpTask[];
};

export class ClickUpApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 502,
  ) {
    super(message);
    this.name = "ClickUpApiError";
  }
}

export async function fetchClickUpTasks(token: string, listId: string) {
  const tasks: ClickUpTask[] = [];

  for (let page = 0; page < MAX_TASK_PAGES; page += 1) {
    const url = new URL(`${CLICKUP_API_BASE_URL}/list/${listId}/task`);
    url.searchParams.set("include_closed", "true");
    url.searchParams.set("page", String(page));

    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new ClickUpApiError(
        `ClickUp API returned ${response.status} while fetching tasks.`,
        response.status >= 500 ? 502 : response.status,
      );
    }

    const data = (await response.json()) as ClickUpTasksResponse;
    const pageTasks = data.tasks ?? [];

    if (pageTasks.length === 0) {
      break;
    }

    tasks.push(...pageTasks);
  }

  return tasks;
}

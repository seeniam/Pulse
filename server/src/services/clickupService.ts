import type { ClickUpTask } from "../mappers/taskMapper.js";

const CLICKUP_API_BASE_URL = "https://api.clickup.com/api/v2";

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
  const response = await fetch(`${CLICKUP_API_BASE_URL}/list/${listId}/task`, {
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
  return data.tasks ?? [];
}


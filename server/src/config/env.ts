import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env", override: true });
dotenv.config({ path: "../.env.local" });
dotenv.config({ path: "../.env", override: true });

export type AppConfig = {
  port: number;
  clickupToken?: string;
  clickupListId?: string;
  clientOrigin?: string;
};

export const config: AppConfig = {
  port: Number(process.env.PORT || 3333),
  clickupToken: process.env.CLICKUP_TOKEN,
  clickupListId: process.env.CLICKUP_LIST_ID,
  clientOrigin: process.env.CLIENT_ORIGIN,
};

export function getClickUpConfig() {
  const token = config.clickupToken;
  const listId = config.clickupListId;
  const missingVariables: string[] = [];

  if (!token) {
    missingVariables.push("CLICKUP_TOKEN");
  }

  if (!listId) {
    missingVariables.push("CLICKUP_LIST_ID");
  }

  if (missingVariables.length > 0) {
    return {
      ok: false as const,
      missingVariables,
    };
  }

  return {
    ok: true as const,
    token: token as string,
    listId: listId as string,
  };
}

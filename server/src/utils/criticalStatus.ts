const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

export function isTaskCritical(priority?: string | null, dateUpdated?: string | number | null) {
  const normalizedPriority = priority?.trim().toLowerCase();

  if (normalizedPriority === "urgent") {
    return true;
  }

  if (!dateUpdated) {
    return false;
  }

  const updatedAtMs = Number(dateUpdated);

  if (!Number.isFinite(updatedAtMs)) {
    return false;
  }

  return Date.now() - updatedAtMs > THREE_DAYS_IN_MS;
}


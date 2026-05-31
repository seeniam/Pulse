import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isTaskCritical } from "./criticalStatus.js";

const NOW = new Date("2026-05-31T12:00:00.000Z");
const DAY_IN_MS = 24 * 60 * 60 * 1000;

describe("isTaskCritical", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for priority "urgent"', () => {
    expect(isTaskCritical("urgent", null)).toBe(true);
  });

  it("returns true for urgent priority with different casing", () => {
    expect(isTaskCritical("Urgent", null)).toBe(true);
  });

  it("returns true when the task has not been updated for more than 3 days", () => {
    const outdatedTimestamp = String(NOW.getTime() - 4 * DAY_IN_MS);

    expect(isTaskCritical("normal", outdatedTimestamp)).toBe(true);
  });

  it("returns false when the task was updated recently", () => {
    const recentTimestamp = String(NOW.getTime() - 2 * DAY_IN_MS);

    expect(isTaskCritical("normal", recentTimestamp)).toBe(false);
  });

  it("returns false when dateUpdated is missing", () => {
    expect(isTaskCritical("normal", null)).toBe(false);
  });

  it("returns false when dateUpdated is invalid", () => {
    expect(isTaskCritical("normal", "invalid-timestamp")).toBe(false);
  });

  it("evaluates string timestamps in milliseconds correctly", () => {
    const timestampInMilliseconds = String(NOW.getTime() - 5 * DAY_IN_MS);

    expect(isTaskCritical("low", timestampInMilliseconds)).toBe(true);
  });
});

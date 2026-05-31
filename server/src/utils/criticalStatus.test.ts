import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isTaskCritical } from "./criticalStatus.js";

const NOW = new Date("2026-05-31T12:00:00.000Z");
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MINUTE_IN_MS = 60 * 1000;

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

  it("returns true for urgent priority even when the update date is recent", () => {
    const recentTimestamp = String(NOW.getTime() - DAY_IN_MS);

    expect(isTaskCritical("urgent", recentTimestamp)).toBe(true);
  });

  it("returns true when a normal priority task was updated exactly 4 days ago", () => {
    const outdatedTimestamp = String(NOW.getTime() - 4 * DAY_IN_MS);

    expect(isTaskCritical("normal", outdatedTimestamp)).toBe(true);
  });

  it("returns true when a normal priority task is 3 days and 1 minute without update", () => {
    const outdatedTimestamp = String(NOW.getTime() - (3 * DAY_IN_MS + MINUTE_IN_MS));

    expect(isTaskCritical("normal", outdatedTimestamp)).toBe(true);
  });

  it("returns true when normal priority has an old dateUpdated value", () => {
    const outdatedTimestamp = String(NOW.getTime() - 5 * DAY_IN_MS);

    expect(isTaskCritical("normal", outdatedTimestamp)).toBe(true);
  });

  it("returns false when a normal priority task was updated exactly 2 days ago", () => {
    const recentTimestamp = String(NOW.getTime() - 2 * DAY_IN_MS);

    expect(isTaskCritical("normal", recentTimestamp)).toBe(false);
  });

  it("returns false when dateUpdated is missing", () => {
    expect(isTaskCritical("normal", null)).toBe(false);
  });

  it("returns false when dateUpdated is invalid", () => {
    expect(isTaskCritical("normal", "invalid-timestamp")).toBe(false);
  });

  it("evaluates old string timestamps in milliseconds correctly", () => {
    const timestampInMilliseconds = String(NOW.getTime() - 5 * DAY_IN_MS);

    expect(isTaskCritical("low", timestampInMilliseconds)).toBe(true);
  });

  it("evaluates recent string timestamps in milliseconds correctly", () => {
    const timestampInMilliseconds = String(NOW.getTime() - DAY_IN_MS);

    expect(isTaskCritical("low", timestampInMilliseconds)).toBe(false);
  });
});

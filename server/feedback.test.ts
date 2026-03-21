import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the DB helpers so tests don't need a real database
vi.mock("./db", () => ({
  insertFeedback: vi.fn().mockResolvedValue(undefined),
  listFeedback: vi.fn().mockResolvedValue([
    { id: 1, rating: 5, name: "Alice", email: "alice@example.com", comment: "Love it!", createdAt: new Date() },
  ]),
  getFeedbackCount: vi.fn().mockResolvedValue(1),
}));

// Mock notification so it doesn't call external services
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function makeCtx(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("feedback.submit", () => {
  it("accepts a valid 5-star submission with all fields", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.feedback.submit({
      rating: 5,
      name: "Alice",
      email: "alice@example.com",
      comment: "Great app!",
    });
    expect(result).toEqual({ success: true });
  });

  it("accepts a minimal submission (rating only)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.feedback.submit({ rating: 3 });
    expect(result).toEqual({ success: true });
  });

  it("accepts an empty email string", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.feedback.submit({ rating: 4, email: "" });
    expect(result).toEqual({ success: true });
  });

  it("rejects a rating below 1", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.feedback.submit({ rating: 0 })).rejects.toThrow();
  });

  it("rejects a rating above 5", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.feedback.submit({ rating: 6 })).rejects.toThrow();
  });

  it("rejects an invalid email format", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.feedback.submit({ rating: 4, email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("feedback.count", () => {
  it("returns the feedback count as a number", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const count = await caller.feedback.count();
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

describe("feedback.list", () => {
  it("requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.feedback.list()).rejects.toThrow();
  });

  it("returns list for authenticated user", async () => {
    const user: TrpcContext["user"] = {
      id: 1,
      openId: "owner",
      email: "owner@example.com",
      name: "Owner",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    const caller = appRouter.createCaller(makeCtx(user));
    const list = await caller.feedback.list();
    expect(Array.isArray(list)).toBe(true);
  });
});

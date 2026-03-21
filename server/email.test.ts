import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  insertFeedback: vi.fn().mockResolvedValue(undefined),
  listFeedback: vi.fn().mockResolvedValue([]),
  getFeedbackCount: vi.fn().mockResolvedValue(3),
  insertEmailCapture: vi.fn().mockResolvedValue(undefined),
  getEmailCaptureCount: vi.fn().mockResolvedValue(5),
  getTotalSubmissionCount: vi.fn().mockResolvedValue(8),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function makeCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("email.capture", () => {
  it("accepts a valid email with default source", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.email.capture({ email: "test@example.com", source: "landing" });
    expect(result).toEqual({ success: true });
  });

  it("accepts a pro source email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.email.capture({ email: "pro@example.com", source: "pro" });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.email.capture({ email: "not-valid", source: "landing" })).rejects.toThrow();
  });
});

describe("email.count", () => {
  it("returns a number", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const count = await caller.email.count();
    expect(typeof count).toBe("number");
  });
});

describe("social.shopperCount", () => {
  it("returns a number seeded above the real count", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const count = await caller.social.shopperCount();
    expect(typeof count).toBe("number");
    // Should be real count (8) + seed (247) = 255
    expect(count).toBeGreaterThanOrEqual(247);
  });
});

import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so tests don't need a real database
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    listReceiptIndex: vi.fn(),
    getLatestReceiptIndex: vi.fn(),
    insertFeedback: vi.fn(),
    listFeedback: vi.fn(),
    getFeedbackCount: vi.fn().mockResolvedValue(0),
    insertEmailCapture: vi.fn(),
    getEmailCaptureCount: vi.fn().mockResolvedValue(0),
    getTotalSubmissionCount: vi.fn().mockResolvedValue(0),
  };
});

const mockEntry = {
  id: 1,
  monthLabel: "March 2026",
  year: 2026,
  month: 3,
  winner: "Aldi",
  basketTotals: { Tesco: 70.40, Aldi: 53.10, Lidl: 55.20 },
  categoryBreakdown: [
    { category: "Dairy & Eggs", Tesco: 12.10, Aldi: 8.80, Lidl: 9.10 },
  ],
  receiptCount: 451,
  summary: "Aldi cheapest in March.",
  publishedAt: new Date("2026-03-31"),
  createdAt: new Date("2026-03-31"),
};

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("index.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an array of index entries", async () => {
    const { listReceiptIndex } = await import("./db");
    vi.mocked(listReceiptIndex).mockResolvedValue([mockEntry] as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.index.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({ monthLabel: "March 2026", winner: "Aldi" });
  });

  it("returns empty array when no entries exist", async () => {
    const { listReceiptIndex } = await import("./db");
    vi.mocked(listReceiptIndex).mockResolvedValue([]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.index.list();

    expect(result).toEqual([]);
  });
});

describe("index.latest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the most recent entry", async () => {
    const { getLatestReceiptIndex } = await import("./db");
    vi.mocked(getLatestReceiptIndex).mockResolvedValue(mockEntry as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.index.latest();

    expect(result).toMatchObject({ year: 2026, month: 3, winner: "Aldi" });
  });

  it("returns undefined when no entries exist", async () => {
    const { getLatestReceiptIndex } = await import("./db");
    vi.mocked(getLatestReceiptIndex).mockResolvedValue(undefined);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.index.latest();

    expect(result).toBeUndefined();
  });
});

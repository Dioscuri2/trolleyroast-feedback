import { decimal, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(),
  rating: int("rating").notNull(), // 1-5
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

export const emailCaptures = mysqlTable("email_captures", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  source: varchar("source", { length: 64 }).default("landing").notNull(), // 'landing' | 'pro'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailCapture = typeof emailCaptures.$inferSelect;
export type InsertEmailCapture = typeof emailCaptures.$inferInsert;

// Monthly Receipt Index — one row per month, stores basket prices per supermarket
export const receiptIndex = mysqlTable("receipt_index", {
  id: int("id").autoincrement().primaryKey(),
  // e.g. "March 2026"
  monthLabel: varchar("monthLabel", { length: 32 }).notNull(),
  year: int("year").notNull(),
  month: int("month").notNull(), // 1-12
  // Winning supermarket name
  winner: varchar("winner", { length: 64 }).notNull(),
  // Average basket total per supermarket (JSON: { Tesco: 68.40, Aldi: 54.10, ... })
  basketTotals: json("basketTotals").notNull(),
  // Category breakdown (JSON: [{ category: "Dairy", Tesco: 12.40, Aldi: 9.80, ... }])
  categoryBreakdown: json("categoryBreakdown").notNull(),
  // Number of real receipts used to compile this index
  receiptCount: int("receiptCount").notNull().default(0),
  // Short editorial summary for SEO
  summary: text("summary"),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReceiptIndex = typeof receiptIndex.$inferSelect;
export type InsertReceiptIndex = typeof receiptIndex.$inferInsert;
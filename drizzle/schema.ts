import { integer, jsonb, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const users = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { mode: "date" }).defaultNow().notNull(),
});
export const feedback = pgTable("feedback", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  rating: integer("rating").notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  comment: text("comment"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});
export const emailCaptures = pgTable("email_captures", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  source: varchar("source", { length: 64 }).default("landing").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});
export const receiptIndex = pgTable("receipt_index", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  monthLabel: varchar("monthLabel", { length: 32 }).notNull(),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  winner: varchar("winner", { length: 64 }).notNull(),
  basketTotals: jsonb("basketTotals").notNull(),
  categoryBreakdown: jsonb("categoryBreakdown").notNull(),
  receiptCount: integer("receiptCount").notNull().default(0),
  summary: text("summary"),
  publishedAt: timestamp("publishedAt", { mode: "date" }).defaultNow().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

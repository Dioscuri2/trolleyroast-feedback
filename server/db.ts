import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { emailCaptures, feedback, receiptIndex, users } from "../drizzle/schema";
import { ENV } from './_core/env';
let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;
export async function getDb() {
  const connectionString = process.env.POSTGRES_URL || ENV.databaseUrl;
  if (!_db && connectionString) {
    try {
      _client = postgres(connectionString, { max: 1, prepare: false });
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      if (_client) await _client.end({ timeout: 1 }).catch(() => undefined);
      _client = null;
      _db = null;
    }
  }
  return _db;
}
export async function upsertUser(user: any) {
  if (!user.openId) throw new Error("User openId is required");
  const db = await getDb();
  if (!db) return;
  const values: any = { openId: user.openId };
  const updateSet: any = { updatedAt: new Date() };
  if (user.name !== undefined) { values.name = user.name; updateSet.name = user.name; }
  if (user.email !== undefined) { values.email = user.email; updateSet.email = user.email; }
  if (user.lastSignedIn) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  await db.insert(users).values(values).onConflictDoUpdate({ target: users.openId, set: updateSet });
}
export async function listReceiptIndex(limit = 12) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(receiptIndex).orderBy(desc(receiptIndex.year), desc(receiptIndex.month)).limit(limit);
}
export async function getLatestReceiptIndex() {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(receiptIndex).orderBy(desc(receiptIndex.year), desc(receiptIndex.month)).limit(1);
  return rows[0];
}
export async function insertFeedback(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(feedback).values(data);
}
export async function insertEmailCapture(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(emailCaptures).values(data);
}

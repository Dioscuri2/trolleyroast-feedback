import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { receiptIndex } from "../drizzle/schema";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL or DATABASE_URL is required to seed receipt_index");
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

const rows = [
  {
    monthLabel: "January 2026",
    year: 2026,
    month: 1,
    winner: "Aldi",
    basketTotals: {
      Tesco: 71.8,
      Asda: 66.2,
      Sainsburys: 69.4,
      Morrisons: 67.9,
      Aldi: 54.7,
      Lidl: 56.1,
      Waitrose: 79.3,
      Coop: 81.1,
    },
    categoryBreakdown: [
      { category: "Fruit & veg", Tesco: 12.9, Asda: 11.8, Sainsburys: 12.4, Morrisons: 11.9, Aldi: 9.4, Lidl: 9.8, Waitrose: 14.2, Coop: 14.8 },
      { category: "Dairy & eggs", Tesco: 9.7, Asda: 8.9, Sainsburys: 9.4, Morrisons: 9.1, Aldi: 7.1, Lidl: 7.4, Waitrose: 10.8, Coop: 11.0 },
      { category: "Meat & fish", Tesco: 18.5, Asda: 17.4, Sainsburys: 18.1, Morrisons: 17.7, Aldi: 14.3, Lidl: 14.8, Waitrose: 20.7, Coop: 21.4 },
      { category: "Bakery & cereal", Tesco: 8.6, Asda: 7.9, Sainsburys: 8.3, Morrisons: 8.0, Aldi: 6.2, Lidl: 6.4, Waitrose: 9.7, Coop: 9.8 },
      { category: "Cupboard staples", Tesco: 13.4, Asda: 12.0, Sainsburys: 12.6, Morrisons: 12.3, Aldi: 10.1, Lidl: 10.4, Waitrose: 14.9, Coop: 15.4 },
      { category: "Drinks", Tesco: 8.7, Asda: 8.2, Sainsburys: 8.6, Morrisons: 8.9, Aldi: 7.6, Lidl: 7.3, Waitrose: 9.0, Coop: 8.7 },
    ],
    receiptCount: 1284,
    summary: "Aldi opened 2026 as the cheapest full-basket supermarket, with Lidl close behind and a £26.40 gap to Co-op.",
  },
  {
    monthLabel: "February 2026",
    year: 2026,
    month: 2,
    winner: "Aldi",
    basketTotals: {
      Tesco: 72.6,
      Asda: 66.8,
      Sainsburys: 70.2,
      Morrisons: 68.7,
      Aldi: 55.2,
      Lidl: 56.6,
      Waitrose: 80.1,
      Coop: 82.0,
    },
    categoryBreakdown: [
      { category: "Fruit & veg", Tesco: 13.1, Asda: 12.0, Sainsburys: 12.7, Morrisons: 12.2, Aldi: 9.6, Lidl: 9.9, Waitrose: 14.4, Coop: 15.0 },
      { category: "Dairy & eggs", Tesco: 9.8, Asda: 9.0, Sainsburys: 9.5, Morrisons: 9.2, Aldi: 7.2, Lidl: 7.5, Waitrose: 10.9, Coop: 11.2 },
      { category: "Meat & fish", Tesco: 18.8, Asda: 17.6, Sainsburys: 18.4, Morrisons: 18.0, Aldi: 14.6, Lidl: 15.0, Waitrose: 21.0, Coop: 21.7 },
      { category: "Bakery & cereal", Tesco: 8.8, Asda: 8.1, Sainsburys: 8.4, Morrisons: 8.2, Aldi: 6.3, Lidl: 6.5, Waitrose: 9.8, Coop: 10.0 },
      { category: "Cupboard staples", Tesco: 13.6, Asda: 12.2, Sainsburys: 12.9, Morrisons: 12.5, Aldi: 10.2, Lidl: 10.6, Waitrose: 15.1, Coop: 15.6 },
      { category: "Drinks", Tesco: 8.5, Asda: 7.9, Sainsburys: 8.3, Morrisons: 8.6, Aldi: 7.3, Lidl: 7.1, Waitrose: 8.9, Coop: 8.5 },
    ],
    receiptCount: 1412,
    summary: "February kept Aldi in front, with Asda and Morrisons narrowing the middle tier but still well behind the discounters.",
  },
  {
    monthLabel: "March 2026",
    year: 2026,
    month: 3,
    winner: "Aldi",
    basketTotals: {
      Tesco: 70.4,
      Asda: 64.9,
      Sainsburys: 68.8,
      Morrisons: 66.5,
      Aldi: 53.1,
      Lidl: 55.2,
      Waitrose: 77.8,
      Coop: 79.5,
    },
    categoryBreakdown: [
      { category: "Fruit & veg", Tesco: 12.4, Asda: 11.4, Sainsburys: 12.1, Morrisons: 11.7, Aldi: 9.0, Lidl: 9.5, Waitrose: 13.8, Coop: 14.3 },
      { category: "Dairy & eggs", Tesco: 9.4, Asda: 8.6, Sainsburys: 9.1, Morrisons: 8.8, Aldi: 6.9, Lidl: 7.2, Waitrose: 10.3, Coop: 10.7 },
      { category: "Meat & fish", Tesco: 18.0, Asda: 16.8, Sainsburys: 17.6, Morrisons: 17.0, Aldi: 13.9, Lidl: 14.4, Waitrose: 20.3, Coop: 20.9 },
      { category: "Bakery & cereal", Tesco: 8.4, Asda: 7.8, Sainsburys: 8.0, Morrisons: 7.9, Aldi: 6.1, Lidl: 6.3, Waitrose: 9.4, Coop: 9.6 },
      { category: "Cupboard staples", Tesco: 13.1, Asda: 11.7, Sainsburys: 12.3, Morrisons: 12.0, Aldi: 9.8, Lidl: 10.2, Waitrose: 14.6, Coop: 15.0 },
      { category: "Drinks", Tesco: 9.1, Asda: 8.6, Sainsburys: 9.7, Morrisons: 9.1, Aldi: 7.4, Lidl: 7.6, Waitrose: 9.4, Coop: 9.0 },
    ],
    receiptCount: 1451,
    summary: "March widened Aldi's lead again. A typical household could save over £26 by switching a full basket from Co-op to Aldi.",
  },
  {
    monthLabel: "April 2026",
    year: 2026,
    month: 4,
    winner: "Lidl",
    basketTotals: {
      Tesco: 71.1,
      Asda: 65.3,
      Sainsburys: 69.0,
      Morrisons: 66.9,
      Aldi: 54.2,
      Lidl: 53.9,
      Waitrose: 78.4,
      Coop: 80.2,
    },
    categoryBreakdown: [
      { category: "Fruit & veg", Tesco: 12.7, Asda: 11.5, Sainsburys: 12.2, Morrisons: 11.8, Aldi: 9.2, Lidl: 9.0, Waitrose: 14.0, Coop: 14.5 },
      { category: "Dairy & eggs", Tesco: 9.5, Asda: 8.7, Sainsburys: 9.2, Morrisons: 8.9, Aldi: 7.0, Lidl: 6.9, Waitrose: 10.4, Coop: 10.8 },
      { category: "Meat & fish", Tesco: 18.2, Asda: 17.0, Sainsburys: 17.8, Morrisons: 17.2, Aldi: 14.1, Lidl: 13.9, Waitrose: 20.5, Coop: 21.1 },
      { category: "Bakery & cereal", Tesco: 8.5, Asda: 7.9, Sainsburys: 8.1, Morrisons: 8.0, Aldi: 6.1, Lidl: 6.0, Waitrose: 9.5, Coop: 9.7 },
      { category: "Cupboard staples", Tesco: 13.3, Asda: 11.9, Sainsburys: 12.4, Morrisons: 12.1, Aldi: 9.9, Lidl: 9.8, Waitrose: 14.8, Coop: 15.2 },
      { category: "Drinks", Tesco: 8.9, Asda: 8.3, Sainsburys: 9.3, Morrisons: 8.9, Aldi: 7.9, Lidl: 8.3, Waitrose: 9.2, Coop: 8.9 },
    ],
    receiptCount: 1526,
    summary: "April was the closest contest yet, with Lidl edging Aldi by pennies on the full-basket total while the premium stores stayed far adrift.",
  },
];

async function main() {
  await db.insert(receiptIndex).values(rows as any);
  console.log(`Seeded ${rows.length} receipt_index rows`);
  await client.end();
}

main().catch(async (error) => {
  console.error(error);
  await client.end({ timeout: 1 }).catch(() => undefined);
  process.exit(1);
});

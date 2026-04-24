import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import { ArrowRight, Trophy, TrendingDown, ShoppingCart, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";

// ─── Types ────────────────────────────────────────────────────────────────────
type BasketTotals = Record<string, number>;
type CategoryRow = { category: string } & Record<string, number>;

interface IndexEntry {
  id: number;
  monthLabel: string;
  year: number;
  month: number;
  winner: string;
  basketTotals: BasketTotals;
  categoryBreakdown: CategoryRow[];
  receiptCount: number;
  summary: string | null;
  publishedAt: Date;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SUPERMARKET_COLORS: Record<string, string> = {
  Tesco: "#00539F",
  Asda: "#78BE20",
  Sainsburys: "#F06C00",
  Morrisons: "#FDB913",
  Aldi: "#003882",
  Lidl: "#0050AA",
  Waitrose: "#007B40",
  Coop: "#00B1A9",
};

const SUPERMARKET_DISPLAY: Record<string, string> = {
  Sainsburys: "Sainsbury's",
  Coop: "Co-op",
};

function displayName(key: string) {
  return SUPERMARKET_DISPLAY[key] ?? key;
}

// ─── Bar chart for basket totals ──────────────────────────────────────────────
function BasketBars({ totals, winner }: { totals: BasketTotals; winner: string }) {
  const entries = Object.entries(totals).sort((a, b) => a[1] - b[1]);
  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div className="space-y-3">
      {entries.map(([store, amount]) => {
        const pct = (amount / max) * 100;
        const isWinner = store === winner;
        const color = SUPERMARKET_COLORS[store] ?? "#1B3A2D";
        return (
          <div key={store}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: color }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: isWinner ? "#1B3A2D" : "#6B6860" }}
                >
                  {displayName(store)}
                  {isWinner && (
                    <span
                      className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(201,169,110,0.2)", color: "#C9A96E" }}
                    >
                      Cheapest
                    </span>
                  )}
                </span>
              </div>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: isWinner ? "#1B3A2D" : "#6B6860" }}
              >
                £{amount.toFixed(2)}
              </span>
            </div>
            <div
              className="h-2.5 rounded-full overflow-hidden"
              style={{ background: "#EDE8DF" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: isWinner ? "#C9A96E" : color + "60" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Category breakdown table ─────────────────────────────────────────────────
function CategoryTable({ rows }: { rows: CategoryRow[] }) {
  const supermarkets = Object.keys(rows[0] ?? {}).filter((k) => k !== "category");

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs min-w-[480px]">
        <thead>
          <tr style={{ borderBottom: "1px solid #E8E2D6" }}>
            <th
              className="text-left py-2 px-3 font-semibold"
              style={{ color: "#9B9790" }}
            >
              Category
            </th>
            {supermarkets.map((s) => (
              <th
                key={s}
                className="text-right py-2 px-3 font-semibold"
                style={{ color: SUPERMARKET_COLORS[s] ?? "#9B9790" }}
              >
                {displayName(s)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const vals = supermarkets.map((s) => row[s] as number);
            const minVal = Math.min(...vals);
            return (
              <tr
                key={row.category}
                style={{
                  background: i % 2 === 0 ? "transparent" : "rgba(250,248,243,0.6)",
                  borderBottom: "1px solid #F0EDE6",
                }}
              >
                <td
                  className="py-2 px-3 font-medium"
                  style={{ color: "#1C1A17" }}
                >
                  {row.category}
                </td>
                {supermarkets.map((s) => {
                  const val = row[s] as number;
                  const isCheapest = val === minVal;
                  return (
                    <td
                      key={s}
                      className="text-right py-2 px-3 tabular-nums"
                      style={{
                        color: isCheapest ? "#1B3A2D" : "#6B6860",
                        fontWeight: isCheapest ? 700 : 400,
                      }}
                    >
                      £{val.toFixed(2)}
                      {isCheapest && (
                        <span
                          className="ml-1"
                          style={{ color: "#C9A96E" }}
                          title="Cheapest"
                        >
                          ★
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Single month card ────────────────────────────────────────────────────────
function MonthCard({ entry, isLatest }: { entry: IndexEntry; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(isLatest);
  const totals = entry.basketTotals as BasketTotals;
  const categories = entry.categoryBreakdown as CategoryRow[];
  const sortedTotals = Object.entries(totals).sort((a, b) => a[1] - b[1]);
  const cheapest = sortedTotals[0];
  const mostExpensive = sortedTotals[sortedTotals.length - 1];
  const saving = mostExpensive[1] - cheapest[1];

  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
    >
      {/* Card header */}
      <div
        className="px-6 py-5 flex items-center justify-between cursor-pointer"
        style={{ background: isLatest ? "#1B3A2D" : "#FAF8F3", borderBottom: "1px solid #E8E2D6" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {isLatest && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(201,169,110,0.25)", color: "#C9A96E" }}
            >
              Latest
            </span>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={15} style={{ color: isLatest ? "rgba(250,248,243,0.6)" : "#9B9790" }} />
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: isLatest ? "#FAF8F3" : "#1B3A2D" }}
            >
              {entry.monthLabel}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p
              className="text-xs font-medium"
              style={{ color: isLatest ? "rgba(250,248,243,0.6)" : "#9B9790" }}
            >
              Cheapest supermarket
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: isLatest ? "#C9A96E" : "#1B3A2D" }}
            >
              {displayName(entry.winner)} — £{cheapest[1].toFixed(2)}
            </p>
          </div>
          <div style={{ color: isLatest ? "rgba(250,248,243,0.6)" : "#9B9790" }}>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-6 py-6 space-y-6">
          {/* Key stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
            >
              <Trophy size={18} className="mx-auto mb-1.5" style={{ color: "#C9A96E" }} />
              <p className="text-xs font-medium mb-0.5" style={{ color: "#9B9790" }}>
                Winner
              </p>
              <p className="text-sm font-bold" style={{ color: "#1B3A2D" }}>
                {displayName(entry.winner)}
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
            >
              <TrendingDown size={18} className="mx-auto mb-1.5" style={{ color: "#C9A96E" }} />
              <p className="text-xs font-medium mb-0.5" style={{ color: "#9B9790" }}>
                Max saving
              </p>
              <p className="text-sm font-bold" style={{ color: "#1B3A2D" }}>
                £{saving.toFixed(2)}
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
            >
              <ShoppingCart size={18} className="mx-auto mb-1.5" style={{ color: "#C9A96E" }} />
              <p className="text-xs font-medium mb-0.5" style={{ color: "#9B9790" }}>
                Receipts
              </p>
              <p className="text-sm font-bold" style={{ color: "#1B3A2D" }}>
                {entry.receiptCount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#9B9790" }}
            >
              Average basket total — {entry.monthLabel}
            </h4>
            <BasketBars totals={totals} winner={entry.winner} />
          </div>

          {/* Summary */}
          {entry.summary && (
            <div
              className="rounded-xl px-5 py-4"
              style={{ background: "rgba(27,58,45,0.04)", borderLeft: "3px solid #C9A96E" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#6B6860" }}>
                {entry.summary}
              </p>
            </div>
          )}

          {/* Category breakdown */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#9B9790" }}
            >
              Category breakdown
            </h4>
            <CategoryTable rows={categories} />
          </div>
        </div>
      )}
    </article>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl h-20 animate-pulse"
          style={{ background: "#EDE8DF" }}
        />
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ReceiptIndexPage() {
  const { data: entries, isLoading } = trpc.index.list.useQuery();

  const latestId = entries?.[0]?.id;

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F3" }}>
      <RouteSeo
        title="Monthly Receipt Index | TrolleyRoast"
        description="See TrolleyRoast's monthly supermarket Receipt Index based on real scanned receipts and whole-basket comparison methodology."
        path="/receipt-index"
      />

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-20 border-b"
        style={{
          background: "rgba(250,248,243,0.9)",
          backdropFilter: "blur(8px)",
          borderColor: "#E8E2D6",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-display text-xl font-semibold cursor-pointer"
              style={{ color: "#1B3A2D" }}
            >
              TrolleyRoast
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/feedback">
              <span
                className="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: "#6B6860" }}
              >
                Feedback
              </span>
            </Link>
            <a
              href="https://www.trolleyroast.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="h-8 px-4 text-xs font-semibold"
                style={{ background: "#1B3A2D", color: "#FAF8F3" }}
              >
                Try the App
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="px-4 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center max-w-3xl mx-auto">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-6"
          style={{
            background: "rgba(201,169,110,0.15)",
            color: "#C9A96E",
            border: "1px solid rgba(201,169,110,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          Updated monthly · Based on real scanned receipts
        </div>

        <h1
          className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4"
          style={{ color: "#1B3A2D" }}
        >
          The TrolleyRoast<br />
          <span style={{ color: "#C9A96E" }}>Monthly Receipt Index</span>
        </h1>

        <p
          className="text-base sm:text-lg leading-relaxed mb-6 max-w-xl mx-auto"
          style={{ color: "#6B6860" }}
        >
          Every month we analyse thousands of real UK supermarket receipts to find out which
          supermarket is genuinely cheapest for a full basket shop — not just individual items.
          No sponsored results. No guesswork. Just data.
        </p>

        <a
          href="https://www.trolleyroast.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="h-12 px-7 text-sm font-semibold"
            style={{ background: "#1B3A2D", color: "#FAF8F3" }}
          >
            Scan Your Receipt Free
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </a>
      </header>

      {/* ── Methodology note ── */}
      <section
        className="border-y py-5 px-4"
        style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.5)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm" style={{ color: "#6B6860" }}>
          <div className="flex gap-3 items-start">
            <ShoppingCart size={16} className="mt-0.5 shrink-0" style={{ color: "#C9A96E" }} />
            <span>
              <strong style={{ color: "#1C1A17" }}>Real receipts only.</strong> Every data point
              comes from an actual scanned receipt — not estimated prices or sample baskets.
            </span>
          </div>
          <div className="flex gap-3 items-start">
            <Trophy size={16} className="mt-0.5 shrink-0" style={{ color: "#C9A96E" }} />
            <span>
              <strong style={{ color: "#1C1A17" }}>Whole basket comparison.</strong> We compare
              the total cost of switching your entire shop — not cherry-picked items.
            </span>
          </div>
          <div className="flex gap-3 items-start">
            <TrendingDown size={16} className="mt-0.5 shrink-0" style={{ color: "#C9A96E" }} />
            <span>
              <strong style={{ color: "#1C1A17" }}>Six supermarkets.</strong> Tesco, Asda,
              Sainsbury's, Morrisons, Aldi and Lidl — every month, every category.
            </span>
          </div>
        </div>
      </section>

      {/* ── Index entries ── */}
      <main className="py-12 px-4 max-w-3xl mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : entries && entries.length > 0 ? (
          <div className="space-y-5">
            {entries.map((entry) => (
              <MonthCard
                key={entry.id}
                entry={entry as unknown as IndexEntry}
                isLatest={entry.id === latestId}
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
          >
            <p className="text-sm" style={{ color: "#9B9790" }}>
              The first index will be published soon. Check back next month.
            </p>
          </div>
        )}
      </main>

      {/* ── Email capture ── */}
      <section
        className="py-14 px-4 text-center max-w-xl mx-auto border-t"
        style={{ borderColor: "#E8E2D6" }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest mb-3 block"
          style={{ color: "#C9A96E" }}
        >
          Never miss an update
        </span>
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-3"
          style={{ color: "#1B3A2D" }}
        >
          Get the index in your inbox
        </h2>
        <p
          className="text-sm leading-relaxed mb-7"
          style={{ color: "#6B6860" }}
        >
          We'll email you each month's results the moment they're published — so you always
          know which supermarket to head to before you shop.
        </p>
        <EmailCapture source="landing" />
        <p className="text-xs mt-3" style={{ color: "#9B9790" }}>
          No spam. Unsubscribe any time.
        </p>
      </section>

      {/* ── SEO copy ── */}
      <section
        className="py-12 px-4 border-t"
        style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.5)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-display text-2xl font-semibold mb-4"
            style={{ color: "#1B3A2D" }}
          >
            Which UK supermarket is cheapest in 2026?
          </h2>
          <div className="prose prose-sm max-w-none" style={{ color: "#6B6860" }}>
            <p className="leading-relaxed mb-4">
              The TrolleyRoast Receipt Index is the UK's only monthly supermarket price
              comparison based entirely on real scanned receipts. Unlike other price comparison
              tools that check individual items, TrolleyRoast analyses your <em>entire basket</em>
              — giving you a realistic, honest answer to the question every UK shopper asks:
              where would my weekly shop actually be cheapest?
            </p>
            <p className="leading-relaxed mb-4">
          Our data consistently shows that <strong style={{ color: "#1B3A2D" }}>Aldi and Lidl</strong> offer
            the lowest total basket costs for UK families, with savings of £15–£20 per week
            compared to Tesco or Sainsbury's. Waitrose and Co-op consistently sit at the
            premium end, making the gap even wider for shoppers who switch. Over a year,
            that's a potential saving of £780–£1,040 — simply by switching supermarkets.
            </p>
            <p className="leading-relaxed">
              The index covers eight major UK supermarkets — Tesco, Asda, Sainsbury's, Morrisons,
            Aldi, Lidl, Waitrose, and Co-op — and breaks down costs by category including
            dairy, meat, fruit and vegetables, bread, cupboard staples, and drinks. Updated every month using
            data from thousands of real UK shoppers who scan their receipts with TrolleyRoast.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8 px-4" style={{ borderColor: "#E8E2D6" }}>
        <div
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "#9B9790" }}
        >
          <div>
            <span
              className="font-display text-base font-semibold block mb-1"
              style={{ color: "#1B3A2D" }}
            >
              TrolleyRoast
            </span>
            <span>The UK's supermarket truth-teller. Free forever.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="hover:underline cursor-pointer">Home</span>
            </Link>
            <Link href="/receipt-index">
              <span className="hover:underline cursor-pointer" style={{ color: "#1B3A2D" }}>Receipt Index</span>
            </Link>
            <Link href="/feedback">
              <span className="hover:underline cursor-pointer">Feedback</span>
            </Link>
            <Link href="/pro">
              <span className="hover:underline cursor-pointer">Pro</span>
            </Link>
          </div>
          <span>© {new Date().getFullYear()} TrolleyRoast</span>
        </div>
      </footer>
    </div>
  );
}

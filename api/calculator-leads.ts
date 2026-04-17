import type { VercelRequest, VercelResponse } from "@vercel/node";

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://oyqtywxocmqjtobkmoxj.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? "";

const STORE_LABELS: Record<string, string> = {
  aldi: "Aldi", lidl: "Lidl", asda: "Asda", tesco: "Tesco",
  morrisons: "Morrisons", sainsburys: "Sainsbury's", waitrose: "Waitrose", coop: "Co-op",
};

interface LeadPayload {
  householdSize: string;
  weeklySpend: number;
  currentStore: string;
  shoppingStyle: string;
  categories: string[];
}

interface SuggestedStore { store: string; label: string; estimatedWeeklySavings: number }
interface CategoryInsight { category: string; label: string; impact: string; note: string }

interface CalcResult {
  weeklySavings: number;
  monthlySavings: number;
  annualSavings: number;
  suggestedStores: SuggestedStore[];
  categoryInsights: CategoryInsight[];
  teaser: string;
}

// Re-run the calculation server-side so the email contains the real numbers
function computeResult(p: LeadPayload): CalcResult {
  const STORE_INDEX: Record<string, number> = {
    aldi: 0.79, lidl: 0.81, asda: 0.88, tesco: 0.93,
    morrisons: 0.95, sainsburys: 1, waitrose: 1.13, coop: 1.09,
  };
  const CATEGORY_WEIGHT: Record<string, number> = {
    "fresh-produce": 1.15, "meat-fish": 1.08, "dairy-eggs": 0.95,
    bakery: 0.82, freezer: 0.9, cupboard: 1.02, baby: 1.18,
    household: 1.12, toiletries: 1.1, "snacks-drinks": 0.84,
  };
  const CATEGORY_LABELS: Record<string, string> = {
    "fresh-produce": "Fresh produce", "meat-fish": "Meat & fish",
    "dairy-eggs": "Dairy & eggs", bakery: "Bakery", freezer: "Frozen food",
    cupboard: "Cupboard staples", baby: "Baby", household: "Household",
    toiletries: "Toiletries", "snacks-drinks": "Snacks & drinks",
  };
  const STYLE_FACTOR: Record<string, number> = {
    "value-first": 0.76, balanced: 1, "premium-leaning": 1.22, "convenience-led": 1.12,
  };
  const HOUSEHOLD_FACTOR: Record<string, number> = { "1": 0.88, "2": 0.98, "3-4": 1.06, "5+": 1.15 };
  const CATEGORY_NOTES: Record<string, string> = {
    "fresh-produce": "Produce pricing tends to widen sharply between premium and discounter baskets.",
    "meat-fish": "Protein lines are often where split or store switching has the biggest visible impact.",
    "dairy-eggs": "Dairy savings are steady rather than dramatic, but they compound every week.",
    bakery: "Bakery swaps usually matter most when branded treats dominate the basket.",
    freezer: "Frozen staples can produce reliable savings when bought in value-led stores.",
    cupboard: "Cupboard staples are one of the easiest places to keep quality while cutting spend.",
    baby: "Baby items often carry one of the biggest retailer premiums across the market.",
    household: "Cleaning and paper goods are frequently marked up in convenience-led baskets.",
    toiletries: "Toiletries are a strong margin category, so retailer choice matters more than most shoppers expect.",
    "snacks-drinks": "Snack-heavy baskets usually benefit most from selective swaps rather than all-out switching.",
  };

  const currentIndex = STORE_INDEX[p.currentStore] ?? 1;
  const alternatives = Object.entries(STORE_INDEX)
    .filter(([store]) => store !== p.currentStore)
    .map(([store, index]) => ({ store, label: STORE_LABELS[store] ?? store, deltaPct: Math.max(0, (currentIndex - index) / currentIndex) }))
    .sort((a, b) => b.deltaPct - a.deltaPct);

  const catWeights = p.categories.length
    ? p.categories.reduce((s, c) => s + (CATEGORY_WEIGHT[c] ?? 1), 0) / p.categories.length
    : 1;
  const styleFactor = STYLE_FACTOR[p.shoppingStyle] ?? 1;
  const householdFactor = HOUSEHOLD_FACTOR[p.householdSize] ?? 1;
  const bestGap = alternatives[0]?.deltaPct ?? 0;
  const realisticGap = bestGap > 0 ? Math.max(0.04, bestGap) : 0;
  const cappedRate = Math.min(0.3, realisticGap * 0.62 * catWeights * styleFactor * householdFactor);
  const round = (n: number) => Math.max(0, Math.round(n * 100) / 100);
  const weekly = round(p.weeklySpend * cappedRate);
  const monthly = round((weekly * 52) / 12);
  const annual = round(weekly * 52);

  const suggestedStores = alternatives.slice(0, 3).map(({ store, label, deltaPct }, i) => ({
    store, label,
    estimatedWeeklySavings: round(p.weeklySpend * Math.min(0.28, deltaPct * ([0.62, 0.48, 0.36][i]) * catWeights * styleFactor)),
  }));

  const categoryInsights = p.categories.slice(0, 4).map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    impact: (CATEGORY_WEIGHT[cat] ?? 1) >= 1.05 ? "high" : "medium",
    note: CATEGORY_NOTES[cat] ?? "",
  }));

  return { weeklySavings: weekly, monthlySavings: monthly, annualSavings: annual, suggestedStores, categoryInsights, teaser: suggestedStores[0]?.label ?? "Aldi" };
}

function buildEmailHtml(email: string, payload: LeadPayload, r: CalcResult): string {
  const storeLabel = STORE_LABELS[payload.currentStore] ?? payload.currentStore;
  const topStore = r.suggestedStores[0]?.label ?? "Aldi";

  const storeRows = r.suggestedStores.map(s =>
    `<tr>
      <td style="padding:10px 16px;font-size:14px;font-weight:600;color:#1C1A17;">${s.label}</td>
      <td style="padding:10px 16px;font-size:18px;font-weight:700;color:#1B3A2D;text-align:right;">£${s.estimatedWeeklySavings.toFixed(2)}<span style="font-size:11px;font-weight:400;color:#7A7570;">/wk</span></td>
    </tr>`
  ).join("");

  const insightRows = r.categoryInsights.map(i =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #F0EBE2;">
        <span style="font-size:13px;font-weight:600;color:#1C1A17;">${i.label}</span>
        <span style="margin-left:8px;background:#1B3A2D14;color:#1B3A2D;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:2px 8px;border-radius:99px;">${i.impact}</span>
        <p style="margin:4px 0 0;font-size:13px;color:#6B6860;line-height:1.6;">${i.note}</p>
      </td>
    </tr>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your TrolleyRoast savings estimate</title></head>
<body style="margin:0;padding:0;background:#F5F2EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2EA;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

      <!-- Header -->
      <tr><td style="padding:0 0 24px;">
        <p style="margin:0;font-size:22px;font-weight:700;color:#1B3A2D;letter-spacing:-0.02em;">TrolleyRoast</p>
        <p style="margin:4px 0 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Weekly Basket Savings Estimate</p>
      </td></tr>

      <!-- Intro -->
      <tr><td style="background:#fff;border-radius:20px;padding:28px 28px 20px;border:1px solid #E8E3D9;margin-bottom:16px;">
        <p style="margin:0 0 12px;font-size:15px;color:#4F4A43;line-height:1.7;">
          Based on your <strong>${storeLabel}</strong> basket of <strong>£${payload.weeklySpend.toFixed(2)}/week</strong>, here's your personalised switching estimate.
        </p>
        <p style="margin:0;font-size:13px;color:#7A7570;line-height:1.6;">
          These are directional estimates based on store price indices, not live shelf prices. Scan a real receipt in the app for a basket-level answer.
        </p>
      </td></tr>

      <tr><td style="height:12px;"></td></tr>

      <!-- Savings trio -->
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="33%" style="background:#fff;border-radius:16px;padding:18px 16px;border:1px solid #E8E3D9;text-align:center;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Weekly</p>
              <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#1B3A2D;">£${r.weeklySavings.toFixed(2)}</p>
            </td>
            <td width="4%" style=""></td>
            <td width="33%" style="background:#1B3A2D;border-radius:16px;padding:18px 16px;text-align:center;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Monthly</p>
              <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#fff;">£${r.monthlySavings.toFixed(2)}</p>
            </td>
            <td width="4%" style=""></td>
            <td width="33%" style="background:#fff;border-radius:16px;padding:18px 16px;border:1px solid #E8E3D9;text-align:center;">
              <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Annual</p>
              <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#1B3A2D;">£${r.annualSavings.toFixed(2)}</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="height:12px;"></td></tr>

      <!-- Store suggestions -->
      <tr><td style="background:#fff;border-radius:20px;border:1px solid #E8E3D9;overflow:hidden;">
        <p style="margin:0;padding:20px 20px 4px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Store switching gap vs ${storeLabel}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 4px 8px;">${storeRows}</table>
      </td></tr>

      <tr><td style="height:12px;"></td></tr>

      <!-- Category insights -->
      ${r.categoryInsights.length > 0 ? `
      <tr><td style="background:#fff;border-radius:20px;border:1px solid #E8E3D9;padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;">Category insights</p>
        <table width="100%" cellpadding="0" cellspacing="0">${insightRows}</table>
      </td></tr>
      <tr><td style="height:12px;"></td></tr>` : ""}

      <!-- CTA -->
      <tr><td style="background:#1B3A2D;border-radius:20px;padding:28px 24px;text-align:center;">
        <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#fff;">Get the exact answer</p>
        <p style="margin:0 0 20px;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">
          Scan a real receipt in the TrolleyRoast app and see exactly where you save item by item.
        </p>
        <a href="https://trolleyroast.app" style="display:inline-block;background:#C9A96E;color:#1B3A2D;font-weight:700;font-size:14px;padding:12px 28px;border-radius:99px;text-decoration:none;">Open TrolleyRoast App</a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 4px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#9B9790;">
          TrolleyRoast · trolleyroast.co.uk<br>
          <a href="https://trolleyroast.co.uk" style="color:#9B9790;">Unsubscribe</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

async function saveToSupabase(email: string, calculator: string, payload: LeadPayload, result: CalcResult): Promise<void> {
  if (!SUPABASE_SERVICE_KEY) return;
  await fetch(`${SUPABASE_URL}/rest/v1/calculator_leads`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({
      email,
      calculator,
      household_size: payload.householdSize,
      weekly_spend: payload.weeklySpend,
      current_store: payload.currentStore,
      shopping_style: payload.shoppingStyle,
      categories: payload.categories,
      weekly_saving: result.weeklySavings,
      monthly_saving: result.monthlySavings,
      annual_saving: result.annualSavings,
      top_suggested_store: result.suggestedStores[0]?.store ?? null,
    }),
  });
}

async function sendBrevoEmail(toEmail: string, payload: LeadPayload, result: CalcResult): Promise<void> {
  if (!BREVO_API_KEY) return;
  const storeLabel = STORE_LABELS[payload.currentStore] ?? payload.currentStore;
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "TrolleyRoast", email: "hello@trolleyroast.co.uk" },
      to: [{ email: toEmail }],
      subject: `Your TrolleyRoast savings estimate — £${result.weeklySavings.toFixed(2)}/week vs ${storeLabel}`,
      htmlContent: buildEmailHtml(toEmail, payload, result),
    }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { calculator, email, payload } = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) ?? {};

  if (!email || !payload) {
    return res.status(400).json({ error: "email and payload are required" });
  }

  const result = computeResult(payload as LeadPayload);

  await Promise.allSettled([
    saveToSupabase(email, calculator ?? "unknown", payload as LeadPayload, result),
    sendBrevoEmail(email, payload as LeadPayload, result),
  ]);

  return res.status(200).json({
    ok: true,
    weeklySavings: result.weeklySavings,
    annualSavings: result.annualSavings,
    topStore: result.suggestedStores[0]?.label ?? null,
  });
}

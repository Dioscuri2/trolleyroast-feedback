# TrolleyRoast — Website Handover Document

**Prepared for:** Lovable (app development team)
**Date:** March 2026
**Purpose:** Full context on the companion website built alongside the TrolleyRoast PWA, so the app can be developed in alignment with the web presence.

---

## 1. Overview

A standalone companion website has been built and deployed alongside the TrolleyRoast PWA. It serves three distinct purposes:

1. **Marketing** — a public-facing landing page to convert TikTok/social traffic into app users and email subscribers.
2. **Feedback collection** — a dedicated form that sends user feedback directly to a Supabase database.
3. **SEO content** — a Monthly Receipt Index page that targets high-intent grocery comparison keywords and builds organic search authority over time.

The website lives at a separate domain from the app (`trolley-roast.lovable.app`). All CTAs on the website point back to the app.

---

## 2. Site Structure & Routes

| Route | Purpose | Key Actions |
| :--- | :--- | :--- |
| `/` | Marketing landing page | → App CTA, email signup, feedback link |
| `/feedback` | User feedback form | → POSTs to Supabase |
| `/pro` | Pro waitlist page | → Email signup |
| `/receipt-index` | Monthly Receipt Index | → SEO content, email signup |

---

## 3. Design System

The website uses the same visual identity as the app. These exact values should be used in the app for any shared UI elements (e.g. savings cards, share screens).

| Token | Value | Usage |
| :--- | :--- | :--- |
| Background | `#FAF8F3` | Page backgrounds, card fills |
| Primary | `#1B3A2D` | Headers, CTAs, nav, dark sections |
| Gold / Accent | `#C9A96E` | Labels, highlights, star ratings, cheapest indicators |
| Body text | `#1C1A17` | Primary readable text |
| Muted text | `#6B6860` | Secondary copy, descriptions |
| Subtle text | `#9B9790` | Labels, timestamps, metadata |
| Border | `#E8E2D6` | Card borders, dividers |
| Heading font | Cormorant Garamond (serif) | All `<h1>`–`<h3>` display text |
| Body font | Outfit (sans-serif) | All body copy, labels, buttons |

**Light mode only.** No dark mode, no black (`#000`), no red.

---

## 4. Feedback Form — Supabase Integration

### What it does
The `/feedback` page collects star ratings (1–5), an optional name, optional email, and a free-text comment. On submission it POSTs directly to a Supabase Edge Function.

### Endpoint
```
POST https://czmvyblgviwgczfzxhsr.supabase.co/functions/v1/submit-feedback
```

### Request format
```json
{
  "rating": 4,
  "feedback_text": "Really useful app, love the savings card.",
  "name": "Sarah",
  "email": "sarah@example.com"
}
```

### Notes
- **No API key required.** The endpoint is fully public with open CORS.
- `name` and `email` are optional — the form accepts anonymous submissions.
- `feedback_text` maps to the comment field in the form.
- On `200` response: show the thank-you confirmation screen.
- On any error: show a gentle "please check your connection and try again" message.

### Recommendation for the app
If TrolleyRoast ever adds an in-app feedback prompt (e.g. after a scan), it should use this **same endpoint and payload format** so all feedback lands in the same Supabase table and can be reviewed in one place.

---

## 5. Email Capture

### What it does
Two locations capture email addresses: the landing page (`/`) and the Pro waitlist page (`/pro`). Emails are stored in the website's own database with a `source` field (`"landing"` or `"pro"`).

### Current state
Emails are stored in the Manus-hosted database. The next step (not yet implemented) is to forward them to a Brevo mailing list via the Brevo API inside the `email.capture` tRPC procedure on the server.

### Recommendation for the app
If the app ever adds an email capture (e.g. "Save your results" prompt after a scan), use the same Brevo list so the audience is unified. The source field can be extended to `"app"` to distinguish app signups from web signups.

---

## 6. Monthly Receipt Index

### What it does
The `/receipt-index` page publishes a monthly report showing which supermarket is cheapest for a full basket shop, based on real scanned receipts. It is the primary SEO asset for the site.

### Data structure
Each monthly entry contains:

```typescript
{
  monthLabel: string;        // e.g. "March 2026"
  year: number;
  month: number;             // 1–12
  winner: string;            // e.g. "Aldi"
  basketTotals: {            // Average total basket cost per supermarket
    Tesco: number;
    Asda: number;
    Sainsburys: number;
    Morrisons: number;
    Aldi: number;
    Lidl: number;
  };
  categoryBreakdown: Array<{ // Per-category price breakdown
    category: string;        // e.g. "Dairy & Eggs"
    Tesco: number;
    Asda: number;
    Sainsburys: number;
    Morrisons: number;
    Aldi: number;
    Lidl: number;
  }>;
  receiptCount: number;      // Number of real receipts used
  summary: string;           // Editorial paragraph for SEO
}
```

### Current data
Three months of seeded data are live: January, February, and March 2026. All show Aldi as the cheapest supermarket, with savings of £15–£17 vs. Tesco and £28–£29 vs. Waitrose. All 8 supermarkets are included in the data.

### How to update monthly
New entries are inserted directly into the `receipt_index` database table. An admin UI for this is planned but not yet built — currently requires a direct SQL insert or the Database panel in the Manus management UI.

### Recommendation for the app
The app is the primary data source for this index. Once real scan data is available at volume, the monthly figures should be derived from actual aggregated scan results rather than manually entered estimates. The data structure above is already designed to accept real figures — the `receiptCount` field tracks how many receipts contributed to each month's data.

---

## 7. Social Sharing — Savings Card

### What the website shows
The landing page features a static mockup of the savings card with placeholder data:
- "You overpaid by £14.30 vs. shopping at Aldi this week"
- Horizontal bar chart comparing all 8 supermarkets sorted cheapest to most expensive — e.g. Aldi (£54.10), Lidl (£56.20), Asda (£61.80), Tesco (£68.40), Co-op (£74.20), Waitrose (£82.10)
- Footer: "21 items compared · trolleyroast.app"

### What the app should produce
The app's real savings card (generated after each scan) should match this visual format exactly so the website mockup accurately represents what users will see. Key elements:

- **Headline stat:** "You overpaid by £X.XX vs. [cheapest supermarket] this week" — use loss-framing (overpaid, not saved) as it converts better for sharing.
- **Bar chart:** All 6 supermarkets sorted cheapest to most expensive, with the winner highlighted in gold (`#C9A96E`).
- **Footer:** Item count + branding.
- **Share targets:** WhatsApp, Instagram Stories, TikTok — these are explicitly called out on the landing page as the primary sharing channels.

### The Receipt Challenge
The landing page promotes a "Receipt Challenge" — scan your receipt on camera, reveal the savings, share it. This is positioned as a TikTok/Instagram trend. The app's share flow should make it trivially easy to export the savings card as an image suitable for Stories (1080×1920 portrait) and as a square card for WhatsApp/feed posts.

---

## 8. Messaging & Positioning

The following copy has been tested and used consistently across the website. The app's onboarding, empty states, and share screens should use the same language.

### Core value proposition
> "Scan your receipt. See where you'd save. Every week."

### Tagline
> "The UK's supermarket truth-teller."

### Hero subtext
> "TrolleyRoast compares your entire basket across Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl, Waitrose and Co-op — instantly. No item-by-item searching. Just the truth."

### Loss-framing stat (hero)
> "The average UK shopper overpays £1,000+ a year by not comparing supermarkets. Your receipt has the answer."

### Key differentiators (used in "Why TrolleyRoast wins" section)
1. **Whole basket, not single items** — other tools make you search product by product; TrolleyRoast analyses the entire shop in one scan.
2. **Cuts through supermarket tricks** — multi-buy deals and confusing pack sizes obscure the real cost; we compare what you actually paid.
3. **No login for your first scan** — see savings before committing to anything.
4. **Built to go viral** — every scan generates a shareable card.

### Trust signals used on site
- "Free · No sign-up needed · UK supermarkets" (hero badge)
- "Trusted by [X] shoppers this week" (dynamic count)
- "No login for first scan" (social proof row)
- "Free forever" (social proof row)
- "🇬🇧 UK supermarkets only" (social proof row)

---

## 9. Pro Tier — Waitlist

A `/pro` waitlist page is live. The Pro tier is described as:

> "SMS alerts when your regular items drop in price. Personalised basket tracking across weeks. A monthly Receipt Index showing which supermarket is genuinely cheapest for real-world baskets."

Emails captured on `/pro` are tagged with `source: "pro"` in the database to distinguish them from general landing page signups. When the Pro tier is built in the app, this waitlist should be the first audience to be notified.

---

## 10. Traffic Strategy Summary

Based on competitive analysis of trolley.co.uk (2.15M monthly visits, 70% organic search), the website is built around three acquisition channels:

| Channel | Strategy | Implementation |
| :--- | :--- | :--- |
| **Organic Search** | Long-tail "cheapest supermarket" keywords | Receipt Index page, SEO copy blocks, programmatic content planned |
| **Social / TikTok** | Receipt Challenge trend, shareable savings cards | Receipt Challenge section on landing page, explicit share CTAs |
| **Direct / Referral** | Community sharing (r/UKFrugal, MoneySavingExpert) | Community callout section, email list for repeat visits |

The app is the engine for all three channels — every scan is a potential share, every share is a potential new user.

---

## 11. What Is Not Yet Built (Planned)

The following items are planned but not yet implemented. They are listed here so Lovable can account for them in the app's roadmap:

- **Brevo API integration** — email signups should forward to a Brevo mailing list automatically.
- **Admin dashboard** — a protected `/admin` route for reviewing feedback and email captures without touching the database directly.
- **Dynamic social proof** — replace the static £1,000 overpaid stat with a live average derived from real scan data.
- **Real Receipt Index data** — replace seeded estimates with aggregated figures from actual app scans.
- **Open Graph meta tags** — per-page dynamic OG titles and descriptions for better social sharing previews.
- **Trend chart** — a line chart on the Receipt Index showing how each supermarket's basket cost has moved over time.

---

## 12. Links

| Resource | URL |
| :--- | :--- |
| App (PWA) | https://trolley-roast.lovable.app |
| Website (pre-publish) | https://trolleyfb-5zzsskez.manus.space |
| Feedback endpoint | https://czmvyblgviwgczfzxhsr.supabase.co/functions/v1/submit-feedback |
| Supabase project | https://czmvyblgviwgczfzxhsr.supabase.co |

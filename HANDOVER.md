# TrolleyRoast Website Handover

**Prepared for:** future maintainers of the public website
**Date:** April 2026
**Purpose:** clarify what this repository owns, how the public website is structured, and how it should relate to the separate TrolleyRoast product app.

---

## 1. What this repo is

This repository is the **public marketing / acquisition website** for **trolleyroast.co.uk**.

It is responsible for:
- public landing-page messaging
- SEO / organic acquisition pages
- public feedback collection
- email capture / waitlist collection
- presenting the TrolleyRoast brand to new visitors

It is **not** the product app.

---

## 2. Website vs app boundary

Keep this separation explicit:

### Website (`trolleyroast.co.uk`)
- top-of-funnel traffic
- conversion into app usage
- trust building and brand positioning
- SEO content like the Receipt Index
- public forms (feedback, waitlist, email capture)

### Product app (`trolleyroast.app` and related app deployments)
- receipt scanning workflow
- savings calculation product experience
- logged-in or repeat-user product flows
- product-side dashboards and core application logic

The website can link into the app heavily, but it should not become a disguised copy of the app.

---

## 3. Public routes

| Route | Purpose |
| :--- | :--- |
| `/` | Main marketing landing page |
| `/feedback` | Public feedback form |
| `/pro` | Pro waitlist page |
| `/receipt-index` | Monthly Receipt Index / SEO page |

---

## 4. Current stack

- **Frontend:** Vite + React + TypeScript + Tailwind
- **Backend:** Express + tRPC
- **Data:** Drizzle + Postgres
- **Hosting:** Vercel

Vercel rewrites `/api/*` requests to the server entrypoint and rewrites all public routes to the SPA shell.

---

## 5. Current content model

### Landing page
Purpose:
- convert cold traffic from TikTok, social, referrals, and organic search
- explain the core offer quickly
- push users into trying the app
- capture emails from people not ready yet

### Feedback page
Purpose:
- collect qualitative input from users and visitors
- currently posts directly to the Supabase endpoint used for feedback capture

### Pro page
Purpose:
- capture interest for higher-value retention / monetisation features

### Receipt Index
Purpose:
- act as the main SEO asset
- support “which supermarket is cheapest?” search intent
- build credibility using monthly basket comparisons

---

## 6. Known legacy baggage

This repo still contains signs of an older phase where it was framed more narrowly as a feedback site:
- old repo/package naming around `feedback`
- generated Manus/Lovable scaffold
- unused pages/components from earlier generated outputs

That does **not** change the current intended role:

> This repo should be treated as the public Vercel-hosted website for `trolleyroast.co.uk`.

---

## 7. Recommended maintenance rules

1. Keep website concerns separate from app concerns.
2. Prefer low-risk clarity improvements over broad rewrites.
3. Do not add app-dashboard complexity into this repo unless there is a deliberate architecture change.
4. Keep public metadata, sitemap, CTAs, and SEO hygiene maintained.
5. If deleting generated scaffold, do it in small verified steps with a successful build after each pass.

---

## 8. Immediate next steps

- audit and remove unused components/pages safely
- clean remaining legacy `feedback` framing where misleading
- standardise supermarket count/copy across pages
- improve per-page metadata / OG coverage
- add better analytics around CTA clicks and email captures

---

## 9. Build / check

```bash
npm run check
npm run build
```

If both pass after cleanup, changes are likely safe.

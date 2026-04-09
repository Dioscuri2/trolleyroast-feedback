# TrolleyRoast Website Audit

_Date:_ 2026-04-09
_Repo:_ `trolleyroast-frontend-repo`
_Origin:_ `https://github.com/Dioscuri2/trolleyroast-feedback.git`

## Scope

This audit is **only** for the public marketing / acquisition website for **trolleyroast.co.uk**.

Important boundary:
- **Website:** `trolleyroast.co.uk` → public marketing pages, SEO pages, feedback capture, waitlist capture.
- **App / product:** `trolleyroast.app` and related product builds → receipt scanning product experience.
- These should stay **separate products with separate responsibilities**.

## Current structure

### Frontend
- `src/App.tsx` — route registration for the public site.
- `src/pages/LandingPage.tsx` — main homepage for traffic and conversion.
- `src/pages/FeedbackPage.tsx` — feedback capture page.
- `src/pages/ProPage.tsx` — Pro waitlist page.
- `src/pages/ReceiptIndexPage.tsx` — SEO / monthly receipt index page.
- `src/components/EmailCapture.tsx` — reusable email capture form.
- `src/components/ui/*` — broad UI kit scaffold.

### Backend
- `server/_core/index.ts` — Express + tRPC entrypoint.
- `server/routers.ts` — tRPC routes for auth, email capture, feedback, receipt index.
- `server/db.ts` — Drizzle/Postgres data access.
- `drizzle/schema.ts` — DB schema for users, feedback, email captures, receipt index.

### Static / deployment
- `index.html` — document shell + current metadata.
- `public/robots.txt` — robots config.
- `public/sitemap.xml` — sitemap (currently incomplete).
- `vercel.json` — Vercel rewrites.
- `.vercel/project.json` — linked Vercel project metadata.

## Routes currently in use

- `/` — public landing page
- `/feedback` — website feedback form
- `/pro` — Pro waitlist page
- `/receipt-index` — monthly receipt index / SEO page
- `/404` — not found

## Deployment setup

The repo is a **Vite + React frontend** with a small **Express/tRPC backend**.

Observed setup:
- `npm run build` uses `vite build`
- Vercel config rewrites `/api/*` to `server/_core/index.ts`
- all other routes rewrite to `/index.html`
- `.vercel/project.json` is linked to project `trolleyroast-frontend-repo`

## Website vs app boundary

### Belongs in this website repo
- landing page messaging and CTAs
- SEO content and receipt index pages
- public feedback capture
- email capture / waitlist capture
- public brand presentation for trolleyroast.co.uk

### Does **not** belong in this website repo
- core receipt-scanning product flows
- logged-in app workflows
- app dashboard / internal product UI
- product-side logic that should live in `trolleyroast.app`

Current site copy already links out to the app in multiple places. That is fine. The website should act as the **top-of-funnel and trust layer**, not the app itself.

## What I found

### 1) Legacy naming still points to an older “feedback site” framing
Examples:
- package name: `trolleyroast-feedback`
- repo origin: `trolleyroast-feedback.git`
- `todo.md` is still titled **TrolleyRoast Feedback**
- `HANDOVER.md` still describes the website as a companion site for app development / Lovable handoff

This is the biggest clarity problem. The repo has moved beyond a feedback microsite. It is now the broader **marketing / acquisition website**.

### 2) Website/app boundary is conceptually muddy in docs
- `HANDOVER.md` is written for app team alignment, not for ownership of the website itself.
- Some CTAs and docs still imply the website is secondary to the app rather than the canonical public site for `trolleyroast.co.uk`.

### 3) There is a lot of generated scaffold and probable dead code
Likely legacy / unused for current website scope:
- `src/pages/Home.tsx` — appears to be an older feedback-first landing page, not routed.
- `src/pages/ComponentShowcase.tsx` — not routed.
- `src/components/AIChatBox.tsx` — only referenced by `ComponentShowcase.tsx`.
- `src/components/DashboardLayout.tsx`
- `src/components/DashboardLayoutSkeleton.tsx`
- `src/components/ManusDialog.tsx`
- `src/components/Map.tsx`
- large `src/components/ui/*` kit beyond what this website currently uses.
- `public/__manus__/*` and `.manus/*` generated artifacts.
- server `_core` files related to broader generated platform capabilities rather than the public site.

I did **not** delete these in this pass because that would be a riskier refactor and could break hidden dependencies.

### 4) Data/model mismatch in messaging
The homepage talks mostly about 6 supermarkets in some places, while other content references 8 supermarkets.
This inconsistency should be resolved in the next pass.

### 5) Sitemap is incomplete
`public/sitemap.xml` currently includes:
- `/`
- `/pro`
- `/feedback`

But it is missing:
- `/receipt-index`

That is a low-risk SEO fix and was corrected in this pass.

## Safe cleanup completed

### Documentation / clarity
- Added this `AUDIT.md` file.
- Rewrote `HANDOVER.md` so it is explicitly framed as a **website handover / architecture note** for the trolleyroast.co.uk marketing site.
- Updated `todo.md` title and framing away from “feedback-only” toward website ownership.
- Added repo-level README clarifying this repo’s purpose and the boundary between website and app.

### Low-risk code / metadata hygiene
- Added an explicit route boundary comment in `src/App.tsx` clarifying that these routes are for the public website only.
- Updated the sitemap to include `/receipt-index`.
- Updated `package.json` package name/description metadata to reflect website purpose without changing runtime behavior.

## What I did **not** change

To avoid breaking the build, I did **not** in this pass:
- rename database tables like `feedback`
- rename tRPC procedures
- delete generated platform files
- remove unused components wholesale
- refactor Vercel/server architecture
- change public route paths
- replace app links or merge website/app logic

## Immediate next build steps

### Priority 1 — structure + clarity
1. Create a clear folder split for public-site concerns:
   - `src/pages/marketing/*`
   - `src/pages/seo/*`
   - `src/pages/forms/*`
   - or another lightweight public-site structure
2. Move legacy, unused, or generated components into a `legacy/` or `archive/` folder before deletion.
3. Remove `Home.tsx` if confirmed unused.
4. Remove `ComponentShowcase.tsx` and associated experimental components if confirmed unused.

### Priority 2 — website/app separation
5. Replace remaining `trolley-roast.lovable.app` references with the correct live app destination if the product URL has changed.
6. Keep all public-site language referring to `trolleyroast.co.uk` as the website and `trolleyroast.app` as the product app.
7. Add a small architecture note for future contributors: “website repo only; product app separate.”

### Priority 3 — SEO and conversion hygiene
8. Add per-route metadata / OG tags for:
   - homepage
   - feedback page
   - Pro page
   - receipt index
9. Expand sitemap generation to include all public routes automatically.
10. Add analytics / event tracking for primary CTAs and email capture.

### Priority 4 — technical debt reduction
11. Audit and trim unused UI kit files.
12. Audit `server/_core/*` and remove non-website platform scaffolding once confirmed safe.
13. Decide whether this site really needs the current tRPC/Express layer or whether a slimmer Vercel-native setup would be cleaner long term.

## Lightweight checks

Recommended checks after edits:
- `npm run check`
- `npm run build`

If both pass, the cleanup is safe to keep.

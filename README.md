# TrolleyRoast Website

Public marketing / acquisition website for **trolleyroast.co.uk**.

## Scope

This repo is for the public website only:
- homepage / landing page
- feedback page
- Pro waitlist page
- receipt index / SEO content
- website-side email capture and public forms

## Important boundary

This repo is **not** the main product app.

- **Website:** `trolleyroast.co.uk`
- **Product app:** `trolleyroast.app` (or current app deployment)

The website should drive traffic, trust, SEO, and conversion into the app.
The app should own receipt scanning, product workflows, and logged-in user experiences.

Do **not** merge the website and app conceptually unless there is an explicit architectural decision to do so.

## Stack

- Vite
- React
- TypeScript
- Tailwind
- Express + tRPC
- Drizzle / Postgres
- Vercel deployment

## Main public routes

- `/` — landing page
- `/feedback` — feedback form
- `/pro` — Pro waitlist
- `/receipt-index` — monthly receipt index / SEO page
- `/supermarkets` — SEO scaffold for supermarket pages
- `/categories` — SEO scaffold for category pages
- `/blog/guides` — SEO scaffold for editorial guides

## Commands

```bash
npm run dev
npm run check
npm run build
```

## Notes

This repo still contains some legacy internal naming from an earlier feedback-first phase, but the public site is now structured as a broader marketing / acquisition website. See `AUDIT.md` for cleanup notes and next steps.

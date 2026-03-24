# TrolleyRoast Feedback — Project TODO

- [x] Update drizzle schema with feedback table (rating, name, email, comment, createdAt)
- [x] Generate and apply DB migration SQL
- [x] Add submitFeedback tRPC procedure (public, stores to DB)
- [x] Add getFeedbackCount tRPC procedure (for admin view later)
- [x] Style global CSS with TrolleyRoast brand tokens (forest green, cream, serif font)
- [x] Build feedback landing page (Home.tsx) with star rating, name, email, comment fields
- [x] Implement thank-you confirmation state after successful submission
- [x] Notify owner on new feedback submission
- [x] Mobile-responsive design optimized for PWA users
- [x] Write vitest tests for feedback router

## Landing Page Build

- [x] Update design system: #FAF8F3 bg, #1B3A2D primary, #C9A96E gold, #1C1A17 text, Outfit body font
- [x] Add /pro waitlist route and page (placeholder)
- [x] Add emailCapture tRPC procedure (public, stores email + createdAt)
- [x] Create email_captures DB table and migration
- [x] Build Hero section: app name, value prop, CTA button
- [x] Build How It Works: 3 steps with icons
- [x] Build Supermarket logos strip (Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl)
- [x] Build Savings card mockup visual
- [x] Build Email capture section with Brevo-ready form
- [x] Build Pro teaser section with /pro waitlist link
- [x] Build Social proof row with dynamic submission count
- [x] Wire landing page route (separate from /feedback form)
- [x] Write vitest tests for emailCapture procedure

## Supabase Integration

- [x] Update FeedbackPage to POST directly to Supabase endpoint (no tRPC)
- [x] Remove tRPC feedback.submit dependency from frontend
- [x] Keep owner notification on server side (optional, low priority)
- [x] Verify test submission lands in Supabase

## Research-Driven Landing Page Improvements (Trolley.co.uk Playbook)

- [x] Hero: sharpen value prop to "Supermarket Truth-Teller" framing + cost-of-living angle
- [x] Hero badge: add "No sign-up needed" + mobile-first signal
- [x] Add "You could have saved £X" loss-framing stat to hero subtext
- [x] Add Receipt Challenge / TikTok social section with influencer channel callouts
- [x] Add "Why TrolleyRoast wins vs. item-by-item search" differentiator section
- [x] Strengthen savings card copy: "Share on WhatsApp, Instagram, TikTok" explicit CTA
- [x] Add community/referral nudge: r/UKFrugal, MoneySavingExpert framing
- [x] Update social proof row: add "No login for first scan" trust signal
- [x] Add SEO-friendly static text block: basket comparison keywords
- [x] Footer: add brief mission statement ("Built to cut through supermarket noise")

## Monthly Receipt Index Page

- [x] Add receipt_index DB table (month, year, winner, basket categories with prices per supermarket)
- [x] Generate and apply DB migration SQL
- [x] Seed 3 months of realistic index data (Jan, Feb, Mar 2026)
- [x] Add index.list and index.latest tRPC procedures
- [x] Build /receipt-index page with monthly rankings, bar charts, category breakdown, SEO copy
- [x] Add /receipt-index route to App.tsx
- [x] Add Receipt Index link to LandingPage nav and footer
- [x] Write vitest tests for index procedures

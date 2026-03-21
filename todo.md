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

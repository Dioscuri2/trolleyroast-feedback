import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import {
  Camera,
  BarChart3,
  Zap,
  ArrowRight,
  Star,
  Users,
  Share2,
  TrendingDown,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

// ─── Supermarket data ─────────────────────────────────────────────────────────
const SUPERMARKETS = [
  { name: "Tesco", color: "#00539F", letter: "T" },
  { name: "Asda", color: "#78BE20", letter: "A" },
  { name: "Sainsbury's", color: "#F06C00", letter: "S" },
  { name: "Morrisons", color: "#FDB913", letter: "M" },
  { name: "Aldi", color: "#003882", letter: "A" },
  { name: "Lidl", color: "#0050AA", letter: "L" },
  { name: "Waitrose", color: "#007B40", letter: "W" },
  { name: "Co-op", color: "#00B1A9", letter: "C" },
];

// ─── How It Works steps ───────────────────────────────────────────────────────
const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Scan your receipt",
    desc: "Take a photo of any UK supermarket receipt. No account needed — just scan and go.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "We compare your whole basket",
    desc: "Every item is priced across Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl, Waitrose & Co-op simultaneously.",
  },
  {
    icon: Zap,
    step: "03",
    title: "See your savings instantly",
    desc: "Get a shareable savings card showing exactly where you'd save — and how much.",
  },
];

// ─── Differentiators vs item-by-item search ───────────────────────────────────
const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: "Whole basket, not single items",
    desc: "Other tools make you search product by product. TrolleyRoast analyses your entire shop in one scan — the only honest comparison.",
  },
  {
    icon: TrendingDown,
    title: "Cuts through supermarket tricks",
    desc: "Multi-buy deals and confusing pack sizes obscure the real cost. We compare what you actually paid against what you'd actually pay elsewhere.",
  },
  {
    icon: Smartphone,
    title: "No login for your first scan",
    desc: "See your savings before you commit to anything. No email, no account, no friction — just the truth about your weekly shop.",
  },
  {
    icon: Share2,
    title: "Built to go viral",
    desc: "Every scan generates a shareable card. Post it to WhatsApp, TikTok, or Instagram Stories and turn your shop into a conversation.",
  },
];

// ─── Savings Card Mockup ──────────────────────────────────────────────────────
function SavingsCardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Shadow card behind */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl"
        style={{ background: "#1B3A2D", opacity: 0.12 }}
      />
      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: "#1B3A2D" }}
        >
          <span
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: "#FAF8F3" }}
          >
            TrolleyRoast
          </span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "rgba(201,169,110,0.25)", color: "#C9A96E" }}
          >
            Your Savings
          </span>
        </div>

        {/* Savings headline */}
        <div className="px-5 pt-5 pb-3 text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-1"
            style={{ color: "#C9A96E" }}
          >
            You overpaid by
          </p>
          <p
            className="font-display text-6xl font-bold leading-none"
            style={{ color: "#1B3A2D" }}
          >
            £14.30
          </p>
          <p className="text-sm mt-1" style={{ color: "#6B6860" }}>
            vs. shopping at Aldi this week
          </p>
        </div>

        {/* Comparison bars */}
        <div className="px-5 pb-5 space-y-2.5">
          {[
            { store: "Your shop (Tesco)", amount: 68.40, pct: 100, highlight: false },
            { store: "Aldi", amount: 54.10, pct: 79, highlight: true },
            { store: "Lidl", amount: 56.20, pct: 82, highlight: false },
            { store: "Asda", amount: 61.80, pct: 90, highlight: false },
          ].map((row) => (
            <div key={row.store}>
              <div className="flex justify-between items-center mb-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: row.highlight ? "#1B3A2D" : "#6B6860" }}
                >
                  {row.store}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: row.highlight ? "#1B3A2D" : "#6B6860" }}
                >
                  £{row.amount.toFixed(2)}
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "#EDE8DF" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${row.pct}%`,
                    background: row.highlight ? "#C9A96E" : "#D4CFC6",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Card footer */}
        <div
          className="px-5 py-3 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid #E8E2D6", color: "#9B9790" }}
        >
          <span>trolleyroast.app</span>
          <span>21 items compared</span>
        </div>
      </div>
    </div>
  );
}

// ─── Social Proof Row ─────────────────────────────────────────────────────────
function SocialProof() {
  const { data: count } = trpc.social.shopperCount.useQuery();

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm"
      style={{ color: "#6B6860" }}
    >
      <div className="flex items-center gap-2">
        <Users size={16} style={{ color: "#C9A96E" }} />
        <span>
          Trusted by{" "}
          <strong style={{ color: "#1C1A17" }}>
            {count !== undefined ? count.toLocaleString() : "—"}
          </strong>{" "}
          shoppers this week
        </span>
      </div>
      <div className="hidden sm:block w-px h-4" style={{ background: "#D4CFC6" }} />
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} className="fill-[#C9A96E] text-[#C9A96E]" />
        ))}
        <span className="ml-1">Free forever</span>
      </div>
      <div className="hidden sm:block w-px h-4" style={{ background: "#D4CFC6" }} />
      <div className="flex items-center gap-1.5">
        <ShieldCheck size={14} style={{ color: "#C9A96E" }} />
        <span>No login for first scan</span>
      </div>
    </div>
  );
}

// ─── Receipt Challenge Section ────────────────────────────────────────────────
function ReceiptChallenge() {
  return (
    <section
      className="py-16 px-4"
      style={{ background: "#FFFFFF", borderTop: "1px solid #E8E2D6", borderBottom: "1px solid #E8E2D6" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: "#C9A96E" }}
          >
            The Receipt Challenge
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-3"
            style={{ color: "#1B3A2D" }}
          >
            Do the challenge. Share the shock.
          </h2>
          <p
            className="text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "#6B6860" }}
          >
            The UK's money-saving community is already talking about supermarket prices.
            TrolleyRoast gives them the proof — in seconds, on camera.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              platform: "TikTok",
              emoji: "🎬",
              desc: "Scan your receipt on camera. Reveal the savings. Watch it go viral.",
              cta: "Perfect for creators",
            },
            {
              platform: "WhatsApp",
              emoji: "💬",
              desc: "Share your savings card with the family group chat. Start a conversation about where to shop next week.",
              cta: "Built for sharing",
            },
            {
              platform: "Instagram",
              emoji: "📸",
              desc: "Post your savings card to Stories. The numbers speak for themselves.",
              cta: "Shareable by design",
            },
          ].map((item) => (
            <div
              key={item.platform}
              className="rounded-2xl p-6 text-center"
              style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3
                className="font-semibold text-base mb-2"
                style={{ color: "#1C1A17" }}
              >
                {item.platform}
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#6B6860" }}
              >
                {item.desc}
              </p>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#C9A96E" }}
              >
                {item.cta}
              </span>
            </div>
          ))}
        </div>

        {/* Community callout */}
        <div
          className="mt-8 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(27,58,45,0.05)", border: "1px solid rgba(27,58,45,0.1)" }}
        >
          <p className="text-sm text-center sm:text-left" style={{ color: "#6B6860" }}>
            <strong style={{ color: "#1B3A2D" }}>Already discussed on</strong> r/UKFrugal,
            MoneySavingExpert forums, and UK money-saving communities.
          </p>
          <a
            href="https://trolley-roast.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button
              size="sm"
              className="h-9 px-5 text-xs font-semibold whitespace-nowrap"
              style={{ background: "#1B3A2D", color: "#FAF8F3" }}
            >
              Try the Challenge
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF8F3" }}>

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
          <span
            className="font-display text-xl font-semibold"
            style={{ color: "#1B3A2D" }}
          >
            TrolleyRoast
          </span>
          <div className="flex items-center gap-3">
            <Link href="/receipt-index">
              <span
                className="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity hidden sm:inline"
                style={{ color: "#6B6860" }}
              >
                Price Index
              </span>
            </Link>
            <Link href="/feedback">
              <span
                className="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: "#6B6860" }}
              >
                Feedback
              </span>
            </Link>
            <a
              href="https://trolley-roast.lovable.app"
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

      {/* ── HERO ── */}
      <section className="px-4 pt-14 pb-10 sm:pt-20 sm:pb-16 text-center max-w-2xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-6"
          style={{
            background: "rgba(201,169,110,0.15)",
            color: "#C9A96E",
            border: "1px solid rgba(201,169,110,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          Free · No sign-up needed · UK supermarkets
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-4"
          style={{ color: "#1B3A2D" }}
        >
          Scan your receipt.<br />
          <span style={{ color: "#C9A96E" }}>See where you'd save.</span>
          <br />
          Every week.
        </h1>

        <p
          className="text-base sm:text-lg leading-relaxed mb-3 max-w-md mx-auto"
          style={{ color: "#6B6860" }}
        >
          TrolleyRoast compares your <em>entire basket</em> across Tesco, Asda, Sainsbury's,
          Morrisons, Aldi and Lidl — instantly. No item-by-item searching. Just the truth.
        </p>

        {/* Loss-framing stat */}
        <p
          className="text-sm font-medium mb-8 max-w-sm mx-auto"
          style={{ color: "#9B9790" }}
        >
          The average UK shopper overpays{" "}
          <strong style={{ color: "#1B3A2D" }}>£1,000+ a year</strong> by not comparing
          supermarkets. Your receipt has the answer.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="https://trolley-roast.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="h-13 px-8 text-base font-semibold w-full sm:w-auto"
              style={{ background: "#1B3A2D", color: "#FAF8F3" }}
            >
              Start Saving Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </a>
          <Link href="/feedback">
            <Button
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base font-medium w-full sm:w-auto bg-transparent"
              style={{ borderColor: "#D4CFC6", color: "#1B3A2D" }}
            >
              Share Feedback
            </Button>
          </Link>
        </div>
      </section>

      {/* ── SOCIAL PROOF (above fold) ── */}
      <section
        className="py-5 border-y"
        style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.5)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <SocialProof />
        </div>
      </section>

      {/* ── SUPERMARKET LOGOS STRIP ── */}
      <section
        className="py-8 border-b"
        style={{ borderColor: "#E8E2D6" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <p
            className="text-center text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "#9B9790" }}
          >
            Comparing prices across
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {SUPERMARKETS.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}30`,
                  color: s.color,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: s.color }}
                >
                  {s.letter}
                </span>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: "#1B3A2D" }}
          >
            How it works
          </h2>
          <p className="text-sm" style={{ color: "#9B9790" }}>
            Three steps. Thirty seconds. No account needed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative rounded-2xl p-6"
                style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
              >
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden sm:block absolute top-10 -right-3 w-6 h-px z-10"
                    style={{ background: "#C9A96E" }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(27,58,45,0.08)" }}
                >
                  <Icon size={20} style={{ color: "#1B3A2D" }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: "#C9A96E" }}
                >
                  Step {step.step}
                </span>
                <h3
                  className="font-semibold text-base mb-1.5"
                  style={{ color: "#1C1A17" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6860" }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY TROLLEYROAST WINS ── */}
      <section
        className="py-16 px-4 border-t"
        style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.6)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest mb-3 block"
              style={{ color: "#C9A96E" }}
            >
              The honest comparison
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-3"
              style={{ color: "#1B3A2D" }}
            >
              The supermarket truth-teller
            </h2>
            <p
              className="text-sm leading-relaxed max-w-lg mx-auto"
              style={{ color: "#6B6860" }}
            >
              Supermarkets use confusing multi-buy deals and pack size tricks to hide the real
              cost of your basket. TrolleyRoast cuts through the noise — one scan, six
              supermarkets, the whole truth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex gap-4 rounded-2xl p-5"
                  style={{ background: "#FAF8F3", border: "1px solid #E8E2D6" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(27,58,45,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "#1B3A2D" }} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#1C1A17" }}
                    >
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6860" }}>
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SAVINGS CARD MOCKUP ── */}
      <section className="py-16 px-4" style={{ background: "#1B3A2D" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            {/* Text side */}
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3 block"
                style={{ color: "#C9A96E" }}
              >
                Your savings card
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-4"
                style={{ color: "#FAF8F3" }}
              >
                Share what you saved.<br />
                <span style={{ color: "#C9A96E" }}>Make your mates jealous.</span>
              </h2>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: "rgba(250,248,243,0.7)" }}
              >
                Every scan generates a shareable savings card. Post it to{" "}
                <strong style={{ color: "#FAF8F3" }}>WhatsApp</strong>,{" "}
                <strong style={{ color: "#FAF8F3" }}>Instagram Stories</strong>, or{" "}
                <strong style={{ color: "#FAF8F3" }}>TikTok</strong> — and turn your
                weekly shop into a conversation.
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(250,248,243,0.55)" }}
              >
                The visual of scanning a physical receipt and revealing the savings is one
                of the most shareable moments in the UK money-saving community right now.
              </p>
              <a
                href="https://trolley-roast.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="h-12 px-7 text-sm font-semibold"
                  style={{ background: "#C9A96E", color: "#1B3A2D" }}
                >
                  Get My Savings Card
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </a>
            </div>
            {/* Card mockup */}
            <div className="flex justify-center">
              <SavingsCardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── RECEIPT CHALLENGE / SOCIAL ── */}
      <ReceiptChallenge />

      {/* ── EMAIL CAPTURE ── */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto">
        <span
          className="text-xs font-bold uppercase tracking-widest mb-3 block"
          style={{ color: "#C9A96E" }}
        >
          Stay ahead
        </span>
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: "#1B3A2D" }}
        >
          Get weekly price drops<br />before you shop
        </h2>
        <p
          className="text-sm leading-relaxed mb-7"
          style={{ color: "#6B6860" }}
        >
          We'll send you the biggest supermarket price changes every week — so you always
          know where to go before you leave the house. Join shoppers already saving with
          TrolleyRoast.
        </p>
        <EmailCapture source="landing" />
        <p className="text-xs mt-3" style={{ color: "#9B9790" }}>
          No spam. Unsubscribe any time.
        </p>
      </section>

      {/* ── PRO TEASER ── */}
      <section
        className="py-14 px-4 text-center max-w-xl mx-auto border-t"
        style={{ borderColor: "#E8E2D6" }}
      >
        <div
          className="rounded-2xl p-7 sm:p-9"
          style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E" }}
          >
            Coming soon
          </span>
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: "#1B3A2D" }}
          >
            TrolleyRoast Pro
          </h2>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#6B6860" }}
          >
            SMS alerts when your regular items drop in price. Personalised basket tracking
            across weeks. A monthly "Receipt Index" showing which supermarket is genuinely
            cheapest for real-world baskets — not just single items.
          </p>
          <Link href="/pro">
            <Button
              variant="outline"
              className="h-11 px-7 text-sm font-semibold bg-transparent"
              style={{ borderColor: "#1B3A2D", color: "#1B3A2D" }}
            >
              Join the Waitlist
              <ArrowRight size={15} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
            <a
              href="https://trolley-roast.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              App
            </a>
            <Link href="/receipt-index">
              <span className="hover:underline cursor-pointer">Price Index</span>
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

      {/* ── SEO text block (hidden visually, indexable) ── */}
      <div className="sr-only">
        <p>
          TrolleyRoast is a free UK supermarket price comparison app. Compare your whole
          basket across Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl, Waitrose and Co-op
          by scanning your receipt. Find the cheapest supermarket for a family of four,
          compare basket costs across UK supermarkets, and see Tesco vs Aldi vs Waitrose
          price comparisons instantly. No item-by-item searching required.
        </p>
      </div>
    </div>
  );
}

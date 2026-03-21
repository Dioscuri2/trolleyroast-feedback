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
} from "lucide-react";

// ─── Supermarket data ─────────────────────────────────────────────────────────
const SUPERMARKETS = [
  { name: "Tesco", color: "#00539F", letter: "T" },
  { name: "Asda", color: "#78BE20", letter: "A" },
  { name: "Sainsbury's", color: "#F06C00", letter: "S" },
  { name: "Morrisons", color: "#FDB913", letter: "M" },
  { name: "Aldi", color: "#003882", letter: "A" },
  { name: "Lidl", color: "#0050AA", letter: "L" },
];

// ─── How It Works steps ───────────────────────────────────────────────────────
const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Scan your receipt",
    desc: "Take a photo of any UK supermarket receipt. Our AI reads it in seconds.",
  },
  {
    icon: BarChart3,
    step: "02",
    title: "We compare your basket",
    desc: "We price every item across Tesco, Asda, Sainsbury's, Morrisons, Aldi & Lidl.",
  },
  {
    icon: Zap,
    step: "03",
    title: "See your savings instantly",
    desc: "Get a shareable savings card showing exactly where you'd save — and how much.",
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
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(201,169,110,0.25)", color: "#C9A96E" }}>
            Your Savings
          </span>
        </div>

        {/* Savings headline */}
        <div className="px-5 pt-5 pb-3 text-center">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#C9A96E" }}>
            You could save
          </p>
          <p className="font-display text-6xl font-bold leading-none" style={{ color: "#1B3A2D" }}>
            £14.30
          </p>
          <p className="text-sm mt-1" style={{ color: "#6B6860" }}>
            switching to Aldi this week
          </p>
        </div>

        {/* Comparison bars */}
        <div className="px-5 pb-5 space-y-2.5">
          {[
            { store: "Your shop", amount: 68.40, pct: 100, highlight: false },
            { store: "Aldi", amount: 54.10, pct: 79, highlight: true },
            { store: "Lidl", amount: 56.20, pct: 82, highlight: false },
            { store: "Asda", amount: 61.80, pct: 90, highlight: false },
          ].map((row) => (
            <div key={row.store}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium" style={{ color: row.highlight ? "#1B3A2D" : "#6B6860" }}>
                  {row.store}
                </span>
                <span className="text-xs font-semibold" style={{ color: row.highlight ? "#1B3A2D" : "#6B6860" }}>
                  £{row.amount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
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
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm" style={{ color: "#6B6860" }}>
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
        <span className="ml-1">Free to use</span>
      </div>
      <div className="hidden sm:block w-px h-4" style={{ background: "#D4CFC6" }} />
      <span>🇬🇧 UK supermarkets only</span>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF8F3" }}>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-20 border-b" style={{ background: "rgba(250,248,243,0.9)", backdropFilter: "blur(8px)", borderColor: "#E8E2D6" }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-semibold" style={{ color: "#1B3A2D" }}>
            TrolleyRoast
          </span>
          <div className="flex items-center gap-3">
            <Link href="/feedback">
              <span className="text-sm font-medium" style={{ color: "#6B6860" }}>
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
          style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.3)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          Free · UK Supermarkets · No sign-up needed
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-4" style={{ color: "#1B3A2D" }}>
          Scan your receipt.<br />
          <span style={{ color: "#C9A96E" }}>See where you'd save.</span><br />
          Every week.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "#6B6860" }}>
          TrolleyRoast compares your basket across Tesco, Asda, Sainsbury's, Morrisons, Aldi and Lidl — instantly.
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

      {/* ── SUPERMARKET LOGOS STRIP ── */}
      <section className="py-6 border-y" style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-xs font-medium uppercase tracking-widest mb-5" style={{ color: "#9B9790" }}>
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
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: "#1B3A2D" }}>
            How it works
          </h2>
          <p className="text-sm" style={{ color: "#9B9790" }}>
            Three steps. Thirty seconds.
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
                {/* Step connector line (desktop) */}
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
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "#C9A96E" }}>
                  Step {step.step}
                </span>
                <h3 className="font-semibold text-base mb-1.5" style={{ color: "#1C1A17" }}>
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

      {/* ── SAVINGS CARD MOCKUP ── */}
      <section
        className="py-16 px-4"
        style={{ background: "#1B3A2D" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            {/* Text side */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#C9A96E" }}>
                Your savings card
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-4" style={{ color: "#FAF8F3" }}>
                Share what you saved.<br />
                <span style={{ color: "#C9A96E" }}>Make your mates jealous.</span>
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(250,248,243,0.7)" }}>
                Every scan generates a beautiful savings card you can share on WhatsApp, Instagram, or TikTok. Your viral moment, powered by your weekly shop.
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

      {/* ── EMAIL CAPTURE ── */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#C9A96E" }}>
          Stay ahead
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3" style={{ color: "#1B3A2D" }}>
          Get weekly price drops<br />before you shop
        </h2>
        <p className="text-sm leading-relaxed mb-7" style={{ color: "#6B6860" }}>
          We'll send you the biggest supermarket price changes every week — so you always know where to go before you leave the house.
        </p>
        <EmailCapture source="landing" />
        <p className="text-xs mt-3" style={{ color: "#9B9790" }}>
          No spam. Unsubscribe any time.
        </p>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-6 border-t border-b" style={{ borderColor: "#E8E2D6", background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <SocialProof />
        </div>
      </section>

      {/* ── PRO TEASER ── */}
      <section className="py-14 px-4 text-center max-w-xl mx-auto">
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
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3" style={{ color: "#1B3A2D" }}>
            TrolleyRoast Pro
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B6860" }}>
            SMS alerts when your regular items drop in price. Personalised basket tracking across weeks. Built for people who take their weekly shop seriously.
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
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "#9B9790" }}>
          <span className="font-display text-base font-semibold" style={{ color: "#1B3A2D" }}>
            TrolleyRoast
          </span>
          <div className="flex items-center gap-4">
            <a href="https://trolley-roast.lovable.app" target="_blank" rel="noopener noreferrer" className="hover:underline">
              App
            </a>
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

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import RouteSeo from "@/components/RouteSeo";
import SavingsEstimator from "@/components/SavingsEstimator";
import {
  Camera,
  BarChart3,
  Zap,
  ArrowRight,
  Share2,
  TrendingDown,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

// ─── Supermarket data (STRICT SPEC) ──────────────────────────────────────────
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

// ─── How It Works steps (STRICT SPEC) ─────────────────────────────────────────
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

// ─── Differentiators (STRICT SPEC) ────────────────────────────────────────────
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

// ─── Savings Card Mockup (STRICT SPEC) ────────────────────────────────────────
function SavingsCardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm transition-all duration-500 hover:scale-[1.02]">
      {/* 10. Offset shadow card (#1B3A2D at 12% opacity) */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[#1B3A2D] opacity-[0.12]" />
      {/* Main card */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E8E3D9] bg-[#FAF8F3] shadow-xl">
        {/* Card header */}
        <div className="px-5 py-4 flex items-center justify-between bg-[#1B3A2D]">
          <span className="font-display text-xl font-semibold tracking-tight text-[#FAF8F3]">
            TrolleyRoast
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#C9A96E]/25 text-[#C9A96E]">
            Your Savings
          </span>
        </div>

        {/* Savings headline */}
        <div className="px-5 pt-8 pb-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">You overpaid by</p>
          <p className="font-display text-6xl font-bold leading-none text-[#1B3A2D]">£14.30</p>
          <p className="text-sm font-medium text-[#7A7570] mt-2">vs. shopping at Aldi this week</p>
        </div>

        {/* Comparison bars */}
        <div className="px-5 pb-8 space-y-3">
          {[
            { store: "Waitrose", amount: 82.10, pct: 100, highlight: false },
            { store: "Co-op", amount: 74.20, pct: 90, highlight: false },
            { store: "Sainsbury's", amount: 70.90, pct: 86, highlight: false },
            { store: "Tesco", amount: 68.40, pct: 83, highlight: false },
            { store: "Morrisons", amount: 65.40, pct: 79, highlight: false },
            { store: "Asda", amount: 61.80, pct: 75, highlight: false },
            { store: "Lidl", amount: 56.20, pct: 68, highlight: false },
            { store: "Aldi", amount: 54.10, pct: 66, highlight: true },
          ].map((row) => (
            <div key={row.store} className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                <span className={row.highlight ? "text-[#1B3A2D]" : "text-[#7A7570]"}>{row.store}</span>
                <span className={row.highlight ? "text-[#1B3A2D]" : "text-[#7A7570]"}>£{row.amount.toFixed(2)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#EDE8DF] overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${row.pct}%`, backgroundColor: row.highlight ? "#C9A96E" : "#D9D2C6" }} 
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-[#FAF8F3] border-t border-[#E8E3D9] flex justify-between text-[10px] font-bold text-[#9B9790] uppercase tracking-widest">
          <span>trolleyroast.app</span>
          <span>21 items compared</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] font-sans">
      
      <RouteSeo
        title="TrolleyRoast — Scan your receipt. See where you'd save."
        description="TrolleyRoast compares your whole basket across eight UK supermarkets using receipt-led evidence. Scan a receipt and see where you'd really save."
        path="/"
      />

      {/* 1. STICKY NAV (STRICT SPEC) */}
      {/* 9. background at 90% opacity, backdropFilter bluractive */}
      <nav className="sticky top-0 z-50 h-[64px] border-b border-[#E8E3D9] bg-[#F5F2EA]/90 backdrop-blur-[12px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          <span className="font-display text-xl font-medium text-[#1B3A2D] brand-name">TrolleyRoast</span>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden md:flex items-center gap-5">
              <Link href="/receipt-index"><span className="whitespace-nowrap text-sm font-semibold text-[#7A7570] hover:text-[#1B3A2D] cursor-pointer transition-colors">Price Index</span></Link>
              <Link href="/feedback"><span className="whitespace-nowrap text-sm font-semibold text-[#7A7570] hover:text-[#1B3A2D] cursor-pointer transition-colors">Feedback</span></Link>
            </div>
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] font-bold rounded-full px-4 sm:px-5 h-9 transition-all active:scale-95 text-xs sm:text-sm font-sans whitespace-nowrap">
                Try the App
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO (STRICT SPEC) */}
      {/* 6. vertical padding py-14 mobile, py-16 sm+ */}
      <section className="px-6 py-16 sm:py-24 md:py-36 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F0EDE6] text-[#7A7570] px-4 py-2 rounded-full text-[0.8rem] font-medium border border-[#E8E3D9] mb-8 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          Free to scan · No sign-up needed · UK supermarkets
        </div>
        <h1 className="font-display text-[clamp(2.8rem,9vw,5rem)] font-semibold leading-[1.04] tracking-[-0.03em] mb-8">
          <span className="block text-[#1B3A2D]">Scan your receipt.</span>
          <span className="block text-[#C9A96E]">See where you'd save.</span>
        </h1>
        <p className="text-base md:text-[1rem] font-medium text-[#1C1A17] leading-8 max-w-[680px] mx-auto mb-4 font-sans">
          TrolleyRoast compares your <em>entire basket</em> across Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl, Waitrose and Co-op — instantly. No item-by-item searching. Just the truth.
        </p>
        <p className="text-base md:text-[1rem] font-medium text-[#1C1A17] leading-8 max-w-[700px] mx-auto mb-12 font-sans">
          The average UK shopper overpays <strong>£1,000+ a year</strong> by not comparing supermarkets. Your receipt has the answer.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            {/* 5a. Solid #1B3A2D bg, #FAF8F3 text, Outfit 500 (handled via font-sans) */}
            <Button className="h-[56px] px-10 text-base font-bold bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full w-full sm:w-auto active:scale-95 font-sans">
              Start Saving Free
              <ArrowRight size={20} className="ml-3" />
            </Button>
          </a>
          <Link href="/feedback">
            {/* 5c. outline with #D9D2C6 border (or #1B3A2D) */}
            <span className="text-base font-bold text-[#1B3A2D] hover:underline underline-offset-8 cursor-pointer px-6 font-sans">
              Share Feedback
            </span>
          </Link>
        </div>
      </section>

      {/* NEW: SAVINGS ESTIMATOR WIDGET */}
      <section className="px-6 pb-20 sm:pb-24 md:pb-36">
        <SavingsEstimator />
      </section>

      {/* 3. SOCIAL PROOF STRIP (STRICT SPEC) */}
      <section className="py-16 sm:py-20 border-y border-[#E8E3D9] bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {[
            "Free to use",
            "No sign-up needed",
            "UK supermarkets only",
          ].map((label) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8E3D9] bg-[#F5F2EA] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7570] font-sans"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPERMARKET LOGOS STRIP (STRICT SPEC) */}
      <section className="py-16 sm:py-20 border-b border-[#E8E3D9]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B9790] mb-8 font-sans">Comparing prices across</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SUPERMARKETS.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E8E3D9] rounded-full shadow-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: s.color }}>{s.letter}</div>
                <span className="text-[11px] font-bold text-[#1C1A17] uppercase tracking-wider font-sans">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-5">
          {/* 7. Gold labelpattern */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block mb-4 font-sans">Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D]">How it works</h2>
          <p className="text-[#9B9790] font-bold text-sm uppercase tracking-widest font-sans">Three steps. Thirty seconds. No account needed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative p-8 sm:p-10 md:p-11 bg-white border border-[#E8E3D9] rounded-[28px] group shadow-sm transition-all hover:shadow-md">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-[60px] -right-4 w-8 h-[1px] bg-[#C9A96E] z-10" />
                )}
                <div className="w-14 h-14 bg-[#1B3A2D]/8 rounded-xl flex items-center justify-center mb-7 sm:mb-8">
                  <Icon size={24} className="text-[#1B3A2D]" />
                </div>
                <span className="font-display text-xs font-bold text-[#C9A96E] uppercase tracking-[0.2em] mb-3 block step-number">Step {step.step}</span>
                <h3 className="font-display text-xl sm:text-[1.45rem] font-bold text-[#1C1A17] mb-4 sm:mb-5 leading-tight">{step.title}</h3>
                <p className="text-[#7A7570] leading-7 font-medium font-sans">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. WHY TROLLEYROAST WINS (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 bg-white border-y border-[#E8E3D9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block mb-4 font-sans">The Honest Comparison</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D]">The supermarket truth-teller.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex gap-5 sm:gap-6 p-7 sm:p-8 md:p-9 bg-[#FAF8F3] border border-[#E8E3D9] rounded-[28px] shadow-sm">
                  <div className="w-12 h-12 bg-[#1B3A2D]/8 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#1B3A2D]" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#1C1A17] uppercase tracking-tight font-sans leading-snug">{d.title}</h4>
                    <p className="text-sm text-[#7A7570] font-medium leading-relaxed font-sans">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SAVINGS CARD SECTION (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 bg-[#1B3A2D]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="space-y-8 sm:space-y-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block mb-4 font-sans">Your Savings Card</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FAF8F3] leading-[1.1]">Share what you saved.<br /><span className="text-[#C9A96E]">Make your mates jealous.</span></h2>
            <p className="text-lg text-[#FAF8F3]/72 font-medium leading-8 font-sans max-w-xl">Every scan generates a beautiful savings card you can post to TikTok, share on WhatsApp, or send to the group chat.</p>
            <p className="text-lg text-[#FAF8F3]/72 font-medium leading-8 font-sans max-w-xl">Show your mates what you saved.</p>
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              {/* 5b. Solid #C9A96E bg + #1B3A2D text */}
              <Button className="h-[56px] px-10 text-base font-bold bg-[#C9A96E] text-[#1B3A2D] hover:bg-[#B8985D] rounded-lg active:scale-95 transition-all font-sans">
                Get My Savings Card
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </a>
          </div>
          <div className="relative">
            <SavingsCardMockup />
          </div>
        </div>
      </section>

      {/* 8. RECEIPT CHALLENGE (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 bg-white border-b border-[#E8E3D9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block mb-4 font-sans">The Receipt Challenge</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D]">Do the challenge. Share the shock.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { plat: "TikTok", icon: "🎬", desc: "Scan your receipt on camera. Reveal the savings. Watch it go viral." },
              { plat: "WhatsApp", icon: "💬", desc: "Share your savings card with the family group chat. Start a conversation." },
              { plat: "Instagram", icon: "📸", desc: "Post your savings card to Stories. The numbers speak for themselves." },
            ].map((s) => (
              <div key={s.plat} className="p-8 sm:p-10 bg-[#F5F2EA] border border-[#E8E3D9] rounded-[28px] text-center space-y-5 shadow-sm transition-transform active:scale-[0.98]">
                <div className="text-5xl">{s.icon}</div>
                <h3 className="font-display text-xl font-bold text-[#1C1A17]">{s.plat}</h3>
                <p className="text-sm text-[#7A7570] leading-7 font-medium font-sans">{s.desc}</p>
                <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-widest block font-sans">Shareable by design</span>
              </div>
            ))}
          </div>
          <div className="mt-12 sm:mt-14 p-7 sm:p-8 md:p-9 bg-[#1B3A2D]/5 border border-[#1B3A2D]/10 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-bold text-[#7A7570] font-sans">Discussed on <span className="text-[#1B3A2D]">r/UKFrugal</span> and <span className="text-[#1B3A2D]">MSE Forums</span>.</p>
            <Button size="sm" className="bg-[#1B3A2D] text-[#FAF8F3] font-bold rounded-lg px-8 font-sans">Try the Challenge</Button>
          </div>
        </div>
      </section>

      {/* 9. EMAIL CAPTURE (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 text-center max-w-xl mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] block mb-4 font-sans">Stay Ahead</span>
        <h2 className="font-display text-4xl font-bold text-[#1B3A2D] mb-6">Get price drops on your items before you shop</h2>
        <p className="text-base text-[#7A7570] font-medium mb-10 leading-8 font-sans">Tell us your regulars once. We'll watch the prices and alert you when it's worth switching stores.</p>
        <EmailCapture source="footer" />
        <p className="mt-4 text-xs font-medium text-[#7A7570] font-sans">No spam. Unsubscribe any time. UK supermarkets only.</p>
      </section>

      {/* 10. PRO TEASER (STRICT SPEC) */}
      <section className="py-20 sm:py-24 md:py-36 px-6 bg-[#1B3A2D]/5 border-t border-[#E8E3D9]">
        <div className="max-w-xl mx-auto bg-white border border-[#E8E3D9] rounded-[32px] p-8 sm:p-10 md:p-12 text-center shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] px-4 py-1.5 bg-[#C9A96E]/10 rounded-full inline-block mb-6 font-sans">Coming Soon</span>
          <h2 className="font-display text-3xl font-bold text-[#1B3A2D] mb-4">TrolleyRoast Pro</h2>
          <p className="text-sm text-[#7A7570] font-medium leading-relaxed mb-6 font-sans">SMS alerts when your regular items drop in price. Personalised basket tracking. The monthly "Receipt Index" for real-world shopping.</p>
          <p className="font-display text-xl text-[#C9A96E] mb-8">From £1.99/month or £14.99/year</p>
          <Button variant="outline" className="border-[#1B3A2D] text-[#1B3A2D] font-bold rounded-lg px-10 h-12 hover:bg-[#1B3A2D]/5 font-sans">Join the Waitlist</Button>
        </div>
      </section>

      {/* 11. FOOTER (STRICT SPEC) */}
      <footer className="border-t border-[#E8E3D9] py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-sm text-[#9B9790] font-bold font-sans">
          <div className="space-y-2 text-center md:text-left">
            <a href="https://trolleyroast.co.uk" className="font-display text-2xl font-bold text-[#1B3A2D] block brand-name">TrolleyRoast</a>
            <p>The UK's supermarket truth-teller. Free forever.</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A7570]">Also at trolleyroast.co.uk</p>
          </div>
          <div className="flex items-center gap-8 uppercase tracking-widest text-[11px]">
            <Link href="/receipt-index"><span className="hover:text-[#1B3A2D] cursor-pointer">Index</span></Link>
            <Link href="/feedback"><span className="hover:text-[#1B3A2D] cursor-pointer">Feedback</span></Link>
            <Link href="/pro"><span className="hover:text-[#1B3A2D] cursor-pointer">Pro</span></Link>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em]">© 2026 TrolleyRoast</p>
        </div>
      </footer>

    </div>
  );
}

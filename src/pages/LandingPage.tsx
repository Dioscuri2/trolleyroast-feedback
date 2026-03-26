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
  ChevronRight,
  Globe,
} from "lucide-react";

// ─── Supermarket data ─────────────────────────────────────────────────────────
const SUPERMARKETS = [
  { name: "Tesco", color: "#00539F" },
  { name: "Asda", color: "#78BE20" },
  { name: "Sainsbury's", color: "#F06C00" },
  { name: "Morrisons", color: "#FDB913" },
  { name: "Aldi", color: "#003882" },
  { name: "Lidl", color: "#0050AA" },
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

// ─── Differentiators ─────────────────────────────────────────────────────────
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
    <div className="relative mx-auto w-full max-w-sm transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#1B3A2D]/5" />
      <div className="relative rounded-3xl overflow-hidden border border-[#E8E3D9] bg-white shadow-[0_20px_50px_-12px_rgba(27,58,45,0.08)]">
        <div className="px-6 py-5 bg-[#1B3A2D] flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-[#FAF8F3]">TrolleyRoast</span>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A96E]/20 text-[#C9A96E]">Analysis</span>
        </div>
        <div className="px-8 py-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Total Potential Saving</p>
          <p className="font-display text-7xl font-bold text-[#1B3A2D] leading-none mb-2 tracking-tighter">£14.30</p>
          <p className="text-sm font-medium text-[#7A7570]">on your weekly shop</p>
        </div>
        <div className="px-8 pb-8 space-y-4">
          {[
            { store: "Your shop (Tesco)", amount: 68.40, pct: 100, highlight: false },
            { store: "Aldi", amount: 54.10, pct: 79, highlight: true },
            { store: "Lidl", amount: 56.20, pct: 82, highlight: false },
          ].map((row) => (
            <div key={row.store} className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
                <span className={row.highlight ? "text-[#1B3A2D]" : "text-[#7A7570]"}>{row.store}</span>
                <span className={row.highlight ? "text-[#1B3A2D]" : "text-[#7A7570]"}>£{row.amount.toFixed(2)}</span>
              </div>
              <div className="h-2 rounded-full bg-[#FAF8F3] border border-[#E8E3D9] overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${row.pct}%`, backgroundColor: row.highlight ? "#C9A96E" : "#E8E3D9" }} 
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-8 py-4 bg-[#FAF8F3] border-t border-[#E8E3D9] flex justify-between text-[10px] font-bold text-[#7A7570] uppercase tracking-widest">
          <span>trolleyroast.co.uk</span>
          <span>Verified Price Index</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const { data: count } = trpc.social.shopperCount.useQuery();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1A17] font-sans selection:bg-[#1B3A2D]/10 selection:text-[#1B3A2D]">
      
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-[#E8E3D9] bg-[#FAF8F3]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-[#1B3A2D] rounded-xl flex items-center justify-center shadow-lg shadow-[#1B3A2D]/10 transition-transform group-hover:scale-105">
              <span className="text-[#FAF8F3] font-bold text-2xl tracking-tighter">T</span>
            </div>
            <span className="text-2xl font-semibold text-[#1B3A2D] tracking-tight font-display">TrolleyRoast</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/receipt-index"><span className="text-sm font-semibold text-[#7A7570] hover:text-[#1B3A2D] cursor-pointer transition-colors">Price Index</span></Link>
            <Link href="/feedback"><span className="text-sm font-semibold text-[#7A7570] hover:text-[#1B3A2D] cursor-pointer transition-colors">Feedback</span></Link>
            <a href="https://trolley-roast.lovable.app" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] font-bold rounded-lg px-6 h-11 transition-all active:scale-95 shadow-md shadow-[#1B3A2D]/10">
                Launch App
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative px-6 pt-24 pb-32 sm:pt-32 sm:pb-48 text-center max-w-5xl mx-auto overflow-hidden">
        {/* Editorial Headline */}
        <div className="space-y-8 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="font-display text-[clamp(48px,10vw,84px)] font-bold leading-[0.95] text-[#1B3A2D] tracking-[-0.03em] max-w-4xl mx-auto">
            Scan your receipt.<br />
            <span className="relative inline-block">
              See where you'd 
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#C9A96E]/30 -skew-x-12" />
              <span className="relative text-[#C9A96E]"> save.</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#7A7570] leading-relaxed max-w-[560px] mx-auto font-sans">
            TrolleyRoast compares your entire basket across the UK's biggest supermarkets instantly. No searching. Just the truth.
          </p>
        </div>

        {/* Primary CTA Row */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-in fade-in zoom-in duration-1000 delay-200">
          <a href="https://trolley-roast.lovable.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="h-16 px-10 text-lg font-bold bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-lg transition-all shadow-xl shadow-[#1B3A2D]/5 w-full sm:w-auto active:scale-95">
              Scan Your Receipt
              <ArrowRight size={20} className="ml-3" />
            </Button>
          </a>
          <Link href="/feedback">
            <span className="text-base font-bold text-[#1B3A2D] hover:underline underline-offset-8 cursor-pointer transition-all flex items-center gap-1.5 px-6 py-4">
              Share Feedback <ChevronRight size={18} />
            </span>
          </Link>
        </div>

        {/* Supermarket Badges */}
        <div className="flex flex-wrap justify-center gap-3 animate-in fade-in duration-1000 delay-500">
          {SUPERMARKETS.map((s) => (
            <div 
              key={s.name} 
              className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E8E3D9] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[13px] font-bold text-[#1C1A17] uppercase tracking-wider">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-12 border-y border-[#E8E3D9] bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#E8E3D9] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-[#7A7570] tracking-tight uppercase">
              Trusted by <span className="text-[#1B3A2D]">{count ? count.toLocaleString() : "1,247+"} shoppers</span> this week
            </p>
          </div>
          <div className="h-px w-24 bg-[#E8E3D9] hidden md:block" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className="fill-[#C9A96E] text-[#C9A96E]" />)}
            <span className="ml-2 text-sm font-bold text-[#1B3A2D] uppercase tracking-widest">Free Forever</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D]">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="group p-10 bg-white border border-[#E8E3D9] rounded-2xl shadow-trolley hover:shadow-trolley-hover transition-all duration-300">
                <div className="w-14 h-14 bg-[#1B3A2D]/5 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-[#1B3A2D]" />
                </div>
                <span className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.2em] mb-3 block">Step {step.step}</span>
                <h3 className="font-display text-2xl font-bold text-[#1B3A2D] mb-4">{step.title}</h3>
                <p className="text-[#7A7570] leading-relaxed font-medium">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section className="py-24 md:py-32 bg-white border-y border-[#E8E3D9]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E]">The Comparison</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D] leading-[1.1]">The supermarket<br />truth-teller.</h2>
            <p className="text-lg text-[#7A7570] font-medium leading-relaxed">
              Supermarkets use confusing multi-buy deals and pack size tricks to hide the real cost. TrolleyRoast cuts through the noise — one scan, the whole truth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DIFFERENTIATORS.slice(0, 2).map((d) => (
                <div key={d.title} className="space-y-2">
                  <h4 className="text-sm font-bold text-[#1B3A2D] uppercase tracking-tight">{d.title}</h4>
                  <p className="text-sm text-[#7A7570] font-medium leading-snug">{d.desc}</p>
                </div>
              ))}
            </div>
            <a href="https://trolley-roast.lovable.app" target="_blank" rel="noopener noreferrer">
              <Button className="h-14 px-8 bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-lg font-bold shadow-lg shadow-[#1B3A2D]/5 mt-4">
                Try The Challenge <ArrowRight size={18} className="ml-2" />
              </Button>
            </a>
          </div>
          <div className="relative">
            <SavingsCardMockup />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 md:py-48 px-6 text-center max-w-3xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl font-bold text-[#1B3A2D] mb-8 leading-[1.1]">Stop overpaying<br />for groceries.</h2>
        <p className="text-lg text-[#7A7570] font-medium mb-12 max-w-lg mx-auto">
          The average UK family saves £1,000+ a year by switching supermarkets. Scan your next receipt and see your share.
        </p>
        <EmailCapture source="footer" />
        <div className="mt-12 flex items-center justify-center gap-6 text-[10px] font-bold text-[#7A7570] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#1B3A2D]" /> No Sign-up</span>
          <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#C9A96E]" /> Instant Analysis</span>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#E8E3D9] py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 text-sm">
          <div className="space-y-4 max-w-xs">
            <span className="font-display text-2xl font-bold text-[#1B3A2D]">TrolleyRoast</span>
            <p className="text-[#7A7570] font-medium">The UK's supermarket truth-teller. Built to help you keep more of what you earn.</p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-[#1B3A2D] uppercase tracking-widest">Platform</span>
              <div className="flex flex-col gap-4 font-bold text-[#7A7570]">
                <Link href="/receipt-index"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Price Index</span></Link>
                <Link href="/feedback"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Feedback</span></Link>
                <Link href="/pro"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Pro Waitlist</span></Link>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-[#1B3A2D] uppercase tracking-widest">Connect</span>
              <div className="flex flex-col gap-4 font-bold text-[#7A7570]">
                <a href="#" className="hover:text-[#1B3A2D] transition-colors">Support</a>
                <a href="#" className="hover:text-[#1B3A2D] transition-colors">Twitter</a>
                <a href="#" className="hover:text-[#1B3A2D] transition-colors">TikTok</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#F3F4F6] flex justify-between items-center text-[10px] font-bold text-[#7A7570] uppercase tracking-widest">
          <span>© 2026 TROLLEYROAST GLOBAL LTD.</span>
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A2D] animate-pulse" />
             <span>Systems Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

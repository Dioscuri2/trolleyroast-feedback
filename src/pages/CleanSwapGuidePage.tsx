import { Link } from "wouter";
import RouteSeo from "@/components/RouteSeo";
import { ArrowLeft, ShieldCheck, ShoppingCart, Info, Download } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

export default function CleanSwapGuidePage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] font-sans pb-20">
      <RouteSeo
        title="Supermarket Clean-Swap Guide | Metabolic Health on a Budget"
        description="Download the free GP-led guide to avoiding food toxins and finding the cleanest budget foods at Aldi, Tesco, and Lidl."
        path="/clean-swap-guide"
      />

      <nav className="border-b border-[#E8E3D9] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm font-bold text-[#1B3A2D] cursor-pointer">
              <ArrowLeft size={16} />
              Back to TrolleyRoast
            </span>
          </Link>
          <span className="font-display text-lg font-bold text-[#1B3A2D]">Clean Swap Guide</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pt-16 md:pt-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-4 py-2 text-xs font-bold text-[#8B6A32] uppercase tracking-widest mb-8">
          <ShieldCheck size={14} />
          GP-Led Clinical Insight
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl font-bold text-[#1B3A2D] mb-6 leading-tight">
          Your "Normal" Grocery Shop is Sabotaging Your Health.
        </h1>
        
        <p className="text-xl font-medium leading-8 text-[#4F4A44] mb-12 max-w-2xl mx-auto">
          UK supermarkets are full of metabolic triggers disguised as "healthy" options. Learn how to spot the hidden toxins and find 100% clean alternatives at budget prices.
        </p>

        <div className="bg-white rounded-[32px] border border-[#E8E3D9] p-8 md:p-12 shadow-sm text-left mb-16">
          <h2 className="font-display text-2xl font-bold text-[#1B3A2D] mb-8">Inside this Free 2026 Guide:</h2>
          <ul className="space-y-6">
            {[
              { title: "The 'Dirty Dozen' Fillers", desc: "Why Dr. Tosin recommends avoiding Maltodextrin, Carrageenan, and specific Seed Oils." },
              { title: "The Aldi Clean-Aisle Map", desc: "A week of whole foods for under £50. No fillers, no compromises." },
              { title: "The Hidden Sugar Report", desc: "Which supermarket breads are safe, and which are metabolic bombs." },
              { title: "Sourdough Secrets", desc: "How to identify 'Fake' vs 'Real' sourdough at Asda and Tesco." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="mt-1 bg-[#1B3A2D] text-white rounded-full p-1 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <p className="font-bold text-[#1B3A2D]">{item.title}</p>
                  <p className="text-sm text-[#7A7570] font-medium">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-12 border-t border-[#E8E3D9]">
            <p className="text-sm font-bold text-[#C9A96E] uppercase tracking-widest mb-6">Enter your email to get the PDF instantly</p>
            <EmailCapture source="clean-swap-guide" />
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20">
          <div className="p-8 rounded-[28px] border border-[#E8E3D9] bg-[#1B3A2D]/5">
            <h3 className="font-display text-xl font-bold text-[#1B3A2D] mb-4">Why this matters</h3>
            <p className="text-sm leading-7 text-[#5E5953] font-medium">
              Most price comparison tools only care about the pennies. As a General Practitioner focusing on longevity, I know that <strong>cheap food often has a hidden cost</strong> to your health.
            </p>
          </div>
          <div className="p-8 rounded-[28px] border border-[#E8E3D9] bg-[#C9A96E]/5">
            <h3 className="font-display text-xl font-bold text-[#C9A96E] mb-4">The Clinical Filter</h3>
            <p className="text-sm leading-7 text-[#8B6A32] font-medium">
              We apply a 'Metabolic Filter' to every supermarket. If it has inflammatory fillers, it fails the test. If it's pure, we find you the best price.
            </p>
          </div>
        </section>

        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B9790]">
          Lead by Dr. Oluwatosin Taiwo · Olympus Premium Health Limited
        </div>
      </main>
    </div>
  );
}

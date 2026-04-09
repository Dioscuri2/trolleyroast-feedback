import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";

const GUIDE_TOPICS = [
  "Which UK supermarket is cheapest this month?",
  "How to compare a full basket instead of single items",
  "What receipt-led evidence reveals about supermarket pricing",
  "When switching supermarkets actually saves money",
];

export default function BlogGuidesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1A17]">
      <RouteSeo
        title="TrolleyRoast Guides | Receipt-Led Shopping Insights"
        description="Placeholder guide hub for future TrolleyRoast articles on supermarket prices, basket comparison, and receipt-led savings evidence."
        path="/blog/guides"
      />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity text-[#6B6860]">
              <ArrowLeft size={15} />
              Back
            </button>
          </Link>
          <span className="text-[#D4CFC6]">|</span>
          <span className="font-display text-xl font-semibold text-[#1B3A2D]">TrolleyRoast</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
        <div className="max-w-2xl mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 bg-[#C9A96E]/15 text-[#C9A96E]">
            SEO Backbone Placeholder
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">
            Guides hub
          </h1>
          <p className="text-base leading-relaxed text-[#6B6860]">
            This route is reserved for future editorial content that supports acquisition through helpful supermarket-saving guides, methodology explainers, and receipt-led analysis.
          </p>
        </div>

        <div className="space-y-4">
          {GUIDE_TOPICS.map((topic) => (
            <div key={topic} className="rounded-2xl border border-[#E8E3D9] bg-white p-5 flex items-start gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1B3A2D]/8 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-[#1B3A2D]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1C1A17] mb-1">{topic}</p>
                <p className="text-xs text-[#7A7570]">Planned as part of the acquisition-focused content structure.</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

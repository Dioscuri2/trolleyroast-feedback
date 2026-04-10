import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteSeo from "@/components/RouteSeo";

const SUPERMARKETS = [
  { name: "Tesco", slug: "tesco" },
  { name: "Asda", slug: "asda" },
  { name: "Sainsbury's", slug: "sainsburys" },
  { name: "Morrisons", slug: "morrisons" },
  { name: "Aldi", slug: "aldi" },
  { name: "Lidl", slug: "lidl" },
  { name: "Waitrose", slug: "waitrose" },
  { name: "Co-op", slug: "co-op" },
];

export default function SupermarketsPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="Supermarkets TrolleyRoast Compares | TrolleyRoast"
        description="See the eight UK supermarkets TrolleyRoast compares when you scan a receipt, and understand how whole-basket comparison works."
        path="/supermarkets"
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
            Verified Retailers
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">
            Supermarkets we compare
          </h1>
          <p className="text-base leading-relaxed text-[#6B6860]">
            TrolleyRoast currently supports real-time comparison across the eight major UK retailers below. Select a supermarket to see how their pricing compares to the market average.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {SUPERMARKETS.map((s) => (
            <Link key={s.slug} href={`/supermarkets/${s.slug}`}>
              <div className="rounded-2xl border border-[#E8E3D9] bg-white p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A2D]/8 flex items-center justify-center group-hover:bg-[#1B3A2D] transition-colors">
                  <Store size={18} className="text-[#1B3A2D] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1C1A17]">{s.name}</p>
                  <p className="text-xs text-[#7A7570]">Whole-basket truth analysis available.</p>
                </div>
                <ArrowRight size={14} className="text-[#D4CFC6] group-hover:text-[#1B3A2D]" />
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-3">
            Next build phase
          </h2>
          <p className="text-sm leading-relaxed text-[#6B6860] mb-6">
            Expand this section into individual supermarket comparison pages, methodology content, and internal links to the Receipt Index and receipt-scanning app.
          </p>
          <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full">
              Try the app
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}

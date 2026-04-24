import { useParams, Link } from "wouter";
import { ArrowLeft, Store, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteSeo from "@/components/RouteSeo";

const SUPERMARKET_DATA: Record<string, { name: string; color: string; desc: string }> = {
  aldi: { name: "Aldi", color: "#003882", desc: "The consistent price-leader. Our data shows Aldi remains the cheapest for whole-basket shops in 2026." },
  lidl: { name: "Lidl", color: "#0050AA", desc: "Aggressive competition on staples. Lidl often trades blows with Aldi for the absolute lowest receipt total." },
  tesco: { name: "Tesco", color: "#00539F", desc: "Reliable variety, but whole-basket totals are often 15-20% higher than discounters without Clubcard deals." },
  asda: { name: "Asda", color: "#78BE20", desc: "Strong on family bulk-buys. Asda frequently places as the cheapest 'Big Four' supermarket." },
  sainsburys: { name: "Sainsbury's", color: "#F06C00", desc: "Premium positioning but surprisingly competitive on core essentials through price-match programmes." },
  morrisons: { name: "Morrisons", color: "#FDB913", desc: "Focus on fresh produce and counters. Competitive on specific categories like Meat & Fish." },
  waitrose: { name: "Waitrose", color: "#007B40", desc: "The premium benchmark. Expect the highest basket totals but superior product provenance." },
  "co-op": { name: "Co-op", color: "#00B1A9", desc: "Convenience at a cost. Our index shows Co-op as one of the most expensive for a full weekly shop." },
};

export default function SupermarketDetailPage() {
  const { slug } = useParams();
  const data = slug ? SUPERMARKET_DATA[slug] : null;

  if (!data) return <div>Supermarket not found</div>;

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title={`${data.name} Price Comparison & Savings | TrolleyRoast`}
        description={`See how ${data.name} prices compare for a full weekly shop. Use receipt-led evidence to find out if you're really saving at ${data.name}.`}
        path={`/supermarkets/${slug}`}
      />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/supermarkets">
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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: data.color }}>
            {data.name[0]}
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D]">{data.name}</h1>
            <p className="text-[#6B6860] font-medium uppercase tracking-widest text-xs mt-1">Supermarket Analysis</p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none mb-12">
          <p className="text-lg leading-relaxed text-[#1C1A17]">{data.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-[#E8E3D9] p-8 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-[#1B3A2D]/8 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-[#1B3A2D]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1B3A2D] mb-3">Why TrolleyRoast wins here</h3>
            <p className="text-[#7A7570] leading-relaxed">
              We don't just look at single-item "Price Matches". We compare your <em>entire</em> {data.name} receipt against every other store to show you the real-world total.
            </p>
          </div>
          <div className="bg-white border border-[#E8E3D9] p-8 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-[#C9A96E]/8 rounded-xl flex items-center justify-center mb-6">
              <Zap className="text-[#C9A96E]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1B3A2D] mb-3">Instant Comparison</h3>
            <p className="text-[#7A7570] leading-relaxed">
              Scan your next {data.name} receipt to see exactly how much you overpaid (or saved) compared to the competition.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-[#1B3A2D] p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-6">Ready to see the truth?</h2>
          <a href="https://www.trolleyroast.app" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#C9A96E] text-[#1B3A2D] hover:bg-[#B8985D] font-bold rounded-full px-10 h-14">
              Try the app now
              <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}

import { useParams, Link } from "wouter";
import { ArrowLeft, Tags, Info, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteSeo from "@/components/RouteSeo";

const CATEGORY_DATA: Record<string, { name: string; desc: string }> = {
  "dairy-eggs": { name: "Dairy & Eggs", desc: "One of the most price-volatile categories. From milk to cheese, we track weekly fluctuations to ensure your basket total is accurate." },
  bakery: { name: "Bread & Bakery", desc: "Essential staples where the 'discounter advantage' is most visible. Comparing fresh bakery items across all major UK retailers." },
  "fresh-produce": { name: "Fruit & Veg", desc: "Freshness meets value. We analyse seasonal pricing to show you where your healthy shop is most affordable." },
  "meat-fish": { name: "Meat & Fish", desc: "High-ticket items that drive basket totals. Our data highlights the significant price gaps between premium and value ranges." },
  cupboard: { name: "Cupboard Staples", desc: "Canned goods, pasta, and spices. These long-life essentials often have hidden multi-buy traps we help you avoid." },
  drinks: { name: "Drinks", desc: "From soft drinks to spirits. We track brand-name vs own-label pricing to give you the whole-basket truth." },
};

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const data = slug ? CATEGORY_DATA[slug] : null;

  if (!data) return <div>Category not found</div>;

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title={`Cheapest ${data.name} UK | TrolleyRoast Category Analysis`}
        description={`Find out which UK supermarket is cheapest for ${data.name}. We use real receipt data to compare whole-basket costs across the country.`}
        path={`/categories/${slug}`}
      />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/categories">
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
        <div className="max-w-2xl mb-12">
          <div className="w-12 h-12 rounded-xl bg-[#1B3A2D]/8 flex items-center justify-center mb-6">
            <Tags size={24} className="text-[#1B3A2D]" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">{data.name}</h1>
          <p className="text-lg leading-relaxed text-[#6B6860]">{data.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-[#E8E3D9] p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Info className="text-[#C9A96E]" size={20} />
              <h3 className="font-display text-xl font-bold text-[#1B3A2D]">Market Insights</h3>
            </div>
            <p className="text-[#7A7570] text-sm leading-relaxed">
              Our index shows that for {data.name}, Aldi and Lidl consistently undercut the Big Four by an average of 14% on like-for-like baskets.
            </p>
          </div>
          <div className="bg-white border border-[#E8E3D9] p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="text-[#1B3A2D]" size={20} />
              <h3 className="font-display text-xl font-bold text-[#1B3A2D]">Savings Potential</h3>
            </div>
            <p className="text-[#7A7570] text-sm leading-relaxed">
              Switching your {data.name.toLowerCase()} shop can save a typical family of four up to £240 per year. Scan to see your personal saving.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E8E3D9] bg-white p-10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#1B3A2D] mb-4 text-center">Stop guessing. Start scanning.</h2>
          <div className="flex justify-center">
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] font-bold rounded-full px-8 h-12">
                Scan your receipt free
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

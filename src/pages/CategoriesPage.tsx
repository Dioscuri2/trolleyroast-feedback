import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteSeo from "@/components/RouteSeo";

const CATEGORIES = [
  { name: "Dairy & Eggs", slug: "dairy-eggs" },
  { name: "Meat & Fish", slug: "meat-fish" },
  { name: "Fruit & Veg", slug: "fresh-produce" },
  { name: "Bread & Bakery", slug: "bakery" },
  { name: "Cupboard Staples", slug: "cupboard" },
  { name: "Drinks", slug: "drinks" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="Basket Categories TrolleyRoast Tracks | TrolleyRoast"
        description="Explore the shopping categories TrolleyRoast uses to explain whole-basket savings across UK supermarkets."
        path="/categories"
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
            Price Index Categories
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">
            Basket categories
          </h1>
          <p className="text-base leading-relaxed text-[#6B6860]">
            We track pricing across these essential categories to calculate your whole-basket savings. Select a category to see recent price trends and supermarket comparisons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`}>
              <div className="rounded-2xl border border-[#E8E3D9] bg-white p-5 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A2D]/8 flex items-center justify-center group-hover:bg-[#1B3A2D] transition-colors">
                  <Tags size={18} className="text-[#1B3A2D] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1C1A17]">{c.name}</p>
                  <p className="text-xs text-[#7A7570]">Receipt-led category analysis available.</p>
                </div>
                <ArrowRight size={14} className="text-[#D4CFC6] group-hover:text-[#1B3A2D]" />
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-3">
            Why this matters
          </h2>
          <p className="text-sm leading-relaxed text-[#6B6860] mb-6">
            Category pages will support high-intent search traffic and help explain the difference between cherry-picked offers and the real cost of a full shop.
          </p>
          <Link href="/receipt-index">
            <span className="inline-flex cursor-pointer">
              <Button className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full">
                View the Receipt Index
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

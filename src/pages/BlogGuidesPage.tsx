import { Link } from "wouter";
import { ArrowLeft, FileText, ArrowRight, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteSeo from "@/components/RouteSeo";

export default function BlogGuidesPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="Aldi vs Tesco: The Whole-Basket Truth | TrolleyRoast Guides"
        description="We compared a real weekly basket across Aldi and Tesco. See why single-item price matches hide the truth about your grocery bill."
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

      <main className="max-w-3xl mx-auto px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-4">Featured Guide</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#1B3A2D] leading-[1.1] mb-6">
            Aldi vs Tesco: The Whole-Basket Truth
          </h1>
          <div className="flex items-center gap-3 text-[#9B9790] text-xs font-bold uppercase tracking-widest">
            <span>By TrolleyRoast Data Team</span>
            <span className="text-[#D4CFC6]">|</span>
            <span>April 2026</span>
          </div>
        </div>

        <div className="prose prose-stone prose-lg max-w-none break-words text-[#1C1A17] leading-relaxed space-y-8">
          <p className="text-xl font-medium text-[#6B6860] italic border-l-4 border-[#C9A96E] pl-6 py-2">
            "If you only look at the Price Match stickers, you're missing 80% of your bill. The truth is in the receipt total, not the shelf edge."
          </p>

          <p>
            For years, the 'Big Four' supermarkets have used aggressive single-item price matching to convince shoppers they're getting discounter value. But our latest 2026 Receipt Index reveals a different story. When you look at a <strong>whole weekly basket</strong> of 45 items, the gap remains significant.
          </p>

          <div className="bg-white border border-[#E8E3D9] p-8 rounded-3xl shadow-sm my-12">
            <h3 className="font-display text-2xl font-bold text-[#1B3A2D] mb-6">Key Findings:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1B3A2D]">
                  <TrendingDown size={18} />
                  <span className="font-bold text-sm uppercase tracking-tight">The Price Gap</span>
                </div>
                <p className="text-sm text-[#7A7570]">On an average family shop, Tesco was £14.82 more expensive than Aldi for the exact same categories.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1B3A2D]">
                  <ShieldCheck size={18} />
                  <span className="font-bold text-sm uppercase tracking-tight">The Trap</span>
                </div>
                <p className="text-sm text-[#7A7570]">Price-matched items only accounted for 12% of the basket. The other 88% is where the margin is hidden.</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-3xl font-bold text-[#1B3A2D]">Why the Scan Matters</h2>
          <p>
            Manual price comparison tools are designed to fail you. They rely on you searching item-by-item, which is exhausting and ignores the complex 'multi-buy' math that supermarkets use to obscure real costs.
          </p>
          <p>
            TrolleyRoast was built to solve this by using <strong>receipt-led evidence</strong>. By scanning your whole receipt, we can see exactly what you paid—including the deals that didn't actually save you money.
          </p>

          <div className="rounded-3xl bg-[#1B3A2D] p-8 text-center text-white my-16 sm:p-10">
            <div className="w-12 h-12 bg-[#C9A96E] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Zap className="text-[#1B3A2D]" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">Don't take our word for it.</h2>
            <p className="text-[#FAF8F3]/80 mb-8 max-w-md mx-auto">Scan your next Tesco or Aldi receipt and see your own personalised Roast.</p>
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button className="h-14 rounded-full bg-[#C9A96E] px-8 text-base font-bold text-[#1B3A2D] hover:bg-[#B8985D] sm:px-10 sm:text-lg">
                Scan your receipt free
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Scale, ReceiptText, SearchCheck } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { COMPARISON_PAGES } from "@/lib/comparisons";

export default function ComparisonHubPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="Supermarket price comparison guides | TrolleyRoast"
        description="Browse crisp supermarket comparison pages built around weekly-shop logic, calculator-driven next steps, and indexable UK grocery comparison topics."
        path="/compare"
      />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
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

      <main className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
        <div className="max-w-3xl mb-10">
          <span className="inline-flex rounded-full bg-[#C9A96E]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-5">
            Comparison guides
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">
            Compare UK supermarkets without fake live price claims
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6B6860]">
            These pages are built for shoppers asking practical questions like whether Aldi is still cheaper than Asda, or whether Tesco convenience is worth the extra spend. We focus on whole-basket logic, not cherry-picked hero products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <Scale className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Whole-basket framing</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">We compare shopping patterns and likely basket behaviour, not isolated headline products.</p>
          </div>
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <SearchCheck className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Safer, indexable content</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">Useful comparison pages can rank without pretending to publish live exact price feeds we cannot yet verify every day.</p>
          </div>
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <ReceiptText className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Actionable next step</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">Every guide points readers into the calculators and receipt scan flow, where the real answer becomes personal.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {COMPARISON_PAGES.map((page) => (
            <Link key={page.slug} href={`/compare/${page.slug}`}>
              <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-full">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">Supermarket comparison</p>
                <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-3">{page.title}</h2>
                <p className="text-sm leading-relaxed text-[#6B6860] mb-5">{page.heroSummary}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-[#1B3A2D]">
                  <span>Open guide</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl bg-[#1B3A2D] p-8 sm:p-10 text-white flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold mb-3">Want the real answer for your own basket?</h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Use the calculators to estimate your likely savings, then scan a real receipt in the app to see how your actual basket compares.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/calculators/weekly-basket-savings">
              <Button className="bg-[#C9A96E] text-[#1B3A2D] hover:bg-[#B8985D] rounded-full font-semibold px-6">
                Try the calculator
              </Button>
            </Link>
            <a href="https://www.trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                Open the app
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

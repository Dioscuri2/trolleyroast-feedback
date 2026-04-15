import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, CircleCheck, ShieldAlert, Scale } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { getComparisonBySlug, COMPARISON_PAGES } from "@/lib/comparisons";

export default function ComparisonDetailPage() {
  const { slug } = useParams();
  const page = getComparisonBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-3xl font-bold text-[#1B3A2D] mb-3">Comparison page not found</h1>
          <p className="text-[#6B6860] mb-6">We could not find that supermarket comparison. Use the main comparison hub to browse live guides.</p>
          <Link href="/compare">
            <Button className="bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-full">Back to comparison hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = COMPARISON_PAGES.filter((entry) => entry.slug !== page.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo title={`${page.title} | TrolleyRoast`} description={page.metaDescription} path={`/compare/${page.slug}`} />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/compare">
            <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity text-[#6B6860]">
              <ArrowLeft size={15} />
              Back to guides
            </button>
          </Link>
          <span className="text-[#D4CFC6]">|</span>
          <span className="font-display text-xl font-semibold text-[#1B3A2D]">TrolleyRoast</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
        <div className="max-w-3xl mb-10">
          <span className="inline-flex rounded-full bg-[#C9A96E]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-5">
            Weekly shop comparison
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">{page.title}</h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6B6860] mb-4">{page.heroSummary}</p>
          <p className="text-sm leading-relaxed text-[#7A7570]">
            We intentionally do not publish fake live shelf prices on these pages. The goal is to help you choose the right shopping strategy, then push you into basket-level tools for a personal answer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6 mb-10">
          <section className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="text-[#1B3A2D]" />
              <h2 className="font-display text-2xl font-semibold text-[#1B3A2D]">Bottom line</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#6B6860] mb-6">{page.whoWins}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#F8F6F0] border border-[#EEE8DA] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">Usually stronger for {page.primary}</p>
                <ul className="space-y-3">
                  {page.wherePrimaryUsuallyWins.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-[#4F4A43] leading-relaxed">
                      <CircleCheck size={16} className="mt-0.5 text-[#1B3A2D] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#F8F6F0] border border-[#EEE8DA] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">Usually stronger for {page.secondary}</p>
                <ul className="space-y-3">
                  {page.whereSecondaryUsuallyWins.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-[#4F4A43] leading-relaxed">
                      <CircleCheck size={16} className="mt-0.5 text-[#1B3A2D] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-4">Best fit by shopper type</h2>
            <ul className="space-y-4 mb-6">
              {page.bestFor.map((point) => (
                <li key={point} className="text-sm leading-relaxed text-[#6B6860] border-b border-[#F0EBE2] pb-4 last:border-0 last:pb-0">
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/calculators/weekly-basket-savings">
              <Button className="w-full bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-full mb-3">Estimate my weekly saving</Button>
            </Link>
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full rounded-full border-[#D9D2C3] text-[#1B3A2D]">Scan a real receipt</Button>
            </a>
          </aside>
        </div>

        <section className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-4">What this means for your weekly basket</h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B6860] mb-6">{page.basketTakeaway}</p>
          <div className="rounded-2xl bg-[#F8F6F0] border border-[#EEE8DA] p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert size={18} className="text-[#C9A96E] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-[#1B3A2D] mb-2">Accuracy note</h3>
                <ul className="space-y-2 text-sm text-[#6B6860] leading-relaxed">
                  {page.cautions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h2 className="font-display text-2xl font-semibold text-[#1B3A2D]">Related comparison guides</h2>
            <Link href="/compare">
              <span className="text-sm font-semibold text-[#1B3A2D] inline-flex items-center gap-1 cursor-pointer">See all guides <ArrowRight size={15} /></span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((entry) => (
              <Link key={entry.slug} href={`/compare/${entry.slug}`}>
                <div className="rounded-3xl border border-[#E8E3D9] bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">Comparison</p>
                  <h3 className="font-display text-xl font-semibold text-[#1B3A2D] mb-3">{entry.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B6860]">{entry.heroSummary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

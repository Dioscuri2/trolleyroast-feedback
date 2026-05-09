import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ReceiptText, Search, TrendingDown } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog";

export default function BlogIndexPage() {
  const featured = BLOG_POSTS[0];
  const remaining = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="TrolleyRoast blog | UK supermarket guides and grocery savings ideas"
        description="Search-led TrolleyRoast blog content covering weekly shop savings, supermarket comparison logic and practical ways to cut your grocery bill."
        path="/blog"
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
            Blog and guides
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] mb-4">
            Practical UK grocery guides built around the full basket, Real Data & Insights
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#6B6860]">
            These are high-intent supermarket guides for people trying to spend less on a real weekly shop. We focus on basket logic, supermarket trade-offs and the next steps that actually help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <Search className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Search-led topics</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">We target real questions shoppers type into Google, then answer them with a practical weekly-shop lens.</p>
          </div>
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <ReceiptText className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Receipt-first thinking</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">The goal is not to win a shelf-label argument. It is to understand what your full receipt is doing to your monthly spend.</p>
          </div>
          <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
            <TrendingDown className="text-[#1B3A2D] mb-4" />
            <h2 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">Commercial next step</h2>
            <p className="text-sm leading-relaxed text-[#6B6860]">Every page naturally points into calculators and receipt scans, where the generic advice becomes personal.</p>
          </div>
        </div>

        <section className="rounded-3xl border border-[#E8E3D9] bg-white p-8 shadow-sm mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">Featured guide</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1B3A2D] mb-4">{featured.title}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#6B6860] mb-5 max-w-3xl">{featured.heroSummary}</p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#9B9790] uppercase tracking-[0.18em] mb-6">
            <span>{featured.publishedLabel}</span>
            <span>{featured.readTime}</span>
          </div>
          <Link href={`/blog/${featured.slug}`}>
            <Button className="bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-full">
              Read the guide
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
          {remaining.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">{post.eyebrow}</p>
                <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-3">{post.title}</h2>
                <p className="text-sm leading-relaxed text-[#6B6860] mb-5">{post.description}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-[#1B3A2D]">
                  <span>{post.readTime}</span>
                  <span className="inline-flex items-center gap-1">Open guide <ArrowRight size={15} /></span>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <div className="rounded-3xl bg-[#1B3A2D] p-8 sm:p-10 text-white flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold mb-3">Ready to test the theory on your own basket?</h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Start with the weekly basket calculator, then scan a real receipt in the app to see where the full-basket gap shows up for you.
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

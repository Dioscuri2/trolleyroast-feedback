import { Link } from "wouter";
import { ArrowRight, PiggyBank, ScanSearch, ShoppingBasket, Split } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const calculators = [
  {
    title: "Weekly Basket Savings",
    href: "/calculators/weekly-basket-savings",
    icon: ShoppingBasket,
    description: "Estimate what your usual weekly shop could save at a better-value supermarket, then unlock category-level guidance.",
    trust: "Multi-step with email teaser and full result",
  },
  {
    title: "Brand vs Own-Brand",
    href: "/calculators/brand-vs-own-brand",
    icon: PiggyBank,
    description: "See how much branded habits may be costing you — and which swap categories are actually worth touching.",
    trust: "Built for realistic partial swaps, not fantasy baskets",
  },
  {
    title: "Split-Shop Savings",
    href: "/calculators/split-shop-savings",
    icon: Split,
    description: "Work out whether a two-store strategy is worth the hassle, or whether the extra trip barely pays for itself.",
    trust: "Verdict-led output: worth it, marginal, or not worth it",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo
        title="Supermarket Savings Calculators | TrolleyRoast"
        description="Explore TrolleyRoast supermarket savings calculators for weekly basket savings, own-brand swaps, and split-shop strategy."
        path="/calculators"
      />

      <section className="border-b border-[#E8E3D9] bg-white/60 px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Savings tools</p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1B3A2D]">
            Start with the estimate.
            <span className="block text-[#8B6A32]">Then roast the real basket in-app.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-[#4F4A44] md:text-lg">
            These calculators are designed to feel useful on their own, but their real job is to show the size of the savings gap before you scan a receipt in TrolleyRoast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Warm, realistic estimates",
              "Built for UK supermarket behaviour",
              "No dark/orange redesign nonsense",
            ].map((item) => (
              <span key={item} className="rounded-full border border-[#E8E3D9] bg-[#F5F2EA] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7570]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <Card key={calculator.href} className="rounded-[28px] border-[#E8E3D9] bg-white py-0 shadow-sm">
                <CardContent className="flex h-full flex-col p-7 sm:p-8">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#1B3A2D]/7 text-[#1B3A2D]">
                    <Icon className="size-6" />
                  </div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Calculator</p>
                  <h2 className="font-display text-3xl font-bold text-[#1B3A2D]">{calculator.title}</h2>
                  <p className="mt-4 flex-1 text-sm font-medium leading-7 text-[#5E5953]">{calculator.description}</p>
                  <div className="mt-6 rounded-2xl border border-[#E8E3D9] bg-[#FAF8F3] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A7570]">
                    {calculator.trust}
                  </div>
                  <Link href={calculator.href}>
                    <span className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#1B3A2D] transition-transform hover:translate-x-0.5">
                      Open calculator
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#E8E3D9] bg-[#1B3A2D] px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Why these exist</p>
            <h2 className="font-display text-4xl font-bold text-[#FAF8F3]">Trust-building first. Receipt-level truth second.</h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#FAF8F3]/78">
              The calculators give shoppers a clean, premium entry point. The app gives them the real answer by comparing what they actually bought.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button className="h-12 rounded-full bg-[#C9A96E] px-8 font-bold text-[#1B3A2D] hover:bg-[#B8985D]">
                Try trolleyroast.app
              </Button>
            </a>
            <Link href="/">
              <span className="inline-flex cursor-pointer items-center gap-2 self-center text-sm font-semibold text-[#FAF8F3]">
                <ScanSearch className="size-4" />
                Back to homepage
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

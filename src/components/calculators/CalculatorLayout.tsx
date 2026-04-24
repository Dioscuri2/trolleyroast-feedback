import { ReactNode } from "react";
import { Link } from "wouter";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, ChevronLeft } from "lucide-react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  trustPoints?: string[];
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function CalculatorLayout({
  title,
  description,
  path,
  eyebrow,
  trustPoints = ["Rules-based estimate", "Built for UK supermarket shoppers", "Designed to point you back into the app"],
  children,
  ctaHref = "https://www.trolleyroast.app",
  ctaLabel = "Try the app",
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo title={`${title} | TrolleyRoast`} description={description} path={path} />

      <nav className="sticky top-0 z-50 border-b border-[#E8E3D9] bg-[#F5F2EA]/90 backdrop-blur-[12px]">
        <div className="mx-auto flex min-h-[64px] max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-0">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link href="/">
              <span className="cursor-pointer truncate font-display text-lg font-medium text-[#1B3A2D] brand-name sm:text-xl">TrolleyRoast</span>
            </Link>
            <Badge className="hidden border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 text-[#8B6A32] md:inline-flex">
              <Calculator className="size-3" />
              Savings tools
            </Badge>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <Link href="/blog">
              <span className="cursor-pointer text-sm font-semibold text-[#7A7570] transition-colors hover:text-[#1B3A2D] sm:inline-flex mr-4">
                Blogs
              </span>
            </Link>
            <Link href="/calculators">
              <span className="cursor-pointer text-sm font-semibold text-[#7A7570] transition-colors hover:text-[#1B3A2D] sm:inline-flex">
                All calculators
              </span>
            </Link>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="sm" className="rounded-full bg-[#1B3A2D] px-4 text-[#FAF8F3] hover:bg-[#12261E] sm:px-5">
                {ctaLabel}
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
          <Link href="/calculators">
            <span className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#7A7570] transition-colors hover:text-[#1B3A2D]">
              <ChevronLeft className="size-4" />
              Back to calculators
            </span>
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">{eyebrow}</p>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1B3A2D]">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#4F4A44] md:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustPoints.map((item) => (
                  <span
                    key={item}
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E8E3D9] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7570]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#E8E3D9] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex flex-col gap-4 border-b border-[#E8E3D9] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">Calculator</p>
                  <p className="mt-1 text-sm leading-6 text-[#7A7570]">Quick estimate here, then check your real receipt in the app for the basket-level answer.</p>
                </div>
                <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="hidden md:block">
                  <Button variant="outline" className="rounded-full border-[#1B3A2D] text-[#1B3A2D] hover:bg-[#1B3A2D]/5">
                    Open app
                    <ArrowRight className="size-4" />
                  </Button>
                </a>
              </div>
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

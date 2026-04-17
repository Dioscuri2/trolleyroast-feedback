import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  BRAND_SWAP_LABELS,
  calculateBrandSwap,
  type BrandSwapCategory,
} from "@/lib/calculators/engine";
import { ArrowRight } from "lucide-react";

const categories = Object.entries(BRAND_SWAP_LABELS) as Array<[BrandSwapCategory, string]>;

export default function BrandVsOwnBrandPage() {
  const [brandedItemsPerWeek, setBrandedItemsPerWeek] = useState("14");
  const [averagePricePerItem, setAveragePricePerItem] = useState("2.6");
  const [swapWillingnessPct, setSwapWillingnessPct] = useState("60");
  const [selectedCategories, setSelectedCategories] = useState<BrandSwapCategory[]>([
    "cereal",
    "pasta-rice",
    "tins-sauces",
  ]);

  const result = useMemo(
    () =>
      calculateBrandSwap({
        brandedItemsPerWeek: Number(brandedItemsPerWeek) || 0,
        averagePricePerItem: Number(averagePricePerItem) || 0,
        swapWillingnessPct: Number(swapWillingnessPct) || 0,
        categoriesToSwap: selectedCategories,
      }),
    [averagePricePerItem, brandedItemsPerWeek, selectedCategories, swapWillingnessPct],
  );

  const toggleCategory = (category: BrandSwapCategory) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) return current.filter((item) => item !== category);
      if (current.length >= 5) return current;
      return [...current, category];
    });
  };

  return (
    <CalculatorLayout
      title="Brand vs Own-Brand Savings Calculator"
      description="Model a realistic own-brand strategy: not total basket austerity, just the categories where swapping quietly saves the most."
      path="/calculators/brand-vs-own-brand"
      eyebrow="Brand vs own-brand"
      trustPoints={[
        "Partial-swap logic",
        "Category-led output",
        "Strong CTA back into trolleyroast.app",
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Branded items per week</label>
            <Input
              type="number"
              min="0"
              value={brandedItemsPerWeek}
              onChange={(e) => setBrandedItemsPerWeek(e.target.value)}
              className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Average price per item (£)</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={averagePricePerItem}
              onChange={(e) => setAveragePricePerItem(e.target.value)}
              className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Swap willingness (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              step="1"
              value={swapWillingnessPct}
              onChange={(e) => setSwapWillingnessPct(e.target.value)}
              className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-semibold text-[#1C1A17]">Categories you’d consider swapping</label>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#7A7570]">Up to 5</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map(([category, label]) => {
              const checked = selectedCategories.includes(category);
              return (
                <label
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
                    checked
                      ? "border-[#1B3A2D] bg-[#1B3A2D]/5"
                      : "border-[#E8E3D9] bg-[#FAF8F3] hover:border-[#D5CCBC]"
                  }`}
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggleCategory(category)} className="data-[state=checked]:bg-[#1B3A2D] data-[state=checked]:border-[#1B3A2D]" />
                  <span className="text-sm font-medium text-[#1C1A17]">{label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Weekly saving", value: `£${result.weeklySavings.toFixed(2)}` },
            { label: "Monthly saving", value: `£${result.monthlySavings.toFixed(2)}` },
            { label: "Annual saving", value: `£${result.annualSavings.toFixed(2)}` },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-[#E8E3D9] bg-[#FAF8F3] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">{item.label}</p>
              <p className="mt-3 font-display text-4xl text-[#1B3A2D]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#E8E3D9] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Verdict</p>
          <p className="mt-3 font-display text-3xl text-[#1B3A2D]">Swap around {result.swappedItemsEstimate} items a week.</p>
          <p className="mt-3 text-sm font-medium leading-7 text-[#5E5953]">{result.verdict}</p>
        </div>

        <div className="rounded-[28px] border border-[#E8E3D9] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Top swap categories</p>
          <div className="mt-4 space-y-3">
            {result.topSwapCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E8E3D9] bg-[#FAF8F3] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1C1A17]">{category.label}</p>
                  <p className="text-sm text-[#7A7570]">Estimated weekly saving from this category</p>
                </div>
                <p className="font-display text-2xl text-[#1B3A2D]">£{category.weeklySavings.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
          <Button className="h-12 w-full rounded-full bg-[#C9A96E] font-bold text-[#1B3A2D] hover:bg-[#B8985D]">
            Compare your real basket in the app
            <ArrowRight className="size-4" />
          </Button>
        </a>
      </div>
    </CalculatorLayout>
  );
}

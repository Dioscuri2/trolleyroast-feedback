import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SHOPPING_GOAL_LABELS,
  STORE_LABELS,
  calculateSplitShop,
  type ShoppingGoal,
  type StoreKey,
} from "@/lib/calculators/engine";
import { ArrowRight } from "lucide-react";

const storeOptions = Object.entries(STORE_LABELS) as Array<[StoreKey, string]>;
const goalOptions = Object.entries(SHOPPING_GOAL_LABELS) as Array<[ShoppingGoal, string]>;

export default function SplitShopSavingsPage() {
  const [currentStore, setCurrentStore] = useState<StoreKey>("sainsburys");
  const [weeklySpend, setWeeklySpend] = useState("110");
  const [shoppingGoal, setShoppingGoal] = useState<ShoppingGoal>("best-balance");

  const result = useMemo(
    () =>
      calculateSplitShop({
        currentStore,
        weeklySpend: Number(weeklySpend) || 0,
        shoppingGoal,
      }),
    [currentStore, shoppingGoal, weeklySpend],
  );

  const verdictTone = {
    "worth-it": "bg-[#1B3A2D] text-[#FAF8F3]",
    marginal: "bg-[#C9A96E]/20 text-[#8B6A32]",
    "not-worth-it": "bg-[#E8E3D9] text-[#5E5953]",
  }[result.verdict];

  return (
    <CalculatorLayout
      title="Split-Shop Savings Calculator"
      description="Find out whether shopping two stores actually pays, or whether a smarter single-store strategy would do nearly the same job."
      path="/calculators/split-shop-savings"
      eyebrow="Split-shop savings"
      trustPoints={[
        "Verdict-led output",
        "Built around convenience trade-offs",
        "Still sends the user toward the app for basket truth",
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Current main store</label>
            <Select value={currentStore} onValueChange={(value) => setCurrentStore(value as StoreKey)}>
              <SelectTrigger className="h-12 w-full border-[#E8E3D9] bg-[#FAF8F3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {storeOptions.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Weekly spend (£)</label>
            <Input
              type="number"
              min="1"
              value={weeklySpend}
              onChange={(e) => setWeeklySpend(e.target.value)}
              className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Shopping goal</label>
            <Select value={shoppingGoal} onValueChange={(value) => setShoppingGoal(value as ShoppingGoal)}>
              <SelectTrigger className="h-12 w-full border-[#E8E3D9] bg-[#FAF8F3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {goalOptions.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="rounded-[28px] border border-[#E8E3D9] bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Verdict</p>
            <div className={`mt-4 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${verdictTone}`}>
              {result.verdictLabel}
            </div>
            <p className="mt-4 text-sm font-medium leading-7 text-[#5E5953]">{result.splitStrategy}</p>
          </div>
          <div className="rounded-[24px] border border-[#E8E3D9] bg-[#FAF8F3] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Weekly saving</p>
            <p className="mt-3 font-display text-4xl text-[#1B3A2D]">£{result.weeklySavings.toFixed(2)}</p>
          </div>
          <div className="rounded-[24px] border border-[#E8E3D9] bg-[#FAF8F3] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Annual saving</p>
            <p className="mt-3 font-display text-4xl text-[#1B3A2D]">£{result.annualSavings.toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E8E3D9] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Recommended split</p>
          <p className="mt-3 font-display text-3xl text-[#1B3A2D]">
            {STORE_LABELS[result.recommendedPair.primary]} + {STORE_LABELS[result.recommendedPair.secondary]}
          </p>
          <p className="mt-3 text-sm font-medium leading-7 text-[#5E5953]">
            Use the cheaper store for staples and basket bulk, then keep your current store for preferred lines, convenience, or specialty items.
          </p>
        </div>

        <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
          <Button className="h-12 w-full rounded-full bg-[#C9A96E] font-bold text-[#1B3A2D] hover:bg-[#B8985D]">
            Check your actual basket in trolleyroast.app
            <ArrowRight className="size-4" />
          </Button>
        </a>
      </div>
    </CalculatorLayout>
  );
}

import { useMemo, useState } from "react";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BASKET_CATEGORY_LABELS,
  STORE_LABELS,
  calculateBasketSavings,
  type BasketCategory,
  type BasketHouseholdSize,
  type BasketShoppingStyle,
  type StoreKey,
} from "@/lib/calculators/engine";
import { ArrowRight, MailCheck, Sparkles } from "lucide-react";

const storeOptions = Object.entries(STORE_LABELS) as Array<[StoreKey, string]>;
const categoryOptions = Object.entries(BASKET_CATEGORY_LABELS) as Array<[BasketCategory, string]>;

const styleOptions: Array<{ value: BasketShoppingStyle; label: string }> = [
  { value: "value-first", label: "Value first" },
  { value: "balanced", label: "Balanced" },
  { value: "premium-leaning", label: "Premium leaning" },
  { value: "convenience-led", label: "Convenience led" },
];

export default function WeeklyBasketSavingsPage() {
  const [step, setStep] = useState<"form" | "email" | "result">("form");
  const [householdSize, setHouseholdSize] = useState<BasketHouseholdSize>("2");
  const [weeklySpend, setWeeklySpend] = useState("95");
  const [currentStore, setCurrentStore] = useState<StoreKey>("tesco");
  const [shoppingStyle, setShoppingStyle] = useState<BasketShoppingStyle>("balanced");
  const [categories, setCategories] = useState<BasketCategory[]>(["fresh-produce", "cupboard", "household"]);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "saving" | "saved">("idle");

  const result = useMemo(
    () =>
      calculateBasketSavings({
        householdSize,
        weeklySpend: Number(weeklySpend) || 0,
        currentStore,
        shoppingStyle,
        topCategories: categories,
      }),
    [categories, currentStore, householdSize, shoppingStyle, weeklySpend],
  );

  const toggleCategory = (category: BasketCategory) => {
    setCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }
      if (current.length >= 5) return current;
      return [...current, category];
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStep("email");
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEmailState("saving");

    try {
      await fetch("/api/calculator-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculator: "weekly-basket-savings",
          email,
          payload: { householdSize, weeklySpend: Number(weeklySpend) || 0, currentStore, shoppingStyle, categories },
        }),
      });
      setEmailState("saved");
    } catch {
      setEmailState("saved");
    }

    setStep("result");
  };

  return (
    <CalculatorLayout
      title="Weekly Basket Savings Calculator"
      description="Estimate what your current weekly supermarket habit may be costing you, tease the upside, then reveal the full annual saving and category-level opportunity."
      path="/calculators/weekly-basket-savings"
      eyebrow="Weekly basket savings"
      trustPoints={[
        "Multi-step conversion flow",
        "Email teaser included",
        "Pure rules-based engine under the hood",
      ]}
    >
      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1C1A17]">Household size</label>
              <Select value={householdSize} onValueChange={(value) => setHouseholdSize(value as BasketHouseholdSize)}>
                <SelectTrigger className="h-12 w-full border-[#E8E3D9] bg-[#FAF8F3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3-4">3–4 people</SelectItem>
                  <SelectItem value="5+">5+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1C1A17]">Weekly spend (£)</label>
              <Input
                type="number"
                min="1"
                step="1"
                value={weeklySpend}
                onChange={(e) => setWeeklySpend(e.target.value)}
                className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
              />
            </div>
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
              <label className="text-sm font-semibold text-[#1C1A17]">Shopping style</label>
              <Select value={shoppingStyle} onValueChange={(value) => setShoppingStyle(value as BasketShoppingStyle)}>
                <SelectTrigger className="h-12 w-full border-[#E8E3D9] bg-[#FAF8F3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-semibold text-[#1C1A17]">Top basket categories</label>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#7A7570]">Choose up to 5</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryOptions.map(([category, label]) => {
                const checked = categories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                      checked
                        ? "border-[#1B3A2D] bg-[#1B3A2D]/5"
                        : "border-[#E8E3D9] bg-[#FAF8F3] hover:border-[#D5CCBC]"
                    }`}
                  >
                    <Checkbox checked={checked} className="data-[state=checked]:bg-[#1B3A2D] data-[state=checked]:border-[#1B3A2D]" />
                    <span className="text-sm font-medium text-[#1C1A17]">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E8E3D9] bg-[#FAF8F3] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Instant teaser</p>
            <p className="mt-3 font-display text-3xl text-[#1B3A2D]">About £{result.weeklySavings.toFixed(2)}/week</p>
            <p className="mt-2 text-sm font-medium leading-7 text-[#5E5953]">{result.teaser}</p>
          </div>

          <Button type="submit" className="h-12 w-full rounded-full bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E]">
            See the full result
            <ArrowRight className="size-4" />
          </Button>
        </form>
      )}

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="rounded-[28px] border border-[#E8E3D9] bg-[#FAF8F3] p-6">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-[#C9A96E]/15 text-[#8B6A32]">
              <MailCheck className="size-5" />
            </div>
            <h2 className="font-display text-3xl text-[#1B3A2D]">Your teaser says there’s real money here.</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#5E5953]">
              Drop your email to reveal the full breakdown, including monthly and annual savings, best store suggestions, and the categories driving the gap.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1C1A17]">Email address</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 border-[#E8E3D9] bg-[#FAF8F3]"
            />
            <p className="text-xs leading-6 text-[#7A7570]">
              We’ll use your email to reveal your estimate and send the result summary. You can unsubscribe any time.
            </p>
          </div>

          <Button
            type="submit"
            disabled={emailState === "saving"}
            className="h-12 w-full rounded-full bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E]"
          >
            {emailState === "saving" ? "Unlocking…" : "Unlock my result"}
          </Button>
        </form>
      )}

      {step === "result" && (
        <div className="space-y-6">
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
            <div className="flex items-start gap-3">
              <div className="mt-1 inline-flex size-10 items-center justify-center rounded-2xl bg-[#1B3A2D]/7 text-[#1B3A2D]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Better store suggestions</p>
                <div className="mt-4 space-y-3">
                  {result.suggestedStores.map((store) => (
                    <div key={store.store} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E8E3D9] bg-[#FAF8F3] px-4 py-3">
                      <div>
                        <p className="font-semibold text-[#1C1A17]">{store.label}</p>
                        <p className="text-sm text-[#7A7570]">Estimated weekly gap versus your current habit</p>
                      </div>
                      <p className="font-display text-2xl text-[#1B3A2D]">£{store.estimatedWeeklySavings.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#E8E3D9] bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Category insights</p>
            <div className="mt-4 space-y-4">
              {result.categoryInsights.map((insight) => (
                <div key={insight.category} className="rounded-2xl border border-[#E8E3D9] bg-[#FAF8F3] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-[#1C1A17]">{insight.label}</p>
                    <span className="rounded-full bg-[#1B3A2D]/7 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1B3A2D]">
                      {insight.impact} impact
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-7 text-[#5E5953]">{insight.note}</p>
                </div>
              ))}
            </div>
          </div>

          <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
            <Button className="h-12 w-full rounded-full bg-[#C9A96E] font-bold text-[#1B3A2D] hover:bg-[#B8985D]">
              Scan your real receipt in the app
              <ArrowRight className="size-4" />
            </Button>
          </a>
        </div>
      )}
    </CalculatorLayout>
  );
}

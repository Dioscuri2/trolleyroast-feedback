export type StoreKey =
  | "aldi"
  | "lidl"
  | "asda"
  | "tesco"
  | "morrisons"
  | "sainsburys"
  | "waitrose"
  | "coop";

export type BasketHouseholdSize = "1" | "2" | "3-4" | "5+";
export type BasketShoppingStyle = "value-first" | "balanced" | "premium-leaning" | "convenience-led";
export type BasketCategory =
  | "fresh-produce"
  | "meat-fish"
  | "dairy-eggs"
  | "bakery"
  | "freezer"
  | "cupboard"
  | "baby"
  | "household"
  | "toiletries"
  | "snacks-drinks";

export type BrandSwapCategory =
  | "cereal"
  | "pasta-rice"
  | "tins-sauces"
  | "yoghurts-desserts"
  | "snacks"
  | "soft-drinks"
  | "cleaning"
  | "toiletries";

export type ShoppingGoal = "max-savings" | "best-balance" | "quality-with-savings" | "time-efficient";

export const STORE_LABELS: Record<StoreKey, string> = {
  aldi: "Aldi",
  lidl: "Lidl",
  asda: "Asda",
  tesco: "Tesco",
  morrisons: "Morrisons",
  sainsburys: "Sainsbury's",
  waitrose: "Waitrose",
  coop: "Co-op",
};

export const BASKET_CATEGORY_LABELS: Record<BasketCategory, string> = {
  "fresh-produce": "Fresh produce",
  "meat-fish": "Meat & fish",
  "dairy-eggs": "Dairy & eggs",
  bakery: "Bakery",
  freezer: "Frozen food",
  cupboard: "Cupboard staples",
  baby: "Baby",
  household: "Household",
  toiletries: "Toiletries",
  "snacks-drinks": "Snacks & drinks",
};

export const BRAND_SWAP_LABELS: Record<BrandSwapCategory, string> = {
  cereal: "Breakfast & cereal",
  "pasta-rice": "Pasta, rice & grains",
  "tins-sauces": "Tins & sauces",
  "yoghurts-desserts": "Yoghurts & desserts",
  snacks: "Snacks",
  "soft-drinks": "Soft drinks",
  cleaning: "Cleaning",
  toiletries: "Toiletries",
};

export const SHOPPING_GOAL_LABELS: Record<ShoppingGoal, string> = {
  "max-savings": "Maximum savings",
  "best-balance": "Best balance of savings and convenience",
  "quality-with-savings": "Quality with savings",
  "time-efficient": "Time-efficient savings",
};

const STORE_INDEX: Record<StoreKey, number> = {
  aldi: 0.79,
  lidl: 0.81,
  asda: 0.88,
  tesco: 0.93,
  morrisons: 0.95,
  sainsburys: 1,
  waitrose: 1.13,
  coop: 1.09,
};

const CATEGORY_SAVING_WEIGHT: Record<BasketCategory, number> = {
  "fresh-produce": 1.15,
  "meat-fish": 1.08,
  "dairy-eggs": 0.95,
  bakery: 0.82,
  freezer: 0.9,
  cupboard: 1.02,
  baby: 1.18,
  household: 1.12,
  toiletries: 1.1,
  "snacks-drinks": 0.84,
};

const BRAND_SWAP_RATE: Record<BrandSwapCategory, number> = {
  cereal: 0.34,
  "pasta-rice": 0.28,
  "tins-sauces": 0.31,
  "yoghurts-desserts": 0.26,
  snacks: 0.23,
  "soft-drinks": 0.2,
  cleaning: 0.29,
  toiletries: 0.24,
};

const HOUSEHOLD_FACTOR: Record<BasketHouseholdSize, number> = {
  "1": 0.88,
  "2": 0.98,
  "3-4": 1.06,
  "5+": 1.15,
};

const STYLE_FACTOR: Record<BasketShoppingStyle, number> = {
  "value-first": 0.76,
  balanced: 1,
  "premium-leaning": 1.22,
  "convenience-led": 1.12,
};

function roundCurrency(value: number) {
  return Math.max(0, Math.round(value * 100) / 100);
}

function annualise(weekly: number) {
  return roundCurrency(weekly * 52);
}

function monthlyise(weekly: number) {
  return roundCurrency((weekly * 52) / 12);
}

function categoryAverageWeight<T extends string>(categories: T[], map: Record<T, number>, fallback = 1) {
  if (!categories.length) return fallback;
  return categories.reduce((sum, item) => sum + map[item], 0) / categories.length;
}

function rankAlternativeStores(currentStore: StoreKey) {
  const currentIndex = STORE_INDEX[currentStore];
  return Object.entries(STORE_INDEX)
    .filter(([store]) => store !== currentStore)
    .map(([store, index]) => ({
      store: store as StoreKey,
      deltaPct: Math.max(0, (currentIndex - index) / currentIndex),
    }))
    .sort((a, b) => b.deltaPct - a.deltaPct);
}

export interface BasketSavingsInput {
  householdSize: BasketHouseholdSize;
  weeklySpend: number;
  currentStore: StoreKey;
  shoppingStyle: BasketShoppingStyle;
  topCategories: BasketCategory[];
}

export interface BasketSavingsResult {
  weeklySavings: number;
  monthlySavings: number;
  annualSavings: number;
  suggestedStores: Array<{ store: StoreKey; label: string; estimatedWeeklySavings: number }>;
  categoryInsights: Array<{ category: BasketCategory; label: string; impact: "high" | "medium"; note: string }>;
  teaser: string;
  summary: string;
}

export function calculateBasketSavings(input: BasketSavingsInput): BasketSavingsResult {
  const baseRank = rankAlternativeStores(input.currentStore);
  const categoryFactor = categoryAverageWeight(input.topCategories, CATEGORY_SAVING_WEIGHT);
  const styleFactor = STYLE_FACTOR[input.shoppingStyle];
  const householdFactor = HOUSEHOLD_FACTOR[input.householdSize];
  const primaryCandidate = baseRank[0];
  const currentIndex = STORE_INDEX[input.currentStore];

  const realisticGap = Math.max(0.04, primaryCandidate ? primaryCandidate.deltaPct : 0.08);
  const normalized = realisticGap * 0.62 * categoryFactor * styleFactor * householdFactor;
  const cappedRate = Math.min(0.3, normalized);
  const weeklySavings = roundCurrency(input.weeklySpend * cappedRate);

  const suggestedStores = baseRank.slice(0, 3).map(({ store, deltaPct }, idx) => ({
    store,
    label: STORE_LABELS[store],
    estimatedWeeklySavings: roundCurrency(
      input.weeklySpend * Math.min(0.28, deltaPct * (idx === 0 ? 0.62 : idx === 1 ? 0.48 : 0.36) * categoryFactor * styleFactor),
    ),
  }));

  const categoryInsights = input.topCategories.slice(0, 4).map((category) => {
    const weight = CATEGORY_SAVING_WEIGHT[category];
    const impact: "high" | "medium" = weight >= 1.05 ? "high" : "medium";
    const notes: Record<BasketCategory, string> = {
      "fresh-produce": "Produce pricing tends to widen sharply between premium and discounter baskets.",
      "meat-fish": "Protein lines are often where split or store switching has the biggest visible impact.",
      "dairy-eggs": "Dairy savings are steady rather than dramatic, but they compound every week.",
      bakery: "Bakery swaps usually matter most when branded treats dominate the basket.",
      freezer: "Frozen staples can produce reliable savings when bought in value-led stores.",
      cupboard: "Cupboard staples are one of the easiest places to keep quality while cutting spend.",
      baby: "Baby items often carry one of the biggest retailer premiums across the market.",
      household: "Cleaning and paper goods are frequently marked up in convenience-led baskets.",
      toiletries: "Toiletries are a strong margin category, so retailer choice matters more than most shoppers expect.",
      "snacks-drinks": "Snack-heavy baskets usually benefit most from selective swaps rather than all-out switching.",
    };
    return {
      category,
      label: BASKET_CATEGORY_LABELS[category],
      impact,
      note: notes[category],
    };
  });

  const topStore = suggestedStores[0]?.label ?? "Aldi";

  return {
    weeklySavings,
    monthlySavings: monthlyise(weeklySavings),
    annualSavings: annualise(weeklySavings),
    suggestedStores,
    categoryInsights,
    teaser: `Your basket looks cheaper at ${topStore} — unlock the full yearly saving and category breakdown.`,
    summary: `Compared with ${STORE_LABELS[input.currentStore]}, a more value-led weekly route could save around £${weeklySavings.toFixed(2)} per week for this basket style. Current store index: ${currentIndex.toFixed(2)}.`,
  };
}

export interface BrandSwapInput {
  brandedItemsPerWeek: number;
  averagePricePerItem: number;
  swapWillingnessPct: number;
  categoriesToSwap: BrandSwapCategory[];
}

export interface BrandSwapResult {
  weeklySavings: number;
  monthlySavings: number;
  annualSavings: number;
  swappedItemsEstimate: number;
  topSwapCategories: Array<{ category: BrandSwapCategory; label: string; weeklySavings: number }>;
  verdict: string;
}

export function calculateBrandSwap(input: BrandSwapInput): BrandSwapResult {
  const willingness = Math.min(1, Math.max(0, input.swapWillingnessPct / 100));
  const swappableItems = input.brandedItemsPerWeek * willingness;
  const selected = input.categoriesToSwap.length ? input.categoriesToSwap : ["cereal", "pasta-rice", "tins-sauces"];
  const avgSavingRate = categoryAverageWeight(selected, BRAND_SWAP_RATE, 0.27);
  const effectiveSavingRate = Math.min(0.42, avgSavingRate * (0.9 + willingness * 0.35));
  const weeklySavings = roundCurrency(swappableItems * input.averagePricePerItem * effectiveSavingRate);

  const perCategoryItems = swappableItems / selected.length;
  const topSwapCategories = [...selected]
    .sort((a, b) => BRAND_SWAP_RATE[b] - BRAND_SWAP_RATE[a])
    .slice(0, 4)
    .map((category) => ({
      category,
      label: BRAND_SWAP_LABELS[category],
      weeklySavings: roundCurrency(perCategoryItems * input.averagePricePerItem * BRAND_SWAP_RATE[category]),
    }));

  let verdict = "A few deliberate own-brand swaps would trim your basket without changing how you shop.";
  if (weeklySavings >= 15) {
    verdict = "This is meaningful money: a disciplined own-brand switch could save you enough to notice every single month.";
  } else if (weeklySavings < 6) {
    verdict = "Your saving is real but modest — focus on the highest-margin categories rather than swapping everything.";
  }

  return {
    weeklySavings,
    monthlySavings: monthlyise(weeklySavings),
    annualSavings: annualise(weeklySavings),
    swappedItemsEstimate: Math.round(swappableItems),
    topSwapCategories,
    verdict,
  };
}

export interface SplitShopInput {
  currentStore: StoreKey;
  weeklySpend: number;
  shoppingGoal: ShoppingGoal;
}

export interface SplitShopResult {
  weeklySavings: number;
  annualSavings: number;
  verdict: "worth-it" | "marginal" | "not-worth-it";
  verdictLabel: string;
  splitStrategy: string;
  recommendedPair: { primary: StoreKey; secondary: StoreKey };
}

export function calculateSplitShop(input: SplitShopInput): SplitShopResult {
  const alternatives = rankAlternativeStores(input.currentStore);
  const best = alternatives[0]?.store ?? "aldi";
  const second = alternatives[1]?.store ?? "lidl";

  const goalMultiplier: Record<ShoppingGoal, number> = {
    "max-savings": 1,
    "best-balance": 0.74,
    "quality-with-savings": 0.58,
    "time-efficient": 0.34,
  };

  const rawRate = alternatives[0]?.deltaPct ?? 0.08;
  const weeklySavings = roundCurrency(input.weeklySpend * rawRate * 0.42 * goalMultiplier[input.shoppingGoal]);

  let verdict: SplitShopResult["verdict"] = "not-worth-it";
  let verdictLabel = "Probably not worth the extra trip";
  if (weeklySavings >= 10) {
    verdict = "worth-it";
    verdictLabel = "Worth it";
  } else if (weeklySavings >= 4.5) {
    verdict = "marginal";
    verdictLabel = "Marginal";
  }

  const strategies: Record<ShoppingGoal, string> = {
    "max-savings": `Do your bulk staples and ambient lines at ${STORE_LABELS[best]}, then keep ${STORE_LABELS[input.currentStore]} only for top-up items or promotions.`,
    "best-balance": `Use ${STORE_LABELS[best]} for the first 70% of your basket, then finish at ${STORE_LABELS[input.currentStore]} only for missing or preferred lines.`,
    "quality-with-savings": `Anchor the main shop at ${STORE_LABELS[best]} or ${STORE_LABELS[second]}, then reserve ${STORE_LABELS[input.currentStore]} for premium fresh or specialty items.`,
    "time-efficient": `Only split-shop when you can pair ${STORE_LABELS[best]} with an existing journey; otherwise keep a single-store routine and focus on selective swaps.`,
  };

  return {
    weeklySavings,
    annualSavings: annualise(weeklySavings),
    verdict,
    verdictLabel,
    splitStrategy: strategies[input.shoppingGoal],
    recommendedPair: {
      primary: best,
      secondary: input.currentStore,
    },
  };
}

export type ComparisonEntry = {
  slug: string;
  primary: string;
  secondary: string;
  title: string;
  metaDescription: string;
  heroSummary: string;
  whoWins: string;
  bestFor: string[];
  wherePrimaryUsuallyWins: string[];
  whereSecondaryUsuallyWins: string[];
  basketTakeaway: string;
  cautions: string[];
};

export const COMPARISON_PAGES: ComparisonEntry[] = [
  {
    slug: "asda-vs-aldi-prices",
    primary: "Asda",
    secondary: "Aldi",
    title: "Asda vs Aldi prices: which is cheaper for a weekly shop?",
    metaDescription:
      "Compare Asda vs Aldi for whole-basket value, family bulk buys, and everyday essentials without relying on fake live price claims.",
    heroSummary:
      "Aldi usually wins on the simplest low-cost basket. Asda becomes more competitive when you want bigger pack sizes, branded family staples, or a one-stop weekly shop.",
    whoWins: "Aldi tends to be the cheaper baseline, while Asda can feel better value for larger family baskets with mixed branded items.",
    bestFor: [
      "Aldi: lean weekly shops built around essentials and own-brand staples.",
      "Asda: family top-ups, bigger pack sizes, and one-store convenience.",
    ],
    wherePrimaryUsuallyWins: [
      "Family-size grocery packs and multibuys.",
      "One-store baskets that mix fresh food, pantry, and household items.",
      "Branded products when you are not doing a full own-brand switch.",
    ],
    whereSecondaryUsuallyWins: [
      "Own-brand essentials and low-friction budget baskets.",
      "Simple produce, dairy, bakery, and staple cupboard items.",
      "Shoppers willing to compromise on range for a lower total receipt.",
    ],
    basketTakeaway:
      "If your main goal is the cheapest possible basket total, Aldi is usually the benchmark. If your basket is bigger, more branded, or convenience-led, Asda can narrow the gap enough to justify the switch less often.",
    cautions: [
      "Promotions move quickly, so treat this page as a shopping framework rather than a live price board.",
      "Your real answer depends on basket mix, not a single headline item.",
    ],
  },
  {
    slug: "tesco-vs-aldi-prices",
    primary: "Tesco",
    secondary: "Aldi",
    title: "Tesco vs Aldi prices: is Clubcard enough to close the gap?",
    metaDescription:
      "See how Tesco vs Aldi compares for a full weekly shop, and where convenience, range, and loyalty pricing change the decision.",
    heroSummary:
      "Aldi still tends to win on whole-basket cost. Tesco gets more defensible when Clubcard pricing, convenience, and wider range matter more than a pure cheapest-total strategy.",
    whoWins: "Aldi usually wins the raw receipt battle. Tesco wins when flexibility, product range, and loyalty mechanics reduce the practical pain of staying put.",
    bestFor: [
      "Tesco: broad range, branded choice, and shoppers who already optimise around Clubcard deals.",
      "Aldi: shoppers aiming to cut the total receipt without overthinking promotions.",
    ],
    wherePrimaryUsuallyWins: [
      "Branded lines supported by loyalty pricing.",
      "Households that want a single reliable full-shop destination.",
      "Specialty ingredients, kids' lunchbox options, and broader product depth.",
    ],
    whereSecondaryUsuallyWins: [
      "Core staples where simple own-brand beats promotional complexity.",
      "Budget-led baskets with fewer branded habits.",
      "Shoppers who care about final receipt total more than shelf variety.",
    ],
    basketTakeaway:
      "Tesco can make sense if you actively use Clubcard and value range. If your real priority is lowering weekly spend, Aldi usually remains the cleaner answer.",
    cautions: [
      "Clubcard-led value depends on active deal usage, not just store choice.",
      "A one-item comparison can mislead. Use a whole-basket view instead.",
    ],
  },
  {
    slug: "sainsburys-vs-aldi-prices",
    primary: "Sainsbury's",
    secondary: "Aldi",
    title: "Sainsbury's vs Aldi prices: premium feel or lower basket total?",
    metaDescription:
      "Compare Sainsbury's vs Aldi on basket cost, convenience, and shopping style so you can choose the right weekly-shop strategy.",
    heroSummary:
      "Sainsbury's offers a more premium-feeling mainstream shop, while Aldi usually wins on stripped-back weekly-shop economics.",
    whoWins: "Aldi normally wins on budget. Sainsbury's wins if quality perception, product breadth, and convenience are worth paying for.",
    bestFor: [
      "Sainsbury's: shoppers who want a smoother mainstream experience without going full premium.",
      "Aldi: households focused on the sharpest possible weekly spend.",
    ],
    wherePrimaryUsuallyWins: [
      "Meal-planning flexibility and broader branded choice.",
      "Fresh-food top-ups where shoppers want more variation.",
      "Households that prefer consistency over lowest-cost hunting.",
    ],
    whereSecondaryUsuallyWins: [
      "Budget baskets built around essentials.",
      "Own-brand-led weekly shops with fewer impulse extras.",
      "Shoppers comfortable trading range for receipt savings.",
    ],
    basketTakeaway:
      "If you want to minimise spend, Aldi is usually the better benchmark. If you value the shopping experience and broader choice, Sainsbury's may still feel worth it, but usually at a higher total.",
    cautions: [
      "Category mix changes outcomes quickly, especially for fresh and branded items.",
      "Do not rely on isolated promotional examples to judge a full basket.",
    ],
  },
  {
    slug: "lidl-vs-asda-prices",
    primary: "Lidl",
    secondary: "Asda",
    title: "Lidl vs Asda prices: discounter edge or family-shop value?",
    metaDescription:
      "Understand when Lidl beats Asda on simplicity and when Asda becomes the stronger value choice for family baskets and mixed-brand shops.",
    heroSummary:
      "Lidl is often stronger on a disciplined essentials basket. Asda can compete better once the basket gets bigger, broader, and more family-driven.",
    whoWins: "Lidl usually wins a leaner essentials shop. Asda can win on practicality for larger households with more varied baskets.",
    bestFor: [
      "Lidl: essentials-first shoppers happy to keep the basket tight.",
      "Asda: bigger mixed baskets that need more range in one trip.",
    ],
    wherePrimaryUsuallyWins: [
      "Core staples and own-brand discount shopping.",
      "Produce-led baskets where simplicity matters.",
      "Shoppers optimising for a lean total receipt.",
    ],
    whereSecondaryUsuallyWins: [
      "Household and pantry shops that need more product depth.",
      "Large households and brand-blended weekly shops.",
      "Baskets where one-stop convenience reduces extra trips.",
    ],
    basketTakeaway:
      "Lidl is usually the sharper price-led move for a focused basket. Asda becomes more rational when scale, range, and fewer compromise purchases matter more than shaving every last pound.",
    cautions: [
      "Lidl's weekly specials can distort perception if you compare one-off buys.",
      "Asda's value improves when you buy in family sizes, not necessarily on every single line.",
    ],
  },
  {
    slug: "morrisons-vs-aldi-prices",
    primary: "Morrisons",
    secondary: "Aldi",
    title: "Morrisons vs Aldi prices: fresh-counter appeal versus hard savings",
    metaDescription:
      "See how Morrisons vs Aldi compares for fresh-food shoppers, value-led families, and full weekly baskets without making false live price claims.",
    heroSummary:
      "Morrisons can justify itself for shoppers who care about fresh counters and produce depth. Aldi usually remains stronger on the cheapest total basket.",
    whoWins: "Aldi tends to win on total spend, while Morrisons can feel stronger in fresh-led categories and traditional weekly-shop familiarity.",
    bestFor: [
      "Morrisons: shoppers who care about fresh counters, produce quality, and a fuller mainstream shop.",
      "Aldi: households chasing the lowest likely receipt total.",
    ],
    wherePrimaryUsuallyWins: [
      "Fresh-food perception and counter-led shopping missions.",
      "Shoppers who value a more traditional supermarket range.",
      "Specific fresh categories where choice matters as much as price.",
    ],
    whereSecondaryUsuallyWins: [
      "Own-brand staples and tighter essentials baskets.",
      "Value-first households trying to reduce weekly grocery spend.",
      "Shoppers willing to simplify choices to save more.",
    ],
    basketTakeaway:
      "Morrisons can feel worth it if fresh food and range matter. If your metric is simply what leaves the till, Aldi is still usually the tougher benchmark to beat.",
    cautions: [
      "Fresh categories can sway perception even when the total basket remains higher.",
      "Use basket-level comparisons rather than cherry-picked hero products.",
    ],
  },
];

export function getComparisonBySlug(slug?: string) {
  return COMPARISON_PAGES.find((entry) => entry.slug === slug);
}

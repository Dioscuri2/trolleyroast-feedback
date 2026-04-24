export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  readTime: string;
  publishedLabel: string;
  heroSummary: string;
  keywords: string[];
  ctaTitle: string;
  ctaBody: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "supermarket-toxin-report-fatigue-fillers",
    title: "The Supermarket Toxin Report: Why your 'Healthy' shop is making you tired",
    description: "Identify the 'Energy Vampire' fillers and hidden toxins in UK supermarket foods that are draining your metabolic battery.",
    eyebrow: "Toxin Audit",
    readTime: "8 min read",
    publishedLabel: "April 2026",
    heroSummary: "Ever wonder why you feel drained after a 'healthy' meal? Many supermarket staples are loaded with fillers like Maltodextrin and Carrageenan that damage your gut and spike your insulin.",
    keywords: ["food toxins uk", "energy vampire fillers", "maltodextrin fatigue", "gut health supermarket"],
    ctaTitle: "Get the full Clean-Swap Guide",
    ctaBody: "Download our free PDF to get the complete list of 12 toxins to avoid and the best clean alternatives at every UK supermarket.",
    sections: [
      {
        heading: "The 'Energy Vampire' Fillers",
        paragraphs: [
          "Maltodextrin is a common filler in everything from sauces to protein powders. It has a glycemic index higher than table sugar, meaning it spikes your insulin and leaves you in a 'Metabolic Fog' shortly after eating.",
          "Carrageenan, found in dairy alternatives and processed meats, has been shown to degrade the gut mucosal lining, leading to systemic inflammation and chronic fatigue."
        ]
      },
      {
        heading: "The Seed Oil Trap",
        paragraphs: [
          "Rapeseed and Soybean oils are the backbone of the processed food industry. They are highly unstable and prone to oxidation, which causes cellular-level stress and drains your mitochondrial energy reserves.",
          "Switching to stable, whole-food fats is the fastest way to restore your 'Living Energy'."
        ]
      }
    ]
  },
  {
    slug: "aldi-clean-shopping-on-a-budget",
    title: "Aldi on a Budget: The 100% Clean Shop Blueprint",
    description: "How to navigate Aldi to find 100% whole foods and clean essentials for under £50 a week.",
    eyebrow: "Budget Mastery",
    readTime: "6 min read",
    publishedLabel: "April 2026",
    heroSummary: "Aldi is a goldmine for longevity-focused shoppers if you know which aisles to skip. Here is the GP's blueprint for a 100% clean shop without the premium price tag.",
    keywords: ["clean eating aldi uk", "healthy shopping aldi", "aldi whole foods list", "budget longevity shopping"],
    ctaTitle: "See the Aldi Clean-Aisle Map",
    ctaBody: "Our free Clean-Swap Guide includes a detailed map of the best whole foods to buy at Aldi and Lidl.",
    sections: [
      {
        heading: "Why Aldi is a goldmine for whole foods",
        paragraphs: [
          "Because Aldi has a limited range, their turnover of fresh produce and meat is incredibly high. This means you are often getting fresher food than the 'Big Four' supermarkets at a significantly lower price.",
          "The trick is to stick to the 'perimeter' and avoid the middle aisles where the ultra-processed 'zombie foods' live."
        ]
      },
      {
        heading: "The specific 'Clean' Swaps at Aldi",
        paragraphs: [
          "Aldi's 100% British Grass-fed Beef is an exceptional value for mitochondrial health. Their organic eggs and 'Specially Selected' Sourdough (check the label for zero yeast) are staples of a metabolic-friendly basket.",
          "By focusing on these high-quality anchors, you can eat a longevity-focused diet for under £50 a week."
        ]
      }
    ]
  },
  {
    slug: "zombie-foods-supermarket-clean-eating",
    title: "Zombie Foods: Why your 'Healthy' Supermarket Shop is Secretly Draining Your Battery",
    description: "Learn how to spot 'Dead Foods' in UK supermarkets and why common fillers are causing metabolic fatigue despite normal blood tests.",
    eyebrow: "Clean Eating Guide",
    readTime: "6 min read",
    publishedLabel: "April 2026",
    heroSummary: "Ever feel like a 4/10 despite your GP telling you you're a 10/10? The truth is your supermarket trolley is full of 'Zombie Foods'—lifeless, shelf-stable products that look healthy but are draining your metabolic energy.",
    keywords: ["clean eating aldi", "metabolic health", "zombie foods", "food fillers uk"],
    ctaTitle: "Want the 100% Clean Shopping Map?",
    ctaBody: "Download our free GP-led Supermarket Clean-Swap Guide to find the exact toxin-free products at Aldi, Lidl, and Tesco.",
    sections: [
      {
        heading: "The 'Deadness' of modern supermarket products",
        paragraphs: [
          "Think about it: Supermarket bread that doesn't rot for weeks? That is not food—it is an industrial achievement. Oils that are bleached and deodorized with chemicals? They are energy vampires, sucking the life out of your mitochondria without you even realizing it."
        ]
      }
    ]
  }
];

export function getBlogPostBySlug(slug?: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

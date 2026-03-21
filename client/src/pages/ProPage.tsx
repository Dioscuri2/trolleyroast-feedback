import { Link } from "wouter";
import { ArrowLeft, Bell, BarChart3, ShoppingCart } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

const PRO_FEATURES = [
  {
    icon: Bell,
    title: "SMS price alerts",
    desc: "Get a text the moment your regular items drop in price at any of the 6 supermarkets.",
  },
  {
    icon: BarChart3,
    title: "Basket tracking over time",
    desc: "See how your weekly shop cost changes week by week, and spot trends before they hit your wallet.",
  },
  {
    icon: ShoppingCart,
    title: "Personalised recommendations",
    desc: "We learn your regular items and tell you exactly which store to visit each week for your basket.",
  },
];

export default function ProPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF8F3" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{ background: "rgba(250,248,243,0.9)", backdropFilter: "blur(8px)", borderColor: "#E8E2D6" }}
      >
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity" style={{ color: "#6B6860" }}>
              <ArrowLeft size={15} />
              Back
            </button>
          </Link>
          <span style={{ color: "#D4CFC6" }}>|</span>
          <span className="font-display text-xl font-semibold" style={{ color: "#1B3A2D" }}>
            TrolleyRoast
          </span>
          <span style={{ color: "#D4CFC6" }}>·</span>
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E" }}
          >
            Pro
          </span>
        </div>
      </header>

      <main className="px-4 py-12 max-w-lg mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E" }}
          >
            Coming soon
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 leading-tight" style={{ color: "#1B3A2D" }}>
            TrolleyRoast Pro
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6B6860" }}>
            For people who take their weekly shop seriously. SMS alerts, basket tracking, and personalised recommendations — all in one place.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-10">
          {PRO_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex gap-4 rounded-xl p-5"
                style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(27,58,45,0.08)" }}
                >
                  <Icon size={20} style={{ color: "#1B3A2D" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "#1C1A17" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6860" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Email capture */}
        <div
          className="rounded-2xl p-7 text-center"
          style={{ background: "#1B3A2D" }}
        >
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: "#FAF8F3" }}>
            Join the waitlist
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(250,248,243,0.7)" }}>
            Be first to know when Pro launches. No spam, ever.
          </p>
          <EmailCapture source="pro" light />
        </div>
      </main>
    </div>
  );
}

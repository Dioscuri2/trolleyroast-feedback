import { Link } from "wouter";
import RouteSeo from "@/components/RouteSeo";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] font-sans pb-20">
      <RouteSeo
        title="About TrolleyRoast | Metabolic Health & Affordable Nutrition"
        description="Learn about the mission behind TrolleyRoast and our clinical leadership under Dr Oluwatosin Taiwo."
        path="/about"
      />

      <nav className="border-b border-[#E8E3D9] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm font-bold text-[#1B3A2D] cursor-pointer">
              <ArrowLeft size={16} />
              Back to Home
            </span>
          </Link>
          <span className="font-display text-lg font-bold text-[#1B3A2D]">About</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pt-16 md:pt-24">
        <div className="prose prose-stone max-w-none">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D] mb-8">About TrolleyRoast</h1>
          
          <p className="text-lg font-medium leading-8 text-[#4F4A44] mb-12">
            TrolleyRoast is a consumer advocacy and price comparison platform dedicated to making healthy eating accessible for everyone in the UK.
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-[#1B3A2D] mb-4">Our Mission</h2>
            <p className="leading-8 text-[#5E5953]">
              Our mission is <strong>"Metabolic Health through Affordable Nutrition."</strong> We believe that the rising cost of living should not be a barrier to maintaining optimal health. By providing transparent, data-driven price comparisons across major UK supermarkets, we empower consumers to make choices that benefit both their health and their wallets.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-[#1B3A2D] mb-4">Clinical Leadership</h2>
            <p className="leading-8 text-[#5E5953]">
              TrolleyRoast is founded and led by <strong>Dr. Oluwatosin Taiwo, MBBS, MRCGP</strong>, a qualified General Practitioner with a focus on longevity and metabolic health. This clinical expertise ensures that our platform prioritizes evidence-based recommendations and understands the deep link between nutrition and long-term wellness.
            </p>
          </section>

          <section className="p-8 rounded-[32px] border border-[#E8E3D9] bg-white shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#1B3A2D] mb-4">Powered by Olympus Premium Health</h2>
            <p className="text-sm leading-7 text-[#7A7570] mb-6">
              TrolleyRoast is an initiative of <strong>Olympus Premium Health Limited</strong>, a business focused on pioneering the future of preventative and metabolic medicine.
            </p>
            <div className="text-xs font-bold uppercase tracking-widest text-[#9B9790]">
              <p>82A James Carter Road</p>
              <p>Mildenhall, Bury St. Edmunds</p>
              <p>Suffolk, IP27 8DE</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

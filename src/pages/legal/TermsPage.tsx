import { Link } from "wouter";
import RouteSeo from "@/components/RouteSeo";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] font-sans pb-20">
      <RouteSeo
        title="Terms and Conditions | TrolleyRoast"
        description="Official terms and conditions for using the TrolleyRoast price comparison platform."
        path="/terms"
      />

      <nav className="border-b border-[#E8E3D9] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm font-bold text-[#1B3A2D] cursor-pointer">
              <ArrowLeft size={16} />
              Back to Home
            </span>
          </Link>
          <span className="font-display text-lg font-bold text-[#1B3A2D]">Terms</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pt-16 md:pt-24">
        <div className="prose prose-stone max-w-none">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D] mb-8">Terms and Conditions</h1>
          
          <div className="space-y-10 text-[#4F4A44] leading-8">
            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">1. Introduction</h2>
              <p>
                These terms and conditions ("Terms") govern your use of the TrolleyRoast website (the "Site"), owned and operated by **Olympus Premium Health Limited** ("we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">2. Ownership and Director</h2>
              <p>
                TrolleyRoast is a trading name of Olympus Premium Health Limited. The Director of the company is **Dr. Oluwatosin Taiwo, MBBS, MRCGP**.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">3. Use of the Site</h2>
              <p>
                The Site is intended for personal, non-commercial use only. You may not modify, copy, or sell any information obtained through the Site without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">4. Data Accuracy</h2>
              <p>
                We provide price comparisons with a goal of transparency. While we strive for 100% accuracy, data is sourced from third-party retailers and prices are subject to change by those retailers without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">5. Clinical Disclaimer</h2>
              <p>
                Information provided on this site regarding nutrition is for educational and transparency purposes. While overseen by a General Practitioner, using the site does not establish a doctor-patient relationship.
              </p>
            </section>

            <section className="pt-10 border-t border-[#E8E3D9]">
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">6. Contact</h2>
              <div className="text-sm font-medium">
                <p>Olympus Premium Health Limited</p>
                <p>82A James Carter Road</p>
                <p>Mildenhall, Bury St. Edmunds</p>
                <p>IP27 8DE</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

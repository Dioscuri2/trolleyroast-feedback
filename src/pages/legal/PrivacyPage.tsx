import { Link } from "wouter";
import RouteSeo from "@/components/RouteSeo";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] font-sans pb-20">
      <RouteSeo
        title="Privacy Policy | TrolleyRoast"
        description="Learn how we handle your data and protect your privacy at TrolleyRoast."
        path="/privacy"
      />

      <nav className="border-b border-[#E8E3D9] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm font-bold text-[#1B3A2D] cursor-pointer">
              <ArrowLeft size={16} />
              Back to Home
            </span>
          </Link>
          <span className="font-display text-lg font-bold text-[#1B3A2D]">Privacy</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pt-16 md:pt-24">
        <div className="prose prose-stone max-w-none">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1B3A2D] mb-8">Privacy Policy</h1>
          
          <div className="space-y-10 text-[#4F4A44] leading-8">
            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">1. Introduction</h2>
              <p>
                **Olympus Premium Health Limited** ("we," "us," or "our") is committed to protecting your privacy. This policy explains how we collect and protect your information at **TrolleyRoast.co.uk**.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">2. Data Collection</h2>
              <p>
                We collect minimal personal data. This typically includes usage data (to improve comparison results) and contact information if you voluntarily reach out to us. We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">3. Third-Party Links</h2>
              <p>
                Our site provides links to third-party supermarkets. We do not control their privacy practices and encourage you to review their policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">4. Clinical Governance</h2>
              <p>
                Data privacy for our health-conscious tools is overseen by **Dr. Oluwatosin Taiwo, MBBS, MRCGP**, ensuring all interactions meet professional standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1B3A2D] mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete any personal information we hold.
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

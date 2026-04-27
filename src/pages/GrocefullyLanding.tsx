import { FC } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SavingsEstimator from "@/components/SavingsEstimator";
import { 
  Search, 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Camera,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";

const GrocefullyLanding: FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1B3A2D] font-sans selection:bg-[#C9A96E]/30">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#E8E3D9] bg-[#FAF8F3]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B3A2D] font-bold text-[#FAF8F3]">TR</div>
            <span className="text-xl font-bold tracking-tight text-[#1B3A2D]">TrolleyRoast</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#7A7570]">
            <Link href="/receipt-index" className="hover:text-[#1B3A2D] transition-colors">Price Index</Link>
            <Link href="/blog" className="hover:text-[#1B3A2D] transition-colors">Guides</Link>
            <Link href="/feedback" className="hover:text-[#1B3A2D] transition-colors">Community</Link>
          </div>
          <a href="https://www.trolleyroast.app" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full font-bold px-6">
              Open App
            </Button>
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION + RESTORED CALCULATOR */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#C9A96E]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 border-[#C9A96E]/30 bg-[#C9A96E]/5 text-[#C9A96E] px-4 py-1.5 rounded-full font-bold tracking-wide uppercase text-[10px]">
              🔥 Compare Your Entire Basket Instantly
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#1B3A2D] leading-[1.05]">
              Don't just shop.<br /><span className="text-[#C9A96E]">Roast the receipt.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#5E5953] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Pick your regulars below to see what you're overpaying, or snap a receipt to compare your entire shop across 8 major UK supermarkets.
            </p>
          </motion.div>

          {/* THE RESTORED INTERACTIVE BASKET CALCULATOR */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-10"
          >
            <SavingsEstimator />
          </motion.div>
        </div>
      </section>

      {/* 4. BENTO GRID (Functionally Wired) */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          
          {/* Main Bento: FUNCTIONAL SNAP UPLOAD */}
          <a 
            href="https://www.trolleyroast.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[32px] bg-white border border-[#E8E3D9] p-8 group shadow-sm hover:shadow-md hover:border-[#1B3A2D]/20 transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 text-[#1B3A2D] opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
              <Camera size={140} strokeWidth={1} />
            </div>
            <div className="relative h-full flex flex-col justify-end">
              <Badge className="w-fit mb-4 bg-[#1B3A2D]/5 text-[#1B3A2D] border-[#1B3A2D]/10 font-bold uppercase tracking-widest text-[10px]">Instant Compare</Badge>
              <h2 className="text-3xl font-bold mb-4 leading-tight">Snap, Upload, Save.<br />The Honest Comparison.</h2>
              <p className="text-[#5E5953] max-w-xs font-medium mb-6">Scan any UK receipt. No manual searching. We price your whole basket at once.</p>
              <Button className="w-fit bg-[#1B3A2D] text-white rounded-full font-bold px-8 group-hover:bg-[#12261E]">
                Upload Receipt <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </a>

          {/* Bento: LIVE DEALS (Similar to Trolley.co.uk) */}
          <div className="md:col-span-2 rounded-[32px] bg-white border border-[#C9A96E]/20 p-8 relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-[#C9A96E]/5 pointer-events-none" />
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-[#1B3A2D] rounded-2xl text-white shadow-lg"><TrendingDown size={24} /></div>
                <Badge variant="outline" className="border-[#C9A96E] text-[#C9A96E] font-bold uppercase tracking-widest text-[9px]">Live Alert</Badge>
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-[#1B3A2D]">Cheapest Mounjaro</h3>
                <p className="text-[#7A7570] font-medium text-sm mb-4">Market-wide price drop detected across 3 pharmacies.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold border-b border-[#E8E3D9] pb-2">
                    <span>Medino</span>
                    <span className="text-[#1B3A2D]">£124.98</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-b border-[#E8E3D9] pb-2 text-[#7A7570]">
                    <span>Curely</span>
                    <span>£129.82</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Bento: VIRAL SHARING */}
          <div className="rounded-[32px] bg-white border border-[#E8E3D9] p-6 flex flex-col justify-between group shadow-sm hover:border-[#1B3A2D]/30 transition-colors">
            <div className="text-[#1B3A2D]/20 group-hover:text-[#1B3A2D] transition-colors"><Share2 size={32} /></div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-[#1B3A2D]">Share the Shock</h4>
              <p className="text-sm text-[#7A7570] font-medium leading-relaxed">Turn your weekly shop into a viral savings card for WhatsApp.</p>
            </div>
          </div>

          {/* Bento: MEDICAL VERIFICATION */}
          <div className="rounded-[32px] bg-white border border-[#E8E3D9] p-6 flex flex-col justify-between group shadow-sm hover:border-[#C9A96E]/30 transition-colors">
            <div className="text-[#1B3A2D]/20 group-hover:text-[#C9A96E] transition-colors"><ShieldCheck size={32} /></div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-[#1B3A2D]">GPhC Verified</h4>
              <p className="text-sm text-[#7A7570] font-medium leading-relaxed">All medical pricing is verified against current pharmacy stock.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-[#E8E3D9] py-16 bg-[#1B3A2D] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#FAF8F3]/60 text-sm mb-6 font-medium tracking-wide">UK's First Receipt-Led Comparison Platform.</p>
          <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest mb-10">
            <Link href="/privacy" className="hover:text-[#C9A96E] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C9A96E] transition-colors">Terms</Link>
            <Link href="/feedback" className="hover:text-[#C9A96E] transition-colors">Contact</Link>
          </div>
          <div className="h-px w-20 bg-[#C9A96E]/30 mx-auto mb-8" />
          <p className="text-[10px] font-bold text-[#FAF8F3]/40 uppercase tracking-[0.4em]">© 2026 TrolleyRoast Labs</p>
        </div>
      </footer>

    </div>
  );
};

export default GrocefullyLanding;

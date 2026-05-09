import { FC, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SavingsEstimator from "@/components/SavingsEstimator";
import { 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  Camera,
  Share2,
  AlertTriangle,
  History,
  Scan,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function GrocefullyLanding() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1B3A2D] font-sans selection:bg-[#C9A96E]/30 selection:text-[#1B3A2D] overflow-x-hidden">
      
      {/* 1. TOP TICKER - LIVE PRICE GAPS */}
      <div className="bg-[#1B3A2D] text-[#FAF8F3] py-2 overflow-hidden whitespace-nowrap border-b border-[#C9A96E]/20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="inline-block text-[11px] font-bold uppercase tracking-[0.2em]"
        >
          LIVE PRICE GAPS: Anchor Butter £1.20 difference (Waitrose vs Aldi) • 
          Lurpak 500g £1.55 difference (Tesco vs Lidl) • 
          Sainsbury's Nectar Gap: 22% average saving today • 
          Shrinkflation Alert: Warburtons Toastie size reduced 4% •&nbsp;
        </motion.div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#E8E3D9] bg-[#FAF8F3]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3A2D] font-black text-[#FAF8F3] group-hover:rotate-12 transition-transform">TR</div>
            <span className="text-2xl font-black tracking-tighter text-[#1B3A2D]">TrolleyRoast</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-[#7A7570]">
            <Link href="/receipt-index" className="hover:text-[#1B3A2D] transition-colors">The Index</Link>
            <Link href="/blog" className="hover:text-[#1B3A2D] transition-colors">Deal Guides</Link>
            <Link href="/feedback" className="hover:text-[#1B3A2D] transition-colors">Community</Link>
          </div>
          <a href="https://www.trolleyroast.app" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#C9A96E] hover:text-[#1B3A2D] rounded-full font-black px-8 shadow-lg transition-all active:scale-95">
              ROAST MY RECEIPT
            </Button>
          </a>
        </div>
      </nav>

      {/* 3. HERO: THE AUDITOR UI */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#C9A96E]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-8 border-[#C9A96E] text-[#1B3A2D] bg-[#C9A96E]/20 px-6 py-2 rounded-full font-black text-xs tracking-tighter uppercase">
              UK's Independent Price & Shrinkflation Auditor
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[#1B3A2D] leading-[0.9]">
              STOP PAYING THE<br /><span className="italic text-[#C9A96E]">CONVENIENCE TAX.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#5E5953] mb-16 max-w-3xl mx-auto font-bold leading-tight">
              We audit your entire weekly shop to find the "Loyalty Gaps" and "Stealth Reductions" the big supermarkets don't want you to notice.
            </p>
          </motion.div>

          {/* INTERACTIVE COMPONENT: BASKET BUILDER */}
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#1B3A2D]/5 to-[#C9A96E]/5 rounded-[40px] blur-2xl opacity-50" />
            <div className="relative bg-white border-2 border-[#1B3A2D] rounded-[32px] p-2 shadow-2xl overflow-hidden">
               <div className="bg-[#FAF8F3] rounded-[24px] p-8 border border-[#E8E3D9]">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-[#1B3A2D] flex items-center justify-center text-white"><Zap size={24} fill="currentColor" /></div>
                    <div className="text-left">
                      <h3 className="font-black text-xl leading-none">Instant Basket Audit</h3>
                      <p className="text-sm text-[#7A7570] font-bold">Pick your items to see the current price war.</p>
                    </div>
                 </div>
                 <SavingsEstimator />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE UTILITY BENTO (Functional Use Cases) */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          
          {/* Card 1: THE SCANNER (Primary Lead) */}
          <div className="md:col-span-8 md:row-span-2 relative overflow-hidden rounded-[40px] bg-[#1B3A2D] text-[#FAF8F3] p-12 group cursor-pointer shadow-2xl">
            <div className="absolute -right-20 -bottom-20 p-8 text-[#FAF8F3] opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
              <Scan size={400} strokeWidth={0.5} />
            </div>
            <div className="relative h-full flex flex-col justify-between items-start">
              <div>
                <Badge className="mb-6 bg-[#C9A96E] text-[#1B3A2D] font-black uppercase text-[10px]">Real-Time Auditor</Badge>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.95]">Snap Your Receipt.<br />Expose the Truth.</h2>
                <p className="text-xl text-[#FAF8F3]/60 max-w-lg font-bold leading-tight">Our AI extracts every line item from your physical or digital receipt and prices it across all major UK stores in under 5 seconds.</p>
              </div>
              <a href="https://www.trolleyroast.app" target="_blank" className="inline-flex items-center gap-4 bg-[#C9A96E] text-[#1B3A2D] px-10 py-5 rounded-full font-black text-lg hover:bg-white transition-all">
                LAUNCH RECEIPT ROASTER <Camera size={24} />
              </a>
            </div>
          </div>

          {/* Card 2: SHRINKFLATION ALERT */}
          <div className="md:col-span-4 rounded-[40px] bg-white border-2 border-[#1B3A2D]/5 p-8 relative overflow-hidden shadow-xl hover:border-[#C9A96E]/50 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-[#C9A96E] rounded-2xl text-[#1B3A2D]"><AlertTriangle size={28} /></div>
                <Badge variant="outline" className="border-[#1B3A2D] text-[#1B3A2D] font-black text-[9px] uppercase">Alert</Badge>
             </div>
             <h3 className="text-2xl font-black mb-2 tracking-tighter">Shrinkflation Audit</h3>
             <p className="text-[#5E5953] font-bold text-sm leading-snug">Tracked: 400g bread loaves are now 380g. Click to see the "Stealth List" of items reducing in size this month.</p>
             <button className="mt-8 text-sm font-black underline decoration-2 underline-offset-4 hover:text-[#C9A96E] transition-colors uppercase">View Stealth List</button>
          </div>

          {/* Card 3: LOYALTY GAP */}
          <div className="md:col-span-4 rounded-[40px] bg-[#FAF8F3] border-2 border-[#1B3A2D] p-8 relative overflow-hidden shadow-xl group cursor-pointer hover:bg-white transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-[#1B3A2D] rounded-2xl text-white"><TrendingDown size={28} /></div>
                <Badge variant="outline" className="border-[#1B3A2D] text-[#1B3A2D] font-black text-[9px] uppercase tracking-widest">Savings</Badge>
             </div>
             <h3 className="text-2xl font-black mb-2 tracking-tighter">The Loyalty Gap</h3>
             <p className="text-[#1B3A2D] font-bold text-sm leading-snug">Average UK household pays **£14.20 more per week** just for not having the right app open. See your gap.</p>
             <div className="mt-6 flex gap-2">
                {['Tesco', 'Sainsburys', 'Asda'].map(s => <div key={s} className="h-2 flex-1 bg-[#1B3A2D]/10 rounded-full overflow-hidden"><div className="h-full bg-[#1B3A2D] w-3/4"></div></div>)}
             </div>
          </div>

          {/* Card 4: PRICE HISTORY */}
          <div className="md:col-span-4 rounded-[40px] bg-white border-2 border-[#1B3A2D]/5 p-8 flex flex-col justify-between group shadow-xl hover:border-[#1B3A2D]/30 transition-all">
            <div className="text-[#1B3A2D]/20 group-hover:text-[#1B3A2D] transition-colors"><History size={40} /></div>
            <div>
              <h4 className="font-black text-2xl mb-2 tracking-tighter uppercase">Historical Audit</h4>
              <p className="text-sm text-[#7A7570] font-bold leading-tight italic">"Was it cheaper last Tuesday?"</p>
              <p className="text-xs text-[#1B3A2D] mt-2 font-bold uppercase tracking-widest">6 Million Price Points Tracked</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER (Total Trust) */}
      <footer className="border-t border-[#E8E3D9] py-20 bg-[#FAF8F3] text-[#1B3A2D]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
          <div>
            <h5 className="font-black text-2xl mb-6 tracking-tighter">About TrolleyRoast</h5>
            <p className="text-[#5E5953] font-medium leading-relaxed max-w-sm">
              We are an independent shopping intelligence collective. Our mission is to end price opacity in the UK grocery market through data, AI, and community transparency.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between">
            <div className="flex flex-wrap gap-8 text-sm font-black uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-[#C9A96E] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#C9A96E] transition-colors">Terms of Use</Link>
              <Link href="/feedback" className="hover:text-[#C9A96E] transition-colors">Contact Labs</Link>
            </div>
            <p className="text-[10px] font-black text-[#1B3A2D]/20 uppercase tracking-[0.5em] mt-12">© 2026 TrolleyRoast Labs • Built for the Shopper</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

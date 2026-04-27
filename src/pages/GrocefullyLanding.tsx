import { FC } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

const GrocefullyLanding: FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1B3A2D] font-sans selection:bg-[#C9A96E]/30">
      
      {/* 1. NAVIGATION (TrolleyRoast Classic) */}
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
          <Button size="sm" className="bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full font-bold px-6">
            Start Saving
          </Button>
        </div>
      </nav>

      {/* 2. HERO SECTION (High Density + Warm Palette) */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Warm Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#C9A96E]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 border-[#C9A96E]/30 bg-[#C9A96E]/5 text-[#C9A96E] px-4 py-1.5 rounded-full font-bold tracking-wide uppercase text-[10px]">
              🔥 2,492 shoppers saved £12k this week
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#1B3A2D] leading-[1.05]">
              Groceries are expensive.<br /><span className="text-[#C9A96E]">Let's roast the receipt.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#5E5953] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              TrolleyRoast scans your entire shop and instantly shows you exactly where you overpaid. No manual searching. Just the truth.
            </p>
          </motion.div>

          {/* 3. SEARCH CONTAINER (Sleek + Traditional) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative max-w-2xl mx-auto mb-20"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1B3A2D] to-[#C9A96E] rounded-[28px] opacity-10 blur transition duration-1000 group-hover:opacity-20" />
              <div className="relative flex items-center bg-white border border-[#E8E3D9] rounded-[24px] p-2 pr-4 shadow-xl">
                <div className="pl-4 pr-3 text-[#1B3A2D]/30"><Search size={22} /></div>
                <Input 
                  placeholder="Search item (e.g. 'Wegovy 2.5mg' or 'Anchor Butter')" 
                  className="bg-transparent border-none text-lg h-14 focus-visible:ring-0 placeholder:text-[#1B3A2D]/20 text-[#1B3A2D]"
                />
                <Button className="bg-[#1B3A2D] hover:bg-[#12261E] text-white font-bold h-12 px-8 rounded-2xl shadow-lg transition-transform active:scale-95">
                  Compare
                </Button>
              </div>
            </div>
            
            {/* Quick Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Milk', 'Mounjaro', 'Wegovy', 'Butter', 'Eggs'].map(tag => (
                <button key={tag} className="text-xs font-bold text-[#7A7570] hover:text-[#1B3A2D] hover:bg-[#1B3A2D]/5 border border-[#E8E3D9] bg-white px-4 py-2 rounded-full transition-all uppercase tracking-wider">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. BENTO GRID (The Modern Vibe with Warm Colors) */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          
          {/* Main Bento: Scan Feature */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[32px] bg-white border border-[#E8E3D9] p-8 group shadow-sm">
            <div className="absolute top-0 right-0 p-8 text-[#1B3A2D] opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
              <Camera size={140} strokeWidth={1} />
            </div>
            <div className="relative h-full flex flex-col justify-end">
              <Badge className="w-fit mb-4 bg-[#1B3A2D]/5 text-[#1B3A2D] hover:bg-[#1B3A2D]/10 border-[#1B3A2D]/10 font-bold uppercase tracking-widest text-[10px]">Step 01</Badge>
              <h2 className="text-3xl font-bold mb-4 leading-tight">Snap, Upload, Save.<br />It's that simple.</h2>
              <p className="text-[#5E5953] max-w-xs font-medium">Scan any UK receipt. We extract every item and price across all 8 supermarkets instantly.</p>
            </div>
          </div>

          {/* Bento: Live Price Drop (Gold Accent) */}
          <div className="md:col-span-2 rounded-[32px] bg-white border border-[#C9A96E]/20 p-8 relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-[#C9A96E]/5 pointer-events-none" />
             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-[#1B3A2D] rounded-2xl text-white shadow-lg"><TrendingDown size={24} /></div>
                <Badge variant="outline" className="border-[#C9A96E] text-[#C9A96E] font-bold uppercase tracking-widest text-[9px]">Live Alert</Badge>
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Mounjaro price drop</h3>
                <p className="text-[#1B3A2D] font-bold text-lg">Down to £124.98 at Medino</p>
                <p className="text-xs text-[#7A7570] mt-4 font-bold uppercase tracking-[0.2em]">Saved 42 minutes ago</p>
             </div>
          </div>

          {/* Bento: Trust / Verification */}
          <div className="rounded-[32px] bg-white border border-[#E8E3D9] p-6 flex flex-col justify-between group shadow-sm hover:border-[#1B3A2D]/30 transition-colors">
            <div className="text-[#1B3A2D]/20 group-hover:text-[#1B3A2D] transition-colors"><ShieldCheck size={32} /></div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-[#1B3A2D]">Medical Grade</h4>
              <p className="text-sm text-[#7A7570] font-medium leading-relaxed">Verified by GMC-registered doctors for your health security.</p>
            </div>
          </div>

          {/* Bento: Comparison Speed */}
          <div className="rounded-[32px] bg-white border border-[#E8E3D9] p-6 flex flex-col justify-between group shadow-sm hover:border-[#C9A96E]/30 transition-colors">
            <div className="text-[#1B3A2D]/20 group-hover:text-[#C9A96E] transition-colors"><Zap size={32} /></div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-[#1B3A2D]">Instant Math</h4>
              <p className="text-sm text-[#7A7570] font-medium leading-relaxed">21 items compared in 400ms across 8 major stores.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER (Traditional Trust) */}
      <footer className="border-t border-[#E8E3D9] py-16 bg-[#1B3A2D] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#FAF8F3]/60 text-sm mb-6 font-medium tracking-wide">Built for the UK shopping revolution.</p>
          <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest mb-10">
            <Link href="/privacy" className="hover:text-[#C9A96E] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C9A96E] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</Link>
          </div>
          <div className="h-px w-20 bg-[#C9A96E]/30 mx-auto mb-8" />
          <p className="text-[10px] font-bold text-[#FAF8F3]/40 uppercase tracking-[0.4em]">© 2026 TrolleyRoast Labs</p>
        </div>
      </footer>

    </div>
  );
};

export default GrocefullyLanding;

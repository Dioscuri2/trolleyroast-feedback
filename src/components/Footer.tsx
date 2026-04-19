import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E3D9] py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-sm text-[#9B9790] font-bold font-sans">
        <div className="space-y-2 text-center md:text-left">
          <Link href="/">
            <span className="font-display text-2xl font-bold text-[#1B3A2D] block brand-name cursor-pointer">TrolleyRoast</span>
          </Link>
          <p>The UK's supermarket truth-teller. Free forever.</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A7570]">Part of Olympus Premium Health Limited</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-4 uppercase tracking-widest text-[11px]">
            <Link href="/clean-swap-guide"><span className="text-[#C9A96E] hover:text-[#1B3A2D] cursor-pointer transition-colors font-black">Clean Swap Guide</span></Link>
            <Link href="/receipt-index"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Index</span></Link>
            <Link href="/calculators"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Calculators</span></Link>
            <Link href="/feedback"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Feedback</span></Link>
            <Link href="/pro"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Pro</span></Link>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-[#7A7570]">
            <Link href="/about"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">About</span></Link>
            <Link href="/terms"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Terms</span></Link>
            <Link href="/privacy"><span className="hover:text-[#1B3A2D] cursor-pointer transition-colors">Privacy</span></Link>
          </div>
        </div>
        
        <div className="text-center md:text-right space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em]">© 2026 TrolleyRoast</p>
          <p className="text-[9px] font-medium text-[#B8B4AE]">82A James Carter Road, Mildenhall, IP27 8DE</p>
        </div>
      </div>
    </footer>
  );
}

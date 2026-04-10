import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingDown, ArrowRight, Zap } from "lucide-react";

export default function SavingsEstimator() {
  const [spend, setSpend] = useState<string>("");
  const [estimatedLoss, setEstimatedLoss] = useState<number | null>(null);

  const calculate = () => {
    const amount = parseFloat(spend);
    if (isNaN(amount)) return;
    // Estimated 20% overpayment multiplier based on receipt index data
    setEstimatedLoss(amount * 0.21);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-[#E8E3D9] rounded-[32px] p-8 md:p-12 shadow-trolley">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
          <Zap size={16} className="text-[#C9A96E]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Savings Estimator</span>
      </div>

      <h2 className="font-display text-3xl font-bold text-[#1B3A2D] mb-4">How much are you overpaying?</h2>
      <p className="text-sm text-[#7A7570] font-medium leading-relaxed mb-10">
        Enter your average weekly grocery spend to see an estimate of what you could be losing by not comparing whole-baskets.
      </p>

      {!estimatedLoss ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9B9790] ml-1">Weekly Shop Amount (£)</label>
            <Input
              type="number"
              placeholder="e.g. 85"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              className="h-14 rounded-2xl border-[#E8E3D9] bg-[#FAF8F3] text-xl font-bold text-[#1B3A2D] px-6 focus:ring-[#1B3A2D]"
            />
          </div>
          <Button 
            onClick={calculate}
            className="w-full h-14 bg-[#1B3A2D] text-[#FAF8F3] hover:bg-[#12261E] rounded-full font-bold text-lg active:scale-95 transition-all"
          >
            Calculate My Loss
          </Button>
        </div>
      ) : (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-[#C9A96E] font-bold uppercase tracking-widest text-xs mb-3">Estimated Weekly Overpayment</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingDown className="text-[#1B3A2D]" size={32} />
            <span className="font-display text-6xl font-bold text-[#1B3A2D]">£{estimatedLoss.toFixed(2)}</span>
          </div>
          <p className="text-sm text-[#7A7570] font-medium leading-relaxed mb-8">
            Based on current index data, you could be spending <strong>£{(estimatedLoss * 52).toFixed(0)} more per year</strong> than necessary.
          </p>
          <div className="flex flex-col gap-4">
            <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-12 bg-[#C9A96E] text-[#1B3A2D] hover:bg-[#B8985D] rounded-full font-bold">
                Get the real truth (Scan Free)
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </a>
            <button 
              onClick={() => setEstimatedLoss(null)}
              className="text-xs font-bold text-[#9B9790] hover:text-[#1B3A2D] uppercase tracking-widest"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

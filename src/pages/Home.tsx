import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Star, ChevronRight, Globe, AppWindow, ShieldCheck } from "lucide-react";

// ─── Star Rating Component ───────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2" role="group" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="group p-1 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-full"
            >
              <Star
                size={42}
                className={`transition-all duration-300 drop-shadow-sm ${
                  active
                    ? "fill-[#FFC107] text-[#FFC107] scale-105"
                    : "fill-transparent text-[#E5E7EB] group-hover:text-[#FFC107]/40"
                }`}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm font-bold tracking-tight text-[#4B5563] bg-[#F3F4F6] px-3 py-1 rounded-full min-h-[28px] flex items-center justify-center transition-all font-sans">
        {hovered ? labels[hovered] : value ? labels[value] : "How are we doing?"}
      </span>
    </div>
  );
}

// ─── Thank You Screen ─────────────────────────────────────────────────────────
function ThankYou({ rating, onReset }: { rating: number; onReset: () => void }) {
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      size={24} 
      className={i < rating ? "fill-[#FFC107] text-[#FFC107]" : "text-[#E5E7EB]"} 
      strokeWidth={1.5}
    />
  ));

  return (
    <div className="flex flex-col items-center text-center gap-8 py-12 px-6 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 rounded-full bg-[#E0F2FE] flex items-center justify-center border-4 border-white shadow-lg">
        <CheckCircle2 size={42} className="text-[#0066FF]" strokeWidth={1.5} />
      </div>
      <div className="space-y-3">
        <h2 className="font-display text-4xl font-semibold text-[#111827] tracking-tight">
          Thank you!
        </h2>
        <p className="text-[#4B5563] text-lg font-medium leading-relaxed max-w-sm mx-auto font-sans">
          We genuinely appreciate your time. Your feedback is what builds the future of TrolleyRoast.
        </p>
      </div>
      <div className="flex gap-1.5 p-3 bg-[#F9FAFB] rounded-2xl border border-[#F3F4F6]">
        {stars}
      </div>
      <button
        onClick={onReset}
        className="text-sm font-bold text-[#0066FF] hover:underline underline-offset-8 transition-all font-sans"
      >
        Submit another response
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);

  const submitMutation = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      setSubmittedRating(rating);
      setSubmitted(true);
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    },
  });

  function handleReset() {
    setRating(0);
    setName("");
    setEmail("");
    setComment("");
    setSubmitted(false);
    setSubmittedRating(0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }
    submitMutation.mutate({ rating, name, email, comment });
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#111827]">
      {/* ── Navbar ── */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] font-sans">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl tracking-tighter">T</span>
            </div>
            <span className="text-3xl font-medium text-[#111827] tracking-[-0.03em] font-display">
              TrolleyRoast
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-sm font-semibold text-[#4B5563] hover:text-[#0066FF] transition-colors">How it works</a>
            <a href="#" className="text-sm font-semibold text-[#4B5563] hover:text-[#0066FF] transition-colors">Pricing</a>
            <a href="#" className="text-sm font-semibold text-[#0066FF] flex items-center gap-1">Support <ChevronRight size={14} /></a>
            <Button size="lg" className="bg-[#0066FF] text-white hover:bg-[#0052CC] font-bold rounded-2xl px-7 h-12 shadow-md shadow-blue-500/10 active:scale-95 transition-all font-sans">
              Launch App
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-16 pb-24">
        <div className="w-full max-w-2xl">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/5 text-[#0066FF] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[#0066FF]/10 font-sans">
              <Globe size={14} /> Global Price Index
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold text-[#111827] tracking-[-0.02em] leading-[0.9] font-display">
              Help us shape the<br />future of <span className="text-[#0066FF]">savings.</span>
            </h1>
            <p className="text-xl text-[#4B5563] font-medium leading-relaxed max-w-lg mx-auto font-sans mt-6">
              We're building the fastest supermarket price comparison engine. Tell us how we can make it even better for you.
            </p>
          </div>

          {/* ── Form Card ── */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] overflow-hidden">
            {submitted ? (
              <ThankYou rating={submittedRating} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-0">
                <div className="bg-[#F9FAFB]/50 px-8 py-12 text-center border-b border-gray-100">
                  <h2 className="text-4xl font-semibold text-[#111827] mb-3 tracking-tight font-display">
                    Quick Feedback
                  </h2>
                  <p className="text-[#6B7280] font-bold text-xs mb-8 uppercase tracking-[0.2em] font-sans">
                    Takes less than 30 seconds
                  </p>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                <div className="p-10 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="comment" className="text-sm font-bold text-[#111827] tracking-widest uppercase font-sans">
                      What's on your mind?
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Ideas, bugs, or things you love..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="bg-gray-50/50 border-gray-100 focus:bg-white focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/5 rounded-2xl text-lg font-medium p-5 transition-all min-h-[140px] font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[10px] font-bold text-[#111827] tracking-widest uppercase">
                        Your Name (optional)
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Wick"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#0066FF]/5 rounded-xl px-5 text-base font-semibold"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[10px] font-bold text-[#111827] tracking-widest uppercase">
                        Your Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="wick@high-table.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#0066FF]/5 rounded-xl px-5 text-base font-semibold"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full h-16 text-lg font-bold bg-[#111827] text-white hover:bg-[#0066FF] rounded-2xl transition-all shadow-xl shadow-gray-200 active:scale-[0.98] flex items-center justify-center gap-2 font-sans tracking-widest"
                    >
                      {submitMutation.isPending ? "SENDING..." : "SUBMIT FEEDBACK"}
                      {!submitMutation.isPending && <ChevronRight size={20} />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-2 font-sans">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-green-500" /> Fully Anonymous
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <AppWindow size={14} className="text-blue-500" /> Developer Priority
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ── Proof Points ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 font-sans">
             {[
               { label: "UK Supermarkets", val: "12+" },
               { label: "Price Checks", val: "Hourly" },
               { label: "Development", val: "Active" }
             ].map((stat, i) => (
               <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 text-center shadow-sm">
                 <div className="text-3xl font-semibold text-[#0066FF] tracking-tighter font-display">{stat.val}</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">{stat.label}</div>
               </div>
             ))}
          </div>

          {/* ── Final Footer ── */}
          <footer className="mt-24 text-center font-sans">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">All Systems Operational</span>
            </div>
            <p className="text-xs font-bold text-gray-300 tracking-[0.1em]">
              © 2026 TROLLEYROAST GLOBAL LTD. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

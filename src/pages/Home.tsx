import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Star } from "lucide-react";

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
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1" role="group" aria-label="Star rating">
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
              className="p-1 transition-transform duration-100 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <Star
                size={36}
                className={`transition-colors duration-100 ${
                  active
                    ? "fill-[oklch(72%_0.14_75)] text-[oklch(72%_0.14_75)]"
                    : "fill-transparent text-border"
                }`}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm text-muted-foreground h-5 transition-all">
        {hovered ? labels[hovered] : value ? labels[value] : "Tap to rate"}
      </span>
    </div>
  );
}

// ─── Thank You Screen ─────────────────────────────────────────────────────────
function ThankYou({ rating, onReset }: { rating: number; onReset: () => void }) {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8 px-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2 size={36} className="text-primary" strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold text-primary mb-2">
          Thank you!
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Your feedback helps us make TrolleyRoast better for everyone. We
          genuinely appreciate you taking the time.
        </p>
      </div>
      <div className="text-2xl tracking-widest text-[oklch(72%_0.14_75)]" aria-label={`You rated ${rating} out of 5 stars`}>
        {stars}
      </div>
      <button
        onClick={onReset}
        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
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
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* ── Header ── */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo placeholder - mirroring the blue accent from trolley.co.uk */}
            <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
              TrolleyRoast
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-sm font-semibold text-gray-500 hover:text-[#0066FF] cursor-pointer">Feedback</span>
            <span className="text-sm font-semibold text-gray-500 hover:text-[#0066FF] cursor-pointer">Prices</span>
            <Button size="sm" className="bg-[#0066FF] text-white hover:bg-[#0052CC] font-bold rounded-lg">
              Download App
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12 sm:py-20">
        <div className="w-full max-w-2xl">

          {/* ── Hero Section ── */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A1A] mb-6 tracking-tight">
              Compare Supermarket Prices
            </h1>
            <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-xl mx-auto font-medium">
              We're building the fastest way to save on your weekly shop. 
              Help us refine the experience with your feedback.
            </p>
          </div>

          {/* ── Form Card ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            {submitted ? (
              <ThankYou rating={submittedRating} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Star Rating Section */}
                <div className="px-8 pt-10 pb-8 text-center bg-white">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                    Rate your experience
                  </h2>
                  <p className="text-[#6C757D] mb-8 font-medium">
                    How are we doing? Your rating helps us prioritize features.
                  </p>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Form Fields */}
                <div className="px-8 pb-10 flex flex-col gap-6">
                  {/* Comment */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="comment" className="text-sm font-bold text-[#1A1A1A]">
                      Your feedback
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="What could we improve?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF] rounded-xl text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-sm font-bold text-[#1A1A1A]">
                        Name (optional)
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF] rounded-xl"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-sm font-bold text-[#1A1A1A]">
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-200 focus:border-[#0066FF] focus:ring-[#0066FF] rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full h-14 text-lg font-bold bg-[#0066FF] text-white hover:bg-[#0052CC] rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                  >
                    {submitMutation.isPending ? "Submitting…" : "Send Feedback"}
                  </Button>

                  <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    SECURE & ANONYMOUS
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Quick Stats Section ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
             {[
               { label: "Supermarkets", val: "10+" },
               { label: "Price Checks", val: "Daily" },
               { label: "Cost Savings", val: "Up to 30%" }
             ].map((stat, i) => (
               <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 text-center">
                 <div className="text-xl font-bold text-[#0066FF]">{stat.val}</div>
                 <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
               </div>
             ))}
          </div>

          {/* ── Footer ── */}
          <footer className="mt-16 text-center border-t border-gray-200 pt-8">
            <p className="text-sm font-semibold text-gray-500">
              © 2026 TrolleyRoast. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

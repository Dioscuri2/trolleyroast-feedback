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
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          {/* Wordmark */}
          <span className="font-display text-2xl font-semibold text-primary tracking-tight leading-none">
            TrolleyRoast
          </span>
          <span className="text-border">|</span>
          <span className="text-sm text-muted-foreground font-medium">Feedback</span>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">

          {/* ── App Context Banner ── */}
          <div className="bg-primary text-primary-foreground rounded-xl p-5 mb-8 shadow-sm">
            <h1 className="font-display text-xl sm:text-2xl font-semibold mb-1 leading-snug">
              What does your shop really cost?
            </h1>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              TrolleyRoast scans your supermarket receipt and instantly shows
              what the same basket costs at Tesco, Asda, Sainsbury's, Morrisons,
              Aldi, and Lidl — completely free. We're in early development and
              your feedback shapes what we build next.
            </p>
          </div>

          {/* ── Card ── */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {submitted ? (
              <ThankYou rating={submittedRating} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Star Rating Section */}
                <div className="px-6 pt-7 pb-5 border-b border-border/60 text-center">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
                    Share your experience
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    How would you rate TrolleyRoast overall?
                  </p>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Form Fields */}
                <div className="px-6 py-5 flex flex-col gap-4">
                  {/* Comment */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="comment" className="text-sm font-medium">
                      Your thoughts{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="What's working well? What could be better? Any features you'd love to see?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      maxLength={5000}
                      className="resize-none bg-background text-sm leading-relaxed placeholder:text-muted-foreground/60"
                    />
                    {comment.length > 4800 && (
                      <p className="text-xs text-muted-foreground text-right">
                        {5000 - comment.length} characters remaining
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 text-muted-foreground/50">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs uppercase tracking-widest">About you</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={255}
                      className="bg-background text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={320}
                      className="bg-background text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Only used if we need to follow up on your feedback.
                    </p>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full mt-1 h-11 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {submitMutation.isPending ? "Submitting…" : "Submit Feedback"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground pb-1">
                    Your feedback is anonymous unless you provide your name or email.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Footer ── */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Built with care by the TrolleyRoast team &middot;{" "}
            <a
              href="https://trolley-roast.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Try the app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

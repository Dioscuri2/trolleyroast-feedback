import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Star, ArrowLeft } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";

const SUPABASE_ENDPOINT =
  "https://czmvyblgviwgczfzxhsr.supabase.co/functions/v1/submit-feedback";

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
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
                className="transition-colors duration-100"
                style={{
                  fill: active ? "#C9A96E" : "transparent",
                  color: active ? "#C9A96E" : "#D4CFC6",
                }}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm h-5 transition-all" style={{ color: "#9B9790" }}>
        {hovered ? labels[hovered] : value ? labels[value] : "Tap to rate"}
      </span>
    </div>
  );
}

// ─── Thank You ────────────────────────────────────────────────────────────────
function ThankYou({ rating, onReset }: { rating: number; onReset: () => void }) {
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  return (
    <div className="flex flex-col items-center text-center gap-6 py-10 px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "rgba(27,58,45,0.08)" }}
      >
        <CheckCircle2 size={36} style={{ color: "#1B3A2D" }} strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold mb-2" style={{ color: "#1B3A2D" }}>
          Thank you!
        </h2>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#6B6860" }}>
          Your feedback helps us make TrolleyRoast better for everyone. We genuinely appreciate you taking the time.
        </p>
      </div>
      <div
        className="text-2xl tracking-widest"
        style={{ color: "#C9A96E" }}
        aria-label={`You rated ${rating} out of 5 stars`}
      >
        {stars}
      </div>
      <button
        onClick={onReset}
        className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
        style={{ color: "#9B9790" }}
      >
        Submit another response
      </button>
    </div>
  );
}

// ─── Main Feedback Page ───────────────────────────────────────────────────────
export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);

  function handleReset() {
    setRating(0);
    setName("");
    setEmail("");
    setComment("");
    setSubmitted(false);
    setSubmittedRating(0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(SUPABASE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          feedback_text: comment,
          name: name || null,
          email: email || null,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setSubmittedRating(rating);
      setSubmitted(true);
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.error(
        "We couldn't send your feedback right now. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F3" }}>
      <RouteSeo
        title="Send Feedback | TrolleyRoast"
        description="Share feedback on the TrolleyRoast website and app experience. Help shape a receipt-led supermarket comparison product built around whole-basket truth."
        path="/feedback"
      />
      {/* Header */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          background: "rgba(250,248,243,0.9)",
          backdropFilter: "blur(8px)",
          borderColor: "#E8E2D6",
        }}
      >
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <button
              className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity"
              style={{ color: "#6B6860" }}
            >
              <ArrowLeft size={15} />
              Back
            </button>
          </Link>
          <span style={{ color: "#D4CFC6" }}>|</span>
          <span className="font-display text-xl font-semibold" style={{ color: "#1B3A2D" }}>
            TrolleyRoast
          </span>
          <span style={{ color: "#D4CFC6" }}>·</span>
          <span className="text-sm font-medium" style={{ color: "#9B9790" }}>
            Feedback
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          {/* Context banner */}
          <div className="rounded-xl p-5 mb-7" style={{ background: "#1B3A2D" }}>
            <h1
              className="font-display text-xl sm:text-2xl font-semibold mb-1 leading-snug"
              style={{ color: "#FAF8F3" }}
            >
              What does your shop really cost?
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,248,243,0.75)" }}>
              TrolleyRoast scans your receipt and instantly shows what the same basket costs at
              Tesco, Asda, Sainsbury's, Morrisons, Aldi, Lidl, Waitrose, and Co-op — free.
              We're in early development and your feedback shapes what we build next.
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#FFFFFF", border: "1px solid #E8E2D6" }}
          >
            {submitted ? (
              <ThankYou rating={submittedRating} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Star section */}
                <div
                  className="px-6 pt-7 pb-5 text-center"
                  style={{ borderBottom: "1px solid #E8E2D6" }}
                >
                  <h2
                    className="font-display text-2xl font-semibold mb-1"
                    style={{ color: "#1C1A17" }}
                  >
                    Share your experience
                  </h2>
                  <p className="text-sm mb-5" style={{ color: "#9B9790" }}>
                    How would you rate TrolleyRoast overall?
                  </p>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Fields */}
                <div className="px-6 py-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="comment"
                      className="text-sm font-medium"
                      style={{ color: "#1C1A17" }}
                    >
                      Your thoughts{" "}
                      <span className="font-normal" style={{ color: "#9B9790" }}>
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="What's working well? What could be better? Any features you'd love to see?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      maxLength={5000}
                      className="resize-none text-sm leading-relaxed"
                      style={{ background: "#FAF8F3", borderColor: "#D4CFC6" }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ background: "#E8E2D6" }} />
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "#9B9790" }}
                    >
                      About you
                    </span>
                    <div className="flex-1 h-px" style={{ background: "#E8E2D6" }} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium"
                      style={{ color: "#1C1A17" }}
                    >
                      Name{" "}
                      <span className="font-normal" style={{ color: "#9B9790" }}>
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={255}
                      className="text-sm"
                      style={{ background: "#FAF8F3", borderColor: "#D4CFC6" }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium"
                      style={{ color: "#1C1A17" }}
                    >
                      Email{" "}
                      <span className="font-normal" style={{ color: "#9B9790" }}>
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={320}
                      className="text-sm"
                      style={{ background: "#FAF8F3", borderColor: "#D4CFC6" }}
                    />
                    <p className="text-xs" style={{ color: "#9B9790" }}>
                      Only used if we need to follow up on your feedback.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-1 h-11 text-sm font-semibold"
                    style={{ background: "#1B3A2D", color: "#FAF8F3" }}
                  >
                    {submitting ? "Submitting…" : "Submit Feedback"}
                  </Button>

                  <p className="text-center text-xs pb-1" style={{ color: "#9B9790" }}>
                    Your feedback is anonymous unless you provide your name or email.
                  </p>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "#9B9790" }}>
            Built with care by the TrolleyRoast team ·{" "}
            <a
              href="https://www.trolleyroast.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Try the app
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

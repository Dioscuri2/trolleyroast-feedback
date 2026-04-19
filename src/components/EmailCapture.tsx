import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

interface EmailCaptureProps {
  source?: string;
  /** When true, renders a light variant suitable for dark backgrounds */
  light?: boolean;
}

export default function EmailCapture({ source = "landing", light = false }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setIsPending(true);
    try {
      // Direct call to our Vercel API handler (Brevo + Supabase)
      const response = await fetch("/api/calculator-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          calculator: source,
          // Sending a minimal default payload since this is a simple capture
          payload: {
            householdSize: "1",
            weeklySpend: 100,
            currentStore: "tesco",
            shoppingStyle: "balanced",
            categories: ["fresh-produce"]
          }
        }),
      });

      if (!response.ok) throw new Error("Failed to capture email");

      setDone(true);
      toast.success("You're on the list!");
    } catch (error) {
      console.error("Email capture error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  if (done) {
    return (
      <div
        className="flex items-center gap-2 justify-center text-sm font-medium"
        style={{ color: light ? "#C9A96E" : "#1B3A2D" }}
      >
        <CheckCircle2 size={18} />
        <span>You're on the list — we'll be in touch!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto"
    >
      <Input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-12 text-sm"
        disabled={isPending}
        style={
          light
            ? { background: "rgba(250,248,243,0.12)", borderColor: "rgba(250,248,243,0.25)", color: "#FAF8F3" }
            : { background: "#FFFFFF", borderColor: "#E8E3D9" }
        }
      />
      <Button
        type="submit"
        disabled={isPending}
        className="h-12 px-6 text-sm font-semibold whitespace-nowrap"
        style={
          light
            ? { background: "#C9A96E", color: "#1B3A2D" }
            : { background: "#1B3A2D", color: "#FAF8F3" }
        }
      >
        {isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
        {isPending ? "Joining…" : "Get Early Access"}
      </Button>
    </form>
  );
}

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface EmailCaptureProps {
  source?: "landing" | "pro";
  /** When true, renders a light variant suitable for dark backgrounds */
  light?: boolean;
}

export default function EmailCapture({ source = "landing", light = false }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const capture = trpc.email.capture.useMutation({
    onSuccess: () => {
      setDone(true);
      toast.success("You're on the list!");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

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
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        capture.mutate({ email, source });
      }}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto"
    >
      <Input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-12 text-sm"
        style={
          light
            ? { background: "rgba(250,248,243,0.12)", borderColor: "rgba(250,248,243,0.25)", color: "#FAF8F3" }
            : { background: "#FFFFFF", borderColor: "#E8E3D9" }
        }
      />
      <Button
        type="submit"
        disabled={capture.isPending}
        className="h-12 px-6 text-sm font-semibold whitespace-nowrap"
        style={
          light
            ? { background: "#C9A96E", color: "#1B3A2D" }
            : { background: "#1B3A2D", color: "#FAF8F3" }
        }
      >
        {capture.isPending ? "Joining…" : "Get Early Access"}
      </Button>
    </form>
  );
}

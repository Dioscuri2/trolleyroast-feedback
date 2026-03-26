import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      colors: {
        border: "#E8E3D9",
        input: "#E8E3D9",
        ring: "#1B3A2D",
        background: "#FAF8F3",
        foreground: "#1C1A17",
        primary: {
          DEFAULT: "#1B3A2D",
          foreground: "#FAF8F3",
        },
        secondary: {
          DEFAULT: "#C9A96E",
          foreground: "#1B3A2D",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#7A7570",
          foreground: "#1C1A17",
        },
        accent: {
          DEFAULT: "#C9A96E",
          foreground: "#1B3A2D",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C1A17",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C1A17",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        'trolley': '0 10px 40px -10px rgba(27, 58, 45, 0.05), 0 2px 20px -5px rgba(0, 0, 0, 0.02)',
        'trolley-hover': '0 20px 50px -12px rgba(27, 58, 45, 0.08), 0 4px 25px -5px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;

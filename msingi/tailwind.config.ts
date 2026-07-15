import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────
// MSINGI DESIGN SYSTEM
// Brand: Black · White · Burnt Red · Charcoal · Warm Ivory · Gold
// Typography: Elegant, modern, editorial — African luxury,
// never childish-educational. Think Apple × Notion × The Economist.
// ─────────────────────────────────────────────────────────

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand
        ink: {
          DEFAULT: "#0B0A08",   // near-black, primary text/bg
          900: "#0B0A08",
          800: "#14120D",
          700: "#1E1B14",
        },
        charcoal: {
          DEFAULT: "#2A2620",
          600: "#3A352C",
          500: "#4A443A",
        },
        ivory: {
          DEFAULT: "#F7F2E9",   // warm ivory — primary light bg
          soft: "#EFE8D8",
          muted: "#E2D8C2",
        },
        burnt: {
          DEFAULT: "#A6371F",   // burnt red — primary accent
          600: "#8C2E19",
          700: "#732513",
          500: "#B84226",
          400: "#C85A3D",
        },
        gold: {
          DEFAULT: "#C79A3C",   // gold accent
          600: "#AD8330",
          500: "#D6AE55",
          400: "#E3C077",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        // Editorial serif for headings — set via next/font in layout.tsx
        display: ["var(--font-display)", "Georgia", "serif"],
        // Clean grotesk for body/UI — set via next/font in layout.tsx
        sans: ["var(--font-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,10,8,0.06), 0 8px 24px rgba(11,10,8,0.06)",
        raised: "0 2px 8px rgba(11,10,8,0.10), 0 16px 40px rgba(11,10,8,0.10)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;

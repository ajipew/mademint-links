import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "btn-bg": "var(--color-btn-bg)",
        "btn-text": "var(--color-btn-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        headline: ["var(--font-headline)"],
        secondary: ["var(--font-secondary)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        theme: "var(--radius)",
      },
      maxWidth: {
        card: "560px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

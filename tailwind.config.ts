import type { Config } from "tailwindcss";

/**
 * The palette is locked. Five ink-and-paper tones plus two tape values.
 * If you are reaching for a colour that is not in this file, the answer is
 * usually "use ink at a lower opacity".
 */
const config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    // Not `extend` — replacing the default palette so no stray tailwind blue
    // can ever creep in.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      paper: "#F4EFE6",
      "paper-warm": "#EDE5D6",
      "paper-shadow": "#E0D5C2",
      ink: "#2B211A",
      "ink-soft": "#5C4F43",
      accent: "#D96B2B",
      "accent-soft": "#E8955C",
      tape: "rgba(217, 201, 163, 0.7)",
    },
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "3px",
      md: "4px",
      lg: "6px",
      full: "9999px",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-courier)", "ui-monospace", "monospace"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      fontSize: {
        hero: ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05" }],
        section: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05" }],
        caption: ["0.85rem", { lineHeight: "1.6" }],
      },
      maxWidth: {
        measure: "62ch",
      },
      spacing: {
        // Section rhythm: 160 desktop / 96 mobile.
        rhythm: "96px",
        "rhythm-lg": "160px",
      },
      boxShadow: {
        // Hard offset, zero blur. Never a soft drop shadow.
        paper: "2px 3px 0 #E0D5C2",
        "paper-lg": "3px 4px 0 #E0D5C2",
        "paper-ink": "3px 4px 0 rgba(43, 33, 26, 0.18)",
      },
      transitionTimingFunction: {
        panel: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

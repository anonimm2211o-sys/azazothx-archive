import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#05040A",
        abyss: "#0B0912",
        panel: "#100D1C",
        edge: "#221A38",
        neon: {
          DEFAULT: "#B14CFF",
          soft: "#9B6BFF",
          bright: "#D9A8FF",
          dim: "#5C3B8C",
        },
        ember: "#FF5C8A",
        mist: "#8B85A6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(177, 76, 255, 0.45)",
        "glow-sm": "0 0 20px -6px rgba(177, 76, 255, 0.35)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(177,76,255,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,92,138,0.08), transparent 35%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "rgb(var(--color-blush) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        nude: "rgb(var(--color-nude) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        plum: "rgb(var(--color-plum) / <alpha-value>)"
      },
      boxShadow: {
        soft: "0 20px 45px -28px rgba(156, 82, 113, 0.55)",
        card: "0 12px 30px -20px rgba(42, 18, 30, 0.35)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top right, rgba(255, 216, 232, 0.5), transparent 55%)",
        "rose-mist": "linear-gradient(160deg, #fff6fa 0%, #fde7ef 46%, #fff4eb 100%)"
      }
    }
  },
  plugins: []
};

export default config;

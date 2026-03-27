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
        soft: "0 24px 56px -30px rgba(171, 92, 129, 0.4)",
        card: "0 18px 44px -28px rgba(99, 55, 75, 0.28)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top right, rgba(248, 204, 223, 0.52), transparent 55%)",
        "rose-mist": "linear-gradient(160deg, #fff7fb 0%, #fde8f1 44%, #fff8fb 100%)"
      }
    }
  },
  plugins: []
};

export default config;

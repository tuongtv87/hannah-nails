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
        soft: "0 24px 56px -30px rgba(94, 62, 133, 0.45)",
        card: "0 18px 44px -28px rgba(52, 33, 82, 0.3)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top right, rgba(214, 194, 255, 0.55), transparent 55%)",
        "rose-mist": "linear-gradient(160deg, #f7f3ff 0%, #ede3ff 44%, #fcf7ff 100%)"
      }
    }
  },
  plugins: []
};

export default config;

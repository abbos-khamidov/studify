import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          active: "var(--brand-active)",
          light: "var(--brand-light)",
          subtle: "var(--brand-subtle)",
        },
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          dark: "var(--bg-dark)",
          brand: "var(--brand)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          "on-brand": "var(--text-on-brand)",
          "on-dark": "var(--text-on-dark)",
        },
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
        },
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        brand: "var(--shadow-brand)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(from|to)-(rose|red|amber|blue|teal|indigo)-(100|200)/,
    },
  ],
};
export default config;

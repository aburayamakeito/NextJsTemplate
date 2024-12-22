import type { Config } from "tailwindcss";
import * as defaultTheme from "tailwindcss/defaultTheme"
import * as colors from "tailwindcss/colors"
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", "1"],
      "7xl": ["4.5rem", "1.1"],
      "8xl": ["6rem", "1"],
      "9xl": ["8rem", "1"],
    },
    fontFamily: {
      display: ["Epilogue", ...defaultTheme.fontFamily.sans],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
    },
    colors: {
      black: colors.black,
      lime: colors.lime,
      white: colors.white,
      transparent: colors.transparent,

      brown: {
        50: "#f8f7f8",
        100: "#f0eef0",
        200: "#ded9de",
        300: "#c1b8c1",
        400: "#9e919f",
        500: "#827483",
        600: "#6a5e6b",
        700: "#584c58",
        800: "#4a424a",
        900: "#423b42",
        950: "#2b262b",
      },
      green: {
        50: "#f6f7f6",
        100: "#e2e5e2",
        200: "#c4cbc4",
        300: "#9fa99f",
        400: "#818d81",
        500: "#606c61",
        600: "#4b564b",
        700: "#3f4640",
        800: "#353a36",
        900: "#2e332e",
        950: "#181b18",
      },
      yellow: {
        50: "#fbf6ef",
        100: "#f3e4d2",
        200: "#e6c7a1",
        300: "#d8a771",
        400: "#ce8a4b",
        500: "#c5713b",
        600: "#ae5631",
        700: "#91402c",
        800: "#773429",
        900: "#632c24",
        950: "#381410",
      },
      pink: {
        50: "#fbf5f6",
        100: "#f8ebed",
        200: "#f2d9df",
        300: "#e6bbc5",
        400: "#d894a5",
        500: "#c8728a",
        600: "#af4f6e",
        700: "#923e5b",
        800: "#7b3650",
        900: "#6a3148",
        950: "#3a1725",
      },
    },
    extend: {
      animation: {
        marquee: "marquee 12s linear infinite",
        rightMarquee: "rightMarquee 300s linear infinite",
        slowMarquee: "marquee 300s linear infinite",
        verticalMarquee: "vertical 30s linear infinite",

      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        vertical: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        rightMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    typography,
    forms,
  ],
} satisfies Config;

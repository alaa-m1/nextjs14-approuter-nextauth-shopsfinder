import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionProperty: {
        drawer: "margin",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        light: {
          bg: "#f4f0f0",
          card: "#e3e1e1",
          text: "#000",
          label: "#0a2a4b",
          primary: "#1976d2",
          secondary: "#ba68c8",
          error: "#ef5350",
          warning: "#ff9800",
          info: "#03a9f4",
          success: "#4caf50",
        },
        dark: {
          bg: "#171717",
          card: "#303030",
          text: "#fff",
          label: "#144e87",
          primary: "#1565c0",
          secondary: "#7b1fa2",
          error: "#c62828",
          warning: "#e65100",
          info: "#01579b",
          success: "#1b5e20",
        },
      },
    },

    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

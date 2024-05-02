/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["var(--font-exo2)", "sans-serif"],
      orbitron: ["var(--font-orbitron)", "sans-serif"],
    },
  },
};
export const plugins = [require("@tailwindcss/typography")];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./config/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["JakartaMedium"],
        semibold: ["JakartaSemiBold"],
        bold: ["JakartaBold"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.03)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.04)",
        md: "0 2px 6px rgba(0,0,0,0.05)",
        lg: "0 4px 12px rgba(0,0,0,0.06)",
        xl: "0 8px 20px rgba(0,0,0,0.07)",
        "2xl": "0 12px 28px rgba(0,0,0,0.08)",
        none: "none",
      },
    },
  },
  plugins: [],
};

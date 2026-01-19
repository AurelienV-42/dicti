// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./config/colors");
const twColors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      ...twColors,
      ...colors,
    },
    extend: {
      fontFamily: {
        sans: ["JakartaMedium"],
        semibold: ["JakartaSemiBold"],
        bold: ["JakartaBold"],
      },
    },
  },
  plugins: [],
};

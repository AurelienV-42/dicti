// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./config/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
};

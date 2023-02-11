/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#447DA6",
        secondary: "#141414",
        tertiary: "#595959",
      },
      fontFamily: {
        serif: ["'EB Garamond'", "serif"],
        mono: ["'Firacode'", "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};

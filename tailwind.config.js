/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1d2021",
        panel: "#282828",
        border: "#3c3836",

        text: {
          primary: "#ebdbb2",
          secondary: "#d5c4a1",
          muted: "#a89984",
        },

        accent: "#b8bb26",
        yellow: "#fabd2f",
        orange: "#fe8019",
        red: "#fb4934",
        blue: "#83a598",
        purple: "#d3869b",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Ru: "#ffe5d6",
        Mu: "#f65306",
        Sky: "#b8fee3",
        Purple: "#e3b8fe",
      },
      fontSize: {
        "title-sm": "2.2rem",
        "title-base": "2.4rem",
        "title-lg": "2.6rem",
        "title-xl": "2.8rem",
      },
      padding: {
        Header: "5vw",
        Nav: "5vw",
        PageLR: "2vh 5vw",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, display: "hidden" },
          "100%": { opacity: 1, display: "flex" },
        },
        "fade-out": {
          "0%": { opacity: 1, display: "flex" },
          "100%": { opacity: 0, display: "hidden" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out ",
        "fade-out": "fade-out 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

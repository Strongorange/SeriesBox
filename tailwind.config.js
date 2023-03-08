/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        header: "10",
        "bottom-nav": "10",
        "selecting-bottom-nav": "110",
        modal: "120",
        "modal-backdrop": "120",
        "modal-content": "130",
        "initial-video": "200",
      },
      colors: {
        Ru: "#ffe5d6",
        Primary: "#ccaa4b",
        Secondary: "#fbf9f5",
        Accent: "#bb4935",
      },
      fontSize: {
        "title-sm": "2.2rem",
        "title-base": "2.4rem",
        "title-lg": "2.6rem",
        "title-xl": "2.8rem",
      },
      padding: {
        Header: "5vw",
        HeaderPc: "2vh 5vw",
        Nav: "5vw",
        BottomPadding: "13vh",
        PageLR: "2vh 5vw",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, visibility: "hidden" },
          "100%": { opacity: 1, visibility: "visible" },
        },
        "fade-in-photo": {
          "0%": { opacity: 0, scale: "0.5", display: "none" },
          "100%": { opacity: 1, scale: "1", display: "flex" },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": {
            opacity: 0,
            visibility: "hidden",
            "pointer-events": "none",
          },
        },
        "selecting-bottom-nav": {
          "0%": {
            opacity: 0,
            transform: "translateY(20%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "selecting-bottom-nav-reverse": {
          "0%": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(100%)",
            display: "none",
          },
        },
      },
      animation: {
        // 페이지 페이드 인 아웃
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "fade-out": "fade-out 0.5s ease-in-out forwards",

        // 사진 순서대로 보여주기
        "fade-in-photo": "fade-in-photo 1s ease-in-out",

        "fade-out-photo": "fade-out 0.5s ease-in-out forwards",
        "selecting-bottom-nav":
          "selecting-bottom-nav 0.5s ease-in-out forwards",
        "selecting-bottom-nav-reverse":
          "selecting-bottom-nav-reverse 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

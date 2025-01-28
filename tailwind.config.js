/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      backgroundImage: {
        pattern: "url('/image/bg.jpg')",
      },

      fontFamily: {
        Inter: ['"Inter", serif'],
      },

      colors: {
        customGreen: "#041219",
        customGreenLight: "#1E2B31",
        customMint: "#1ADE9D",
        customYellow: "#FFCC00",
        customGray: "#797979",
        customGrayLight: "#D9D9D9"
      },

      fontSize: {
        h1: ["24px"],
        "h1-md": ["28px"],
        "h1-lg": ["34px"],
        h2: ["20px"],
        "h2-lg": ["24px"],
        h3: ["16px", { lineHeight: "1.5" }],
        "h3-lg": ["18px", { lineHeight: "1.5" }],
        p: ["14px", { lineHeight: "1.5" }],
        "p-lg": ["16px", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        h1: {
          "@apply font-Inter font-semibold text-h1 text-white": {},
          "@screen md": {
            "@apply text-h1-md": {},
          },
          "@screen lg": {
            "@apply text-h1-lg": {},
          },
        },
        h2: {
          "@apply font-Inter font-[500] text-h2 text-white": {},
          "@screen lg": {
            "@apply text-h2-lg": {},
          },
        },
        h3: {
          "@apply font-Inter text-h3 text-white font-[400]": {},
          "@screen lg": {
            "@apply text-h3-lg": {},
          },
        },
        p: {
          "@apply font-Inter font-[350] text-p text-white": {},
          "@screen lg": {
            "@apply text-p-lg": {},
          },
        },
      });
    },
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost", sans-serif'],
        kantumruy: ['"Kantumruy", sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        
        'h2': {
          "@apply font-jost": {},
        },
        'p': {
          "@apply font-kantumruy font-light": {},
        },
      });
    },
  ],
};

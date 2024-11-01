/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      screens: {
        'sm': '640px',   
        'md': '768px',   
        'lg': '1024px',  
        'xl': '1280px',  
        '2xl': '1536px', 
        
      },

      fontFamily: {
        jost: ['"Jost", sans-serif'],
        kantumruy: ['"Kantumruy", sans-serif'],
      },

      fontSize: {
        'h1': ['20px'],
        'h1-lg': ['40px'], 
        'h2': ['15px'],
        'h2-lg': ['24px'],
        'h3': ['12px', { lineHeight: '1.5' }],
        'h3-lg': ['20px', { lineHeight: '1.5' }],
        'p': ['12px', { lineHeight: '1.5' }],
        'p-lg': ['18px', { lineHeight: '1.5' }],
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        
        'h1': {
          "@apply font-jost font-semibold text-h1": {},
          '@screen md': {
            '@apply text-h1-lg': {},
          },
        },
        'h2': {
          "@apply font-jost font-normal text-h2": {},
          '@screen lg': {
            '@apply text-h2-lg': {},
          },
        },
        'h3': {
          "@apply font-jost text-h3": {},
          '@screen lg': {
            '@apply text-h3-lg': {},
          },
        },
        'p': {
          "@apply font-kantumruy font-light text-p": {},
          '@screen lg': {
            '@apply text-p-lg': {},
          },
        },
      });
    },
  ],
};

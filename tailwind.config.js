/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/api/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey-main": "#eaeaea",
        "grey-dark": "#c9c9c9",
        "dark-bg": "rgba(30,30,30,0.75)",
        "dark-bg-2": "rgba(0,0,0,0.75)",
        "white": "#fff",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        "spin": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      },
      animation: {
        "spin": "spin 1s infinite linear",
      }
    },
  },
  plugins: [],
};

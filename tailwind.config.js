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
        nunito: ['var(--font-nunitoSans)', 'sans-serif']
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
      },
      screens: {
        "xs": "320px",
        "sm": "640px",
        "md": "800px",
        "lg": "1024px",
        "xl": "1366px",
        "2xl": "1920px",
        "3xl": "2560px",
        "max-xl": {"max": "1366px"},
        "max-lg": {"max": "1024px"},
        "max-md": {"max": "800px"},
        "max-xs": {"max": "640px"},
        "between-lg-xl": {"min": "1024px", "max": "1366px"},
        "between-md-lg": {"min": "800px", "max": "1024px"},
      },
    },
  },
  plugins: [],
};

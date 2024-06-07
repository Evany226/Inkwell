/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      screens: {
        xs: { max: "639px" },

        sm: { max: "768px" },
        // => @media (min-width: 640px) { ... }

        md: { max: "1024px" },
        // => @media (min-width: 768px) { ... }

        lg: { max: "1280px" },
        // => @media (min-width: 1024px) { ... }

        xl: { max: "1536px" },
        // => @media (min-width: 1280px) { ... }

        "2xl": "1537px",
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        DancingScript: ["Dancing Script", "cursive"],
      },
      colors: {
        google: {
          "text-gray": "#3c4043",
          "button-blue": "#1a73e8",
          "button-blue-hover": "#5195ee",
          "button-dark": "#202124",
          "button-dark-hover": "#555658",
          "button-border-light": "#dadce0",
          "logo-blue": "#4285f4",
          "logo-green": "#34a853",
          "logo-yellow": "#fbbc05",
          "logo-red": "#ea4335",
        },
      },
    },
  },
  plugins: [],
};

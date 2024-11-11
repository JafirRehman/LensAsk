/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ourred: {
          50: "#fff0f3",
          100: "#ffe3e8",
          200: "#ffcbd7",
          300: "#ffa0b7",
          400: "#ff6b92",
          500: "#fc376f",
          600: "#eb1e62",
          700: "#c50b4d",
          800: "#a50c47",
          900: "#8d0e43",
          950: "#4f0221",
        },
      },
      screens: {
        mobile: "425px",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 45s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [import("daisyui")],
};

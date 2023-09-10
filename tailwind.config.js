/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5ed1ff",
          secondary: "#9441d3",
          accent: "#e09f67",
          neutral: "#29232e",
          "base-100": "#ffffff",
          info: "#6eb9f2",
          success: "#108467",
          warning: "#fcd75f",
          error: "#f31b3f",
        },
      },
      "light",
      "dark",
      "corporate",
    ],
  },
};

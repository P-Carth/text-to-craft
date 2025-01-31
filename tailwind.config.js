/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        vt: ["VT323", "monospace"], // Add your font name here
      },
      boxShadow: {
        "inset-craft": "inset 0 0 8px rgba(0,0,0,0.3)",
      },
      textShadow: {
        craft: "2px 2px 0 #4a3a23",
      },
    },
  },
  plugins: [],
};

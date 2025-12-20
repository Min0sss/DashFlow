/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {

        bgLight: "#f8fafc",
        bgDark: "#0f0f0f",      

        cardLight: "#ffffff",
        cardDark: "#1a1a1a",    

        textLight: "#0f172a",
        textDark: "#f5f5f5",   
        textMuted: "#9ca3af",   

        primary: "#f97316", 
        primaryHover: "#ea580c", 
      },
    },
  },
  plugins: [],
};
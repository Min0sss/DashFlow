/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",       
        primaryHover: "#ea580c",
        
       
        bgDark: "#09090b", 
        cardDark: "#18181b", 
        textDark: "#f4f4f5",     
        textMuted: "#a1a1aa",    
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(249, 115, 22, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
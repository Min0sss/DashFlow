/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Fondos
        bgLight: "#f8fafc",
        bgDark: "#0f0f0f",      // Negro carbón profundo

        // Tarjetas y componentes
        cardLight: "#ffffff",
        cardDark: "#1a1a1a",    // Gris oscuro para que resalte sobre el fondo

        // Textos
        textLight: "#0f172a",
        textDark: "#f5f5f5",    // Blanco suave (no puro para no cansar la vista)
        textMuted: "#9ca3af",   // Gris para textos secundarios

        // Color de Acento (Naranja / Ámbar)
        primary: "#f97316",     // Naranja vibrante
        primaryHover: "#ea580c", // Naranja un poco más oscuro para el hover
      },
    },
  },
  plugins: [],
};
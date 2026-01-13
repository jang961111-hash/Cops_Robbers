/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f9ff",
          100: "#e6f1ff",
          200: "#c4ddff",
          300: "#99c3ff",
          400: "#6ca7ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a"
        }
      },
      boxShadow: {
        card: "0 12px 30px -18px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};

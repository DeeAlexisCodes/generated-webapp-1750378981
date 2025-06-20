// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust path to your source files
  ],
  theme: {
    extend: {
      // Define custom colors based on your design system
      colors: {
        primary: '#FF6B00',
        secondary: '#555',
        accent: '#FF6B00', // Assuming accent is the same as primary for hover states
        text: '#121212',
        background: '#F8F9FA',
      },
      // Define custom font families
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Assuming 'Inter' is available via CSS import or similar
      },
      // You can add custom spacing, typography scales here if needed beyond Tailwind's defaults
    },
  },
  plugins: [],
};
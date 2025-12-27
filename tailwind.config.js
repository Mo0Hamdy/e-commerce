/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px", // موبايل صغير
      sm: "640px", // موبايل
      md: "768px", // تابلت
      lg: "1024px", // لابتوب
      xl: "1280px", // شاشة كبيرة
      "2xl": "1536px",
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1140px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};

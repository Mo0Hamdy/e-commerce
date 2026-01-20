/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: '#2D3748',  // اللون الأساسي
            dark: '#1A202C',     // للـ hover
            light: '#4A5568',    // للـ disabled
          },
          secondary: {
            DEFAULT: '#E53E3E',  // اللون الثانوي
            dark: '#C53030',     // للـ hover
            light: '#FC8181',    // للـ backgrounds
          },
          accent: {
            DEFAULT: '#F6AD55',  // لون التمييز
            dark: '#ED8936',     // للـ hover
            light: '#FBD38D',    // للـ highlights
          },
        
        
        // Background Colors
        background: {
          DEFAULT: '#F7FAFC',  // الخلفية الرئيسية
          dark: '#EDF2F7',     // خلفية أغمق شوية
          white: '#FFFFFF',    // للكروت
        },
        
        // Text Colors
        text: {
          DEFAULT: '#1A202C',  // النص الأساسي
          light: '#4A5568',    // نص فاتح
          lighter: '#718096',  // نص أفتح
        },
      },
      animation: {
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        heartbeat: {
          "0%": {
            transform: "scale(1)",
          },
          "25%": {
            transform: "scale(1.1)",
          },
          "50%": {
            transform: "scale(1.2)",
          },
          "75%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};

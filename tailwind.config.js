/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          light: "hsl(41, 100%, 65%)",
          main: "hsl(41, 100%, 60%)",
          dark: "hsl(41, 100%,50%)",
        },
        light: {
          light: "hsl(0, 0%, 100%)",
          main: "hsl(0, 0%, 90%)",
          dark: "hsl(0, 0%,80%)",
        },
        gray: {
          light: "hsl(0, 0%, 62%)",
          main: "	hsl(0, 0%, 57%)",
          dark: "hsl(0, 0%, 50%)",
        },
        dark: {
          light: "hsl(0, 0%, 28%)",
          main: "	hsl(0, 0%, 20%)",
          dark: "hsl(0, 0%, 15%)",
        },
        blue: {
          light: "hsl(200,60%,55%)",
          medium: "hsl(200,60%,45%)",
          dark: "hsl(200,60%,35%)",
        },
        red: {
          light: "hsl(5, 60%, 55%)",
          main: "hsl(5, 60%, 50%)",
          dark: "hsl(5, 60%, 40%)",
        },
        orange: {
          light: "hsl(20, 80%, 60%)",
          main: "hsl(20, 80%, 55%)",
          dark: "hsl(20, 80%, 47%)",
        },
        green: {
          light: "hsl(120, 70%, 50%)",
          main: "hsl(120, 70%, 45%)",
          dark: "hsl(120, 70%, 35%)",
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.md'))"
      );
      addVariant(
        "desktop-only",
        "@media screen and (min-width: theme('screens.md'))"
      );
    },
  ],
};

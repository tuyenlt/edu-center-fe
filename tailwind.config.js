import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
  ],
  darkMode: "class", // 'media' hoặc 'class'
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      flexGrow: {
        5: "5",
      },
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

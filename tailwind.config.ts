import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // purple: "#422E5F",
        purple: "#573e7a",
        // purple2:"#342954",
        purple2:"#4d3e75",
        lightGolden: "#F9DA9E",
        darkPurple: "#201930"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;

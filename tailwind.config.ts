import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // purple: "#422E5F",
        purple: "#7b5da6",
        // purple2:"#342954",
        purple2:"#63548c",
        lightGolden: "#F9DA9E",
        darkPurple: "#332a47"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#422E5F",
        purple2:"#342954",
        lightGolden: "#F9DA9E"
      }
    },
  },
  plugins: [],
} satisfies Config;

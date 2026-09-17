import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#09253a", brand: "#1369a6", mist: "#e8f4f8", gold: "#d5a03d" },
      fontFamily: { display: ["Georgia", "serif"] },
      boxShadow: { soft: "0 18px 45px rgba(9,37,58,.11)" }
    }
  },
  plugins: []
} satisfies Config;

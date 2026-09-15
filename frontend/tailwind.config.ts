import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: "#CFF5EE",      // hero background
          teal: "#2C7A6E",      // primary buttons / headings
          dark: "#16241F",      // dark navbar bg in prototype frame
          green: "#1F4B3F",     // "Essentials" heading green
        },
        admin: {
          bg: "#1E2530",        // page background
          panel: "#252C38",     // outer rounded panel
          card: "#2B3341",      // glass card surface
          cardLight: "#323B4B", // hover / active surface
          border: "#3A4353",
          text: "#E7EAEE",
          muted: "#9AA3B2",
          accent: "#6C8CFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Georgia", "serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;

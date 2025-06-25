/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-blue-500",
    "underline",
    "break-all",
    "hover:underline",
    "dark:text-blue-400"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'oklch(68.5% 0.169 237.323)',
        secondary: "#ecf0f1",
        tertiary: "#2c3e50",
        primarytext: "white",
        secondarytext: "white",
      },
  
    },
  },
  plugins: [],
};

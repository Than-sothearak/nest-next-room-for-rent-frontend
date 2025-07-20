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
        primary: 'white',
        secondary: "#ecf0f1",
        tertiary: "#2c3e50",
        primarytext: "#2c3e50",
        secondarytext: "white",
      },
  
    },
  },
  plugins: [],
};

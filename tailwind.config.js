/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include all components in the components directory
    "./src/components/CarSpecs.vue", // Add the path to CarSpecs.vue
    "./src/components/Recalls.vue", // Add the path to Recalls.vue
    "./src/components/Landing.vue", // Add the path to Landing.vue
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

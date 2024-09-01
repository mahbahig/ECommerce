/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: { 'main': '#0aad0a' ,  'main-light': '#f0f3f2' }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
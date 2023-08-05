/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': 'rgb(246,246,229)',
        'orange': 'rgb(210,109,80)',
        'blue': 'rgb(91,151,152)',
        // add as many colors as you need
      },
    },
  },
  plugins: [],
}

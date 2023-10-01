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
        'pastel-orange': 'rgb(210,109,80)',
        'pastel-blue': 'rgb(91,151,152)',
        'islamic': 'rgb(146,185,187)',
        'skills': 'rgb(225,117,86)',
        'sports': 'rgb(239, 198, 103)',
        'languages': 'rgb(143,160,169)'
      },
      
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

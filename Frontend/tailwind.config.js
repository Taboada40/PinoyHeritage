/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This sets your specific brand Blue (#0038A8) as the default "blue-800"
        // and your Yellow (#FCD116) as a utility color.
        blue: {
          50: '#eef4ff',
          100: '#dce8ff',
          600: '#2563eb', // Standard blue for some elements
          800: '#0038A8', // YOUR BRAND BLUE
          900: '#00257a', // Darker shade for hover states
        },
        yellow: {
          400: '#FCD116', // YOUR BRAND YELLOW
        }
      },
      fontFamily: {
        // This makes 'font-serif' use Playfair Display (Crucial for your headers)
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
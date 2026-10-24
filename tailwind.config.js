/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#28A745',
          dark: '#1F7A4D',
          light: '#E8F5EC',
        },
        ink: {
          DEFAULT: '#282828',
          muted: '#595959',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

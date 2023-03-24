/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './client/*.{html,js}',
    './client/components/*.{js,jsx}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

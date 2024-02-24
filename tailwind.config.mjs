/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent_yellow: '#FFDD52',
        accent_blue: '#4443F6',
        accent_green: '#62eb52',
        accent_red: '#FF2323',
        point: '#6E2BFC',
        black_1: '#1C1919',
        black_2: '#1B1C20',
        gray_1: '#F3F3F9',
        gray_2: '#d7d7d7',
        gray_3: '#636262',
        gray_4: '#BCBDC1',
        gray_5: '#474747',
      },
    },
  },
  plugins: [],
}

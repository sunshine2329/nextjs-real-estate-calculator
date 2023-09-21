import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {},
  plugins: [require('daisyui')]
}
export default config

// postcss.config.js — 우선순위 고정용 (CRA가 가장 먼저 이 파일을 읽도록)
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwind, autoprefixer],
};

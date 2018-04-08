// https://github.com/michael-ciniawsky/postcss-load-config
var tailwindcss = require('tailwindcss')
module.exports = {
  "plugins": {
    tailwindcss: './tailwind.js',
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}

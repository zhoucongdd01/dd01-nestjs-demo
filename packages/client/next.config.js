// css跟scss 并存使用
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
module.exports = withSass(withCSS({}))
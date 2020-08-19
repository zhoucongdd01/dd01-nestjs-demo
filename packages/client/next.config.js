// css跟scss 并存使用
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// const withLess = require('@zeit/next-less')
module.exports = withSass(withCSS({}))
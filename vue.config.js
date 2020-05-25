/*
 * @Author: chenghao
 * @Date: 2020-05-25 10:03:09
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-05-25 10:10:46
 * @Desc: vue-cli@3.x config
 */
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: (config) => {
    if (isProduction) {
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const arg = args
      arg[0].title = 'vue-admin-template-buildin'
      return args
    })
  }
}

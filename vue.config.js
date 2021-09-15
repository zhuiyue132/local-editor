/*
 * @Author: chenghao
 * @Date: 2020-05-25 10:03:09
 * @Last Modified by: chenghao
 * @Last Modified time: 2021-09-15 14:29:33
 * @Desc: vue-cli@3.x config
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const arg = args
      arg[0].title = 'Editor'
      return args
    })

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

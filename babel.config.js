/*
 * @Author: chenghao
 * @Date: 2020-05-25 15:26:53
 * @Last Modified by:   chenghao
 * @Last Modified time: 2020-05-25 15:26:53
 * @Desc: babel config
 */
module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}

/*
 * @Author: chenghao
 * @Date: 2020-06-24 15:36:23
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-08-17 17:35:35
 * @Desc: 快捷键
 */

/**
 *  name 快捷键名称
 *  key 快捷键键位 ，区分 win 和 mac
 *  relativeIcon 关联图标名称，即快捷键和点击icon的操作效果一致
 */
export default [
  {
    name: 'myCommand',
    key: {
      win: 'Ctrl-M',
      mac: 'Command-M'
    },
    relativeIcon: 'bold',
    callback(editor) {
      console.log(editor)
    }
  }
]

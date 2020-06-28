/*
 * @Author: chenghao
 * @Date: 2020-06-19 10:40:58
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-28 14:38:26
 * @Desc: setting
 */
import { getTheme, setTheme, getFontSize, setFontSize, getGutter, setGutter } from '@/util'

export default {
  state: {
    theme: getTheme() || 'ace/theme/chrome',
    fontSize: getFontSize() || 12,
    showGutter: getGutter() !== 'false'
  },
  mutations: {
    SET_THEME(state, { theme }) {
      state.theme = theme
      setTheme(theme)
    },
    SET_FONT_SIZE(state, { size }) {
      state.fontSize = size
      setFontSize(size)
    },
    SET_GUTTER(state, { value }) {
      state.showGutter = value
      setGutter(value)
    }
  },
  actions: {
    themeChange({ commit }, theme) {
      console.log('theme was changed to :>> ', theme)
      commit({
        type: 'SET_THEME',
        theme
      })
    },
    fontSizeChange({ commit }, size) {
      console.log('fontsize was changed to :>> ', size)
      commit({
        type: 'SET_FONT_SIZE',
        size
      })
    },
    toggleGutter({ commit }, value) {
      console.log('showgutter was changed to :>> ', value)
      commit({
        type: 'SET_GUTTER',
        value
      })
    }
  }
}

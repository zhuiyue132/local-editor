/*
 * @Author: chenghao
 * @Date: 2020-06-19 10:40:58
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-24 17:10:03
 * @Desc: setting
 */
import { getTheme, setTheme } from '@/util'

export default {
  state: {
    theme: getTheme() || 'ace/theme/chrome'
  },
  mutations: {
    SET_THEME(state, { theme }) {
      state.theme = theme
      setTheme(theme)
    }
  },
  actions: {
    themeChange({ commit }, theme) {
      console.log('theme was changed to :>> ', theme)
      commit({
        type: 'SET_THEME',
        theme
      })
    }
  }
}

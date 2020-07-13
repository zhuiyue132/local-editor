/*
 * @Author: chenghao
 * @Date: 2020-06-19 10:40:58
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-07-13 15:22:56
 * @Desc: setting
 */
import {
  getTheme,
  setTheme,
  getFontSize,
  setFontSize,
  getGutter,
  setGutter,
  getPicBedStatus,
  setPicBedStatus
} from '@/util'

export default {
  state: {
    theme: getTheme() || 'ace/theme/chrome',
    fontSize: getFontSize() || 12,
    showGutter: getGutter() !== 'false',
    picBedStatus: getPicBedStatus() !== 'false'
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
    },
    SET_PIC_BED_STATUS(state, { value }) {
      state.picBedStatus = value
      setPicBedStatus(value)
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
    },
    togglePicBed({ commit }, value) {
      console.log('pic bed was changed to :>> ', value)
      commit({
        type: 'SET_PIC_BED_STATUS',
        value
      })
    }
  }
}

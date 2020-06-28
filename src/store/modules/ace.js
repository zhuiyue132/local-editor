/*
 * @Author: chenghao
 * @Date: 2020-06-19 10:40:58
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-28 10:47:19
 * @Desc: setting
 */

export default {
  state: {
    aceEditor: null
  },
  mutations: {
    SET_EDITOR(state, payload) {
      state.aceEditor = payload
    }
  },
  actions: {}
}

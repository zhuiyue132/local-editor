/*
 * @Author: chenghao
 * @Date: 2020-06-19 10:40:58
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-25 14:53:48
 * @Desc: setting
 */

export default {
  state: {
    aceEditor: null
  },
  mutations: {
    SET_EDITOR(state, payload) {
      console.log(1, payload)
      state.aceEditor = payload
    }
  },
  actions: {}
}

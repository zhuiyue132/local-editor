import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import ace from './modules/ace'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ace,
    settings
  }
})

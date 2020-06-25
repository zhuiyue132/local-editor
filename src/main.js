import Vue from 'vue'
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import '@/styles/theme.css'
import './icons' // icon

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

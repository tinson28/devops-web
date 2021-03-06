import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import 'xterm/dist/xterm.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/assets/font-icon/iconfont.js'
import './permission' // permission control
// import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
// import 'vue-ztree-2.0/dist/vue-ztree-2.0.css'
import './assets/icon/iconfont.css'

// Vue.use(vueztree)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

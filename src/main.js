import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueQrcode from '@xkeshi/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

new Vue({
  el: '#app',
  render: h => h(App)
})

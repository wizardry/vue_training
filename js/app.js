import 'babel-polyfill'
import Vue from 'vue'
import router from './router.js'
import store from './store'
import App from './components/App.vue'

new Vue({
  store, // inject store to all children
  router,
  el: '#vueApp',
  render: h => h(App)
})

import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

var SinApp = new Vue({
  store, // inject store to all children
  el: '#vueApp',
  render: h => {
    return h( (App) )
  }
});

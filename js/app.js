import 'babel-polyfill';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import store from './store';
import App from './components/App.vue';

Vue.config.errorHandler = (e,component,event_name) => {
  console.log(e, component, event_name)
  if(event_name == 'render') {
    alert('データに不整合があるため初期状態にします。')
    window.localStorage.removeItem('smc-items');
    location.reload();
  }
};

Vue.use(VeeValidate)

var SinApp = new Vue({
  store, // inject store to all children
  el: '#vueApp',
  render: h => {
    return h( (App) )
  }
});


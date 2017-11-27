import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
Vue.use(Router)

export default new Router({
	routers: [{
		path: '/',
		component: App
	},{
		path: '#media',
		component: App
	},{
		path: '#company',
		component: App
	},{
		path: '#government',
		component: App
	},{
		path: '#date',
		component: App
	}]
})
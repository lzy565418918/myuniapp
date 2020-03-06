import Vue from 'vue'
import App from './App'
import request from 'api/request.js'
import store from 'store/store.js'
Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

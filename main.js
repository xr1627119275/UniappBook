import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
import tools from './libs/tools.js'
import http from './libs/request.js'
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

Vue.use(http);

Vue.prototype.$tools = tools

tools.readConfig()

const app = new Vue({
    ...App,
	store
})
app.$mount()

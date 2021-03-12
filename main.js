import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
import tools from './libs/tools.js'
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

Vue.prototype.$tools = tools

tools.readConfig()

const app = new Vue({
    ...App,
	store
})
app.$mount()

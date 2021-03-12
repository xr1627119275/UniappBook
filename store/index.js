import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



const store = new Vuex.Store({
    state: {
		bookManage: {
			nowType: { value: "xbiquge_la" , label: "www.xbiquge.la" },
			select: [
				{ value:  "ltoooo_com" , label: "www.ltoooo.com" },
				{ value:  "xbiquge_la" , label: "www.xbiquge.la" },
			]
		},
		tabBars: [{
					iconPath: "/static/uview/example/component.png",
					selectedIconPath: "/static/uview/example/component_select.png",
					text: '书城',
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/uview/example/js.png",
					selectedIconPath: "/static/uview/example/js_select.png",
					text: '工具',
					midButton: true,
					pagePath: "/pages/js/index"
				},
				{
					iconPath: "/static/uview/example/template.png",
					selectedIconPath: "/static/uview/example/template_select.png",
					text: '设置',
					pagePath: "/pages/template/index"
				}, 
			]
	},
	getters: {
		nowBookType(state) {
			return state.bookManage.nowType.value
		}
	},
    mutations: {},
    actions: {}
})
export default store
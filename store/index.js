import Vue from 'vue'
import Vuex from 'vuex'
import wx from './wx'
import consts from "@/libs/const.js"
import searchApi from '@/api/search'
Vue.use(Vuex)



const store = new Vuex.Store({
	modules: {
		wx
	},
	state: {
		platform: "",
		searchHistory: [],
		bookManage: {
			nowType: {
				value: "ltoooo_com",
				label: "www.ltoooo.com"
			},
			select: [{
					value: "ltoooo_com",
					label: "www.ltoooo.com"
				},
				{
					value: "xbiquge_la",
					label: "www.xbiquge.la"
				},
			]
		},
		tabBars: [
			{
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
		],
		WeiXin: {
			session_key: "",
			openid: ""
		}
	},
	getters: {
		nowBookType(state) {
			return state.bookManage.nowType.value
		},
	},
	mutations: {
		setPlatform(state, platform) {
			state.platform = platform
		},
		setSearchHistory(state, history) {
			state.searchHistory = history
		}
	},
	actions: {
		getSearchHistory({commit}) {
			searchApi.get().then(res=>{
				if (res.length > 0) {
					let data = res[0]
					 
					commit("setSearchHistory", data.content.slice(0, 5))
				} 
			})
		},
		removeSearchHistory({commit, state}, search) {
			let history = state.searchHistory
			
			let index= history.findIndex(item => item == search)
			if (index >= 0) {
				history.splice(index, 1)
				searchApi.updatehistory(history)
			}
		}
	}
})
export default store

import http from '@/libs/request.js'
export default {
	namespaced: true,
	state: () => {
		return {
			config: {
				session_key: "",
				openid: ""
			}
		}
	},
	getters: {
		OpenId(state) {
			return state.config.openid
		}
	},
	mutations: {
		setData(state, data) {
			state.config = data
		}
	},
	actions: {
		LoginWeixin({ commit }) {
			const provider = "weixin"
			return new Promise((resolve, reject) => {
				uni.login({
					provider ,
					success: async (res) => {
						if (res.errMsg === "login:ok") {

							let { data } = await http.get(`https://xrdev.top/wx/api/code2Session.php?code=${res.code}`)
							commit("setData", data)

							resolve(data) 
						} else {
							reject(res.errMsg)
						}
					}
				})
			})
		}
	},
}
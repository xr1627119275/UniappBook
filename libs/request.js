import vue from 'vue'

function request(method, url, ) {
	return (url, header = {}) => {
		return new Promise((resolve, reject) =>{
			uni.request({
				url,
				method,
				header,
				success(res) {
					resolve(res)
				},
				fail(e) {
					reject(e)
				}
			})
		})
	}
}

 const $http = {
	get: request("GET"),
	post: request("POST"),
	install(app) {
		vue.prototype.$http = $http
	}
}

export default $http
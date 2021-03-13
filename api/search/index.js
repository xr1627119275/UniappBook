import store from "@/store"
const db = uniCloud.database();
const dbCollectionName = 'opendb-search-log';


const api = {
	async add(search) {
		let content = [search]
		
		let data = await api.get()
		
		if (data.length == 0) {
			db.collection(dbCollectionName).add({
				user_id: store.getters['wx/OpenId'],
				device_uuid: "",
				platform: store.state.platform,
				content,
				create_date: new Date().getTime()
			})
		} else {
			api.appendSearch(data[0], search)
		} 
		
	},
	async get() {
		
			const { result } = await db.collection(dbCollectionName).get({
				user_id: store.getters['wx/OpenId']
			})
			return result.data
		
		
	},
	async updatehistory(history) {
		let data = (await api.get())[0]
		let id = data._id
		data.content = history
		delete(data._id)
		
		if (history.length == 0) {
			db.collection(dbCollectionName).doc(id).remove()
		} else {
			db.collection(dbCollectionName).doc(id).update(data)
		}
	},
	async appendSearch(data, search) {
		if (!data) {
			data = (await api.get())[0]
		}
		console.log(data);
		let content = data.content || []
		let index = content.findIndex(item => item == search)
		
		
		if (index >= 0) {
			content = content.splice(index, 1)
		}
		console.log(content);
		data.content = [search].concat(content).slice(0, 5)
		let id = data._id
		delete(data._id)
		db.collection(dbCollectionName).doc(id).update(data)
	}
}


export default api
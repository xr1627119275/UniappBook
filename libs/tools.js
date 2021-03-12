import store from '@/store/index.js'
export default {
	toDetail: (book) => {
		uni.navigateTo({
			url: "/pages/index/detail/detail?url=" + book.Url + "&img="+book.ImgUrl,
			success: () => {
				uni.setNavigationBarTitle({
					title: book.Title
				})
			}
		})
	},
	toContent: (item) => {
		uni.navigateTo({
			url: "/pages/index/content/content?url=" + item.Url
		})
	},
	readConfig: () => {
		const value = uni.getStorageSync("bookManage")
		console.log(value);
		if (!value) return
		store.state.bookManage = value
	}
}
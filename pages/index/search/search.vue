<template>
	<view>
		<view style="width: 100vw;padding: 5px;">
			<u-search @search="Search" :clearabled="true"></u-search>
		</view>
		<u-cell-group style="width: 100vw;" title="搜索结果" >
			<u-cell-item v-for="(book,index) in result"  :key="index" :title="book.Title + '  ' + book.Author" :label="book.Desc" :arrow="false" @click="toDetail(book)">
				<image slot="icon" :src="book.ImgUrl" style="width: 60px;height: 75px;margin-right: 10px;"></image> 
			</u-cell-item>
			
			
		</u-cell-group>
		<u-cell-item v-if="!result" :arrow="false">
			<text slot="icon">无结果</text>
		</u-cell-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: false
			}
		},
		methods: {
			toDetail(book) {
				
				uni.navigateTo({
					url: "../detail/detail?url=" + book.Url + "&img="+book.ImgUrl,
					success: () => {
						uni.setNavigationBarTitle({
							title: book.Title
						})
					}
				})
			},
			Search(value) {
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: 'https://xrdev.top/wx_api/book_search?page=http://www.ltoooo.com&name='+encodeURI(value),
					method: 'GET',
					success: res => {
						console.log(res.data);
						this.result = res.data
						this.$nextTick(function(){
							uni.hideLoading()
						})
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>

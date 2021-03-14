<template>
	<view style="padding: 5px; height: 100vh;background: #E9FAFF;">
		<text >{{ content.Content }}</text>
		<view v-if="ShowNext" style="pading: 10px;">
			<u-button v-if="content.LastUrl !== this.currUrl" type="primary" @click="getContent(content.LastUrl)">上一章</u-button>
			<view style="margin-top: 10px;"></view>
			<u-button type="primary"  @click="getContent(content.NextUrl)">下一章</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showNext: false,
				content: {},
				ShowNext: false,
				currUrl: ""
			}
		},
		onLoad({url}) {
			uni.setBackgroundColor({
				backgroundColor: "#E9FAFF",
				backgroundColorTop: "#E9FAFF",
			})
			this.currUrl = url
			this.getContent(url)
		},
		methods: {
			getContent(url) {
				
				uni.showLoading({
					title: "加载中"
				})
			    uni.request({
			    	url: `https://xrdev.top/wx_api/book/book_content?page=${url}&type=${this.$store.getters.nowBookType}`,
			    	method: 'GET',
			    	success: res => {
			    		console.log(res.data);
			    		let data = res.data || []
						if (data.length == 0){
							this.content = {}
							uni.hideLoading()
							return
						}
						uni.setNavigationBarTitle({
							title: data.Title
						})
						
						this.content = data
						
						this.$nextTick(function(){
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 100
							})
							uni.hideLoading()
						})
						
						
						this.ShowNext = true
			    	},
			    	fail: () => {},
			    	complete: () => {}
			    });
			}
		}
	}
</script>

<style>
page {
	background: #E9FAFF;
}
</style>

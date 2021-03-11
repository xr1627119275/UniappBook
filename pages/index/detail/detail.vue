<template>
	<view>
		<u-cell-item :arrow="false" >
			<u-image slot="icon" :src="book.ImgUrl" style="width: 120px;height: 150px;margin-right: 10px;"></u-image> 
			<view slot="label">
				<view v-for="(item,index) in BaseInfo" :key="index">
					{{item}}
				</view>
			</view>
		</u-cell-item>
		
		<u-cell-item :arrow="false" title="章节">
			<view slot="label">
				<u-button slot="right-icon" size="mini" @click="reverse">倒 正序</u-button>
			</view>
		</u-cell-item>
		<u-cell-item :arrow="false" v-for="(item) in Section" :key="item.Url" :title="item.Title" @click="toContent(item)">
		</u-cell-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currUrl: "",
				data: {},
				Section: {},
				BaseInfo: {},
				
			}
		},
		methods: {
			reverse() {
				this.Section = this.Section.reverse()
			},
			toContent({Url}) {
				uni.navigateTo({
					url: "../content/content?url=" + Url
				})
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中"
			})
			this.currUrl = options.url
			uni.request({
				url: 'https://xrdev.top/wx_api/book_detail?page='+options.url,
				method: 'GET',
				success: res => {
					console.log(res.data);
					this.BaseInfo = res.data.BaseInfo
					this.Section = Object.freeze(res.data.Section)
					
					this.$nextTick(function(){
						uni.hideLoading()
					})
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<u-cell-item :arrow="false" >
			<image slot="icon" :src="ImgUrl" style="width: 120px;height: 150px;margin-right: 10px;"></image> 
			<view slot="label">
				<view v-for="(item,index) in BaseInfo" :key="index">
					{{item}} 
				</view>
			</view>
		</u-cell-item>
		<u-cell-item v-if="Desc" :arrow="false" :title="Desc">
			</u-cell-item>
		<u-cell-item :arrow="false" title="章节">
			<view slot="label">
				<u-button slot="right-icon" size="mini" @click="reverse">倒 正序</u-button>
			</view>
		</u-cell-item>
		<u-cell-item :arrow="false" v-for="(item) in Section" :key="item.Url" :title="item.Title" @click="$tools.toContent(item)">
		</u-cell-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currUrl: "",
				data: {},
				Section: [],
				BaseInfo: {},
				Desc: undefined,
				ImgUrl: ""
			}
		},
		methods: {
			reverse() {
				this.Section = this.Section.reverse()
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中"
			})
			this.currUrl = options.url
			this.ImgUrl = options.img
			uni.request({
				url: `https://xrdev.top/wx_api/book/book_detail?page=${options.url}&type=${this.$store.getters.nowBookType}`,
				method: 'GET',
				success: res => {
					console.log(res.data.BaseInfo);
					this.BaseInfo = res.data.BaseInfo
					this.Desc = res.data.Desc
					this.Section = (res.data.Section)
					
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

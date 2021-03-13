<template>
	<view class="content" >
		<view @click="toSearch()" style="width: 100vw;padding: 5px;">
			<u-search style="pointer-events: none" :show-action="false"></u-search>
		</view>
		
			<u-cell-group v-for="(item,index) in data" :key="index" style="width: 100vw;" :title="item.Type" >
				<u-cell-item v-for="book in item.List" :key="book.Url" :title="book.Title + '  ' + book.Author" :label="book.Desc" :arrow="false"  @click="$tools.toDetail(book)">
					<image slot="icon" :src="book.ImgUrl" style="width: 60px;height: 75px;margin-right: 10px;"></image> 
				</u-cell-item>
			</u-cell-group>
		
		
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import { mapState } from 'vuex';  
	export default {
		data() {
			return {
				title: '',
				data: [],
			}
		},
		computed: {
			...mapState({ tabbar: state => state.tabBars })  
		},
		onLoad() {
			this.$store.dispatch("getSearchHistory")
			this.getHomeData()
			
			uni.$on("refreshHome", this.getHomeData)
			
		},
		methods: {
			getHomeData() {
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: `https://xrdev.top/wx_api/book_home?type=${this.$store.getters.nowBookType}`,
					method: 'GET',
					success: res => {
						console.log(res.data);
						this.data = res.data
						
						this.$nextTick(function(){
							uni.hideLoading()
						})
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
				toSearch() {
					
					
					
					console.log("toSearch");
					uni.navigateTo({
						url: "search/search"
					})
				}
		},
	}
</script>

<style>
	.u-cell__label {
		display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp:3;
	  overflow: hidden;
	  word-break: break-all;
	  text-overflow: ellipsis;
	}
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

<template>
	<view class="content" >
		<view @click="toSearch()" style="width: 100vw;padding: 5px;">
			<u-search style="pointer-events: none" :show-action="false"></u-search>
		</view>
		
			<u-cell-group v-for="(item,index) in data" :key="index" style="width: 100vw;" :title="item.Type" >
				<u-cell-item v-for="book in item.List" :key="book.Url" :title="book.Title + '  ' + book.Author" :label="book.Desc" :arrow="false"  @click="toDetail(book)">
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
			/**
			 * 示例中为每个tabbar页面都写了一遍tabbar变量，您可以将tabbar数组写入到vuex中，这样可以全局引用
			 */
			// this.tabbar = [{
			// 		iconPath: "/static/uview/example/component.png",
			// 		selectedIconPath: "/static/uview/example/component_select.png",
			// 		text: '书城',
			// 		pagePath: "/pages/index/index"
			// 	},
			// 	{
			// 		iconPath: "/static/uview/example/js.png",
			// 		selectedIconPath: "/static/uview/example/js_select.png",
			// 		text: '工具',
			// 		midButton: true,
			// 		pagePath: "/pages/js/index"
			// 	},
			// 	{
			// 		iconPath: "/static/uview/example/template.png",
			// 		selectedIconPath: "/static/uview/example/template_select.png",
			// 		text: '模板',
			// 		pagePath: "/pages/template/index"
			// 	}, 
			// ]
			
			uni.showLoading({
				title: "加载中"
			})
			uni.request({
				url: 'https://xrdev.top/wx_api/book_home?page=http://www.ltoooo.com&tran=1',
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
		methods: {
			toDetail(book) {
				
				uni.navigateTo({
					url: "detail/detail?url=" + book.Url + "&img="+book.ImgUrl,
					success: () => {
						uni.setNavigationBarTitle({
							title: book.Title
						})
					}
				})
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

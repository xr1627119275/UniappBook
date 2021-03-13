<template>
	<view>
		<view style="width: 100vw;padding: 5px;">
			<u-search @search="Search" v-model="searchData" :clearabled="true"></u-search>
		</view>
		<u-cell-group v-if="searchHistory.length > 0" style="width: 100vw;" title="历史搜索">
			<u-cell-item v-for="(search,index) in searchHistory"  :key="index" :title="search" :arrow="false" @click="Search(search, true)" >
				
				<u-button name="trash-fill" slot="right-icon" type="error" plain @click="DeleteHistory(search)">删除</u-button>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group style="width: 100vw;" title="搜索结果" v-if="result">
			<u-cell-item v-for="(book,index) in result"  :key="index" :title="book.Title + '  ' + book.Author" :label="book.Desc" :arrow="false" @click="$tools.toDetail(book)">
				<image slot="icon" :src="book.ImgUrl" style="width: 60px;height: 75px;margin-right: 10px;"></image> 
			</u-cell-item>
		</u-cell-group>
		<u-cell-item v-else :arrow="false">
			<text slot="icon">无结果</text>
		</u-cell-item>
	</view>
</template> 

<script>
	import search from '@/api/search'
	
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				result: false,
				searchData: "",
			}
		}, 
		computed: {
			...mapState({ searchHistory: state => state.searchHistory })
		},
		methods: {
			Search(value, notRecord) {
				if (!notRecord) {
					search.add(value)
				}
				 
				this.searchData = value
				
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: `https://xrdev.top/wx_api/book_search?type=${this.$store.getters.nowBookType}&name=${encodeURI(value)}`,
					method: 'GET',
					success: res => {
						console.log(res.data);
						this.result = res.data
						this.$store.dispatch("getSearchHistory")
						this.$nextTick(function(){
							uni.hideLoading()
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			DeleteHistory(item) {
				this.$store.dispatch("removeSearchHistory", item)
				
			}
		},

	}
</script>

<style>

</style>

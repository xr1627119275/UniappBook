<template>
	<view >
		<u-form :model="form" ref="uForm" >
			<u-form-item label="书源">
				<u-input v-model="nowType.label" border type="select"  @click="bookTypeShow = true" placeholder="请选择书源"></u-input>
				<u-select v-model="bookTypeShow" mode="single-column" :list="bookTypeList" @confirm="bookTypeSelect"></u-select>
			</u-form-item>
		</u-form>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import { mapState } from 'vuex';  
	export default {
		data() {
			return {
				form: {
					BookManage: {
						nowType: this.$store.state.bookManage.nowType
					}
				},
				bookTypeShow: false,
				bookTypeList: this.$store.state.bookManage.select
			}
		},
		computed: {
			...mapState({ tabbar: state => state.tabBars, nowType: state => state.bookManage.nowType  })  
		},
		methods: {
			bookTypeSelect(item) {
				console.log(item);
				this.$store.state.bookManage.nowType = item[0]
				
				
				uni.setStorageSync("bookManage", this.$store.state.bookManage)
				uni.$emit("refreshHome")
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>
	.u-form-item--left__content__label {
		justify-content: center !important;
	}
	.u-form-item {
		padding: 20rpx 10rpx !important;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
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

<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch', this)
			uni.getProvider({
				service: "oauth",
				success: ({ service, provider } ) =>  {
					this.$store.commit("setPlatform", provider[0] )
					if (provider[0] === "weixin") {
						this.$store.dispatch("wx/LoginWeixin").then(res => {
							this.$store.dispatch("getSearchHistory")
						})
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	@import "uview-ui/index.scss";
</style>

<template>
	<view v-if="newMovies.subjects.length">
		<image class="open" :src="newMovies.subjects[0].images.large"></image>
		<view class="toindex" @click="toIndex">
			进入主页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			newMovies(){
				return this.$store.state.newMovies
			}
		},
		created() {
			this.$store.dispatch('getNewMovies')
		},
		methods:{
			toIndex(){
				console.log('tz')
				uni.redirectTo({
				    url: '../index/index',
					fail:(err)=>{
						console.log(err);
					}
				});
			}
		}
	}
</script>

<style lang="less">
.open{
	height: 100vh;
	width: 100%;
}
.toindex{
	width: 200rpx;
	height: 100rpx;
	border-radius: 50rpx;
	text-align: center;
	background: rgba(255,255,255,0.6);
	line-height: 100rpx;
	position: absolute;
	left: 50%;
	bottom: 140rpx;
	transform: translateX(-50%);
}
</style>

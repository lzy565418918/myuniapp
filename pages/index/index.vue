<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="navbar">
			<view class="navbar-fixed">
				<text class="title">招影</text>
			</view>
		</view>
		<view class="headbar">
			<text class="left">{{newMovies.data.title}}</text>
		</view>
		<scroll-view style="white-space: nowrap;background-color: #808080;" scroll-x="true">
			<view class="movies" v-for="(item,index) in newMovies.data.subjects" :key="index">
				<image :src="item.images.small||'../../static/logo.png'"></image>
				<text class="movie-name">{{item.title}}</text>
				<view class="movie-star">
					<uniIcons 
					:value="item.rating.average/2"
					:disabled="true"
					size="14"
					/>
				</view>
				<text class="movie-score" v-for="(e,i) in item.genres" :key="i">{{e}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		computed:{
			newMovies(){
				Object.keys(this.$store.state.newMovies).length>0&&console.log(this.$store.state.newMovies)
				return this.$store.state.newMovies
			},
			city(){
				return this.$store.state.city
			}
		},
		data() {
			return {
				dataList:[]
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init(){
				this.getNewMoives()
				this.comingSoon()
				this.inTheaters()
				// this.dataList=[...this.dataList,this.comingSoon(),this.inTheaters()]
				// console.log(this.dataList)
				// Promise.all([this.newMovies,this.comingSoon(),this.inTheaters()]).then(res=>{
				// 	console.log(res,'promise')
				// 	uni.hideLoading()
				// })
			},
			getNewMoives(){
				this.$store.dispatch('getNewMovies')
			},
			comingSoon(){
				this.$request('/v2/movie/coming_soon',{city:this.$store.state.city}).then(res=>{
					console.log(res,'res')
				})
			},
			inTheaters(){
				this.$request('/v2/movie/in_theaters',{city:this.city})
			}
		}
	}
</script>

<style lang="less">
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		.navbar{
			height: 100rpx;
			width: 100%;
			.navbar-fixed{
				padding: 0 16px;
				position: fixed;
				left: 0;
				right: 0;
				height: 100rpx;
				z-index: 1;
				background-color: #238052;
				.title{
					line-height: 100rpx;
					color: #42bd56;
					font-size: 24px;
					font-weight: bold;
				}
			}
		}
		.headbar{
			line-height: 100rpx;
			padding: 10px 16px;
			.left{
				font-size: 20px;
			}
		}
		.hb{
			width: 100%;
		}
		.movies{
			display: inline-block;
			margin-left: 16px;
			width:110px;
			height: 300px;
			margin-top: 10px;
			image{
				width: 110px;
				height: 200px;
				border-radius: 5px;
			}
			.movie-name{
				font-size: 14px;
				width: 110px;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.movie-score{
				display: inline-block;
				font-size: 12px;
				margin-right: 5px;
				color: #4CD964;
				border: 1px solid #4CD964;
			}
		}
	}
</style>

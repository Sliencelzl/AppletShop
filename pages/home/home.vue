<template>
	<view class="home_page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper_item" v-for="(item,i) in SwiperLise" :key="i">
				<image class="img" :src="item.image_src | changeHttp"></image>
			</swiper-item>
		</swiper>
		<view class="list_type">
			<view class="list_item" v-for="(item,i) in NavList" :key="i">
				<image class="listImg" :src="item.image_src | changeHttp"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SwiperLise: [],
				NavList:[],
				FlooerList:[]
			};
		},
		//定义过滤器去改变请求的https替换成http
		filters: {
			changeHttp(value) {
				value = 'http' + value.slice(5)
				console.log(value)
				return value
			}
		},
		onLoad() {
			this.getSwiperlist()
			this.getNavlist()
			this.getFlooer()
		},
		methods: {
			async getSwiperlist() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					uni.$toastMsg('数据加载失败。。。')
				}
				this.SwiperLise = res.message
			},
			async getNavlist(){
				const {
					data:res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200){
					uni.$toastMsg('数据加载失败。。。')
				}
				this.NavList = res.message
			},
			async getFlooer(){
				const { 
					data:res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200){
					uni.$toastMsg('数据加载失败。。。')
				}
				this.FlooerList = res.message
			},
			
		}
	}
</script>

<style lang="scss">
	.home_page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.swiper_item{
			height: 300rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.list_type{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			 box-sizing: border-box;
			.list_item{
				flex: 1;
				text-align: center;
				margin: 15rpx 0;
				.listImg{
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="home_page">
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper_item" v-for="(item,i) in SwiperLise" :key="i">
				<navigator class="img" :url="'/subpkg/good_detail/good_detail?goods_id='+item.goods_id">
					<image class="img" :src="item.image_src | changeHttp"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="list_type">
			<view class="list_item" v-for="(item,i) in NavList" :key="i" @click="listTypehander(item)">
				<image class="listImg" :src="item.image_src | changeHttp"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in FlooerList" :key="i">
				<image :src="item.floor_title.image_src | changeHttp" class="floor-title"></image>
				<view class="floor-img-box">
					<view class="left-img-box">
						<image :src="item.product_list[0].image_src | changeHttp"
							:style="{width:item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
					</view>
					<view class="rigth-img-box">
						<view class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src | changeHttp" :style="{width:item2.image_width + 'rpx'}" mode="widthFix" class="floorImgitems"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badge from '../../mixins/tabber-badge.js'
	export default {
		mixins:[badge],
		data() {
			return {
				SwiperLise: [],
				NavList: [],
				FlooerList: []
			};
		},
		//定义过滤器去改变请求的https替换成http
		filters: {
			changeHttp(value) {
				value = 'http' + value.slice(5)
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
			async getNavlist() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					uni.$toastMsg('数据加载失败。。。')
				}
				this.NavList = res.message
			},
			async getFlooer() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					uni.$toastMsg('数据加载失败。。。')
				}
				this.FlooerList = res.message
			},
			listTypehander(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home_page {
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.swiper_item {
			height: 300rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.list_type {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;

			.list_item {
				flex: 1;
				text-align: center;
				margin: 15rpx 0;

				.listImg {
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
		.floor-title {
			height: 60rpx;
			width: 100%;
			display: flex;
		}
		.rigth-img-box{
			display: flex;
			flex-wrap: wrap;
			padding-left: 10rpx;
			.floorImgitems{
				padding-left: 10rpx;
			}
		}
		.floor-img-box{
			display: flex;
				
		}
		.search-box{
			position: sticky;
			top: 0;
			z-index: 999;
		}
	}
</style>

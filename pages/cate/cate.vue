<template>
	<view>
		<my-search @click = "gotoSearch"></my-search>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true" :style="{height:wh + 'px'}" class="left-scroll-view">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i === active ? 'active' : '']" @click="activeChange(i)">
						{{ item.cat_name }}</view>
				</block>

			</scroll-view>
			<scroll-view scroll-y="true" :style="{height:wh + 'px'}">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">
						/{{ item2.cat_name }}/
					</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodslist(item3)">
							<image :src="item3.cat_icon | changeHttp"></image>
							<text>{{ item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				cateLevel2: [],
				active: 0
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
			const sysInfo = uni.getSystemInfoSync() //获取屏幕高度的API
			console.log(sysInfo)
			this.wh = sysInfo.windowHeight - 50

			this.getCatelist()
		},
		methods: {
			async getCatelist() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					uni.$toastMsg('数据加载失败')
				}
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
				console.log('二级分类', this.cateLevel2)
				console.log(this.cateList)
			},
			activeChange(i) {
				this.active = i
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
			},
			gotoGoodslist(itme3){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail?cid=' + itme3.cat_id
				})
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
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #FFFFFF;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}
</style>

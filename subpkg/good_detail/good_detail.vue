<template>
	 <view>
	    <view class="goods-list">
		<view v-for="(goods,i) in goodsList" :key="i" @click="gotoXiangqing(goods)">
			<my-goods :goods="goods"></my-goods>
		</view>
	    </view>
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isloading:false
				
			};
		},

		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodslist()
		},
		methods:{
			async getGoodslist(cb){
				this.isloading = true
				const { 
					data:res
				} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isloading = false
				cb && cb()
				if(res.meta.status !== 200){
					uni.$toastMsg('数据加载中。。。')
				}
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			onReachBottom(){
				if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total) return uni.$toastMsg()
				if(this.isloading) return
				this.queryObj.pagenum++
				this.getGoodslist()
			},
			onPullDownRefresh(){
				this.queryObj.pagenum =1
				this.total =0 
				this.isloading = false
				this.goodsList = []
				this.getGoodslist(()=>{
					uni.stopPullDownRefresh()
				})
			},
			gotoXiangqing(goods){
				uni.navigateTo({
					url: '/subpkg/good_xiangqing/good_xiangqing?goods_id=' + goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

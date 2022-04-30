<template>
	<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar @confirm="" @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		
		<view class="sugg-list">
		  <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
		    <view class="goods-name">{{ item.goods_name }}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box">
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag @click="gotoGoodsList(item)" :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults:[],
				historyList:[]
			};
		},
		computed:{
			historys(){
				return [...this.historyList].reverse()
			}

		},
		onLoad() {
			/* this.historyList = JSON.parse() */
			this.historyList = JSON.parse(decodeURIComponent(uni.getStorageSync("kw") || "[]"))
		},
		methods: {
			input(e) {
				//搜索框的防抖处理 使用定时器500毫秒后将用户输入的内容接收
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchlist()
				}, 500)
			},
			async getSearchlist() {
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', {
					query: this.kw
				})
				if(res.meta.status !== 200){
					uni.$toastMsg('数据加载失败。。。')
				}
				this.searchResults = res.message.goods
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail?goods_id='+item.goods_id
				})
			},
			saveSearchHistory(){
				/* this.historyList.push(this.kw) */
				// 1. 将 Array 数组转化为 Set 对象
				  const set = new Set(this.historyList)
				  // 2. 调用 Set 对象的 delete 方法，移除对应的元素
				  set.delete(this.kw)
				  // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				  set.add(this.kw)
				  // 4. 将 Set 对象转化为 Array 数组
				  this.historyList = Array.from(set)
				  uni.setStorageSync('kw',JSON.stringify(this.historyList))//本地存储
			},
			cleanHistory(){
				this.historyList = []
				uni.setStorageSync('kw',[])
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail?query=' + kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
	  padding: 0 5px;
	
	  .sugg-item {
	    font-size: 12px;
	    padding: 13px 0;
	    border-bottom: 1px solid #efefef;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	
	    .goods-name {
	      // 文字不允许换行（单行文本）
	      white-space: nowrap;
	      // 溢出部分隐藏
	      overflow: hidden;
	      // 文本溢出后，使用 ... 代替
	      text-overflow: ellipsis;
	      margin-right: 3px;
	    }
	  }
	 
	}
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	  .history-list {
	    display: flex;
	    flex-wrap: wrap;
	    .uni-tag {
	      margin-top: 5px;
	      margin-right: 5px;
	    }
	  }
	}
</style>

<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
		  <uni-icons type="shop" size="18"></uni-icons>
		  <!-- 描述文本 -->
		  <text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options"  @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHander" :show-num="true" @num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
	    <!-- <image src="/s" class="empty-img"></image> -->
	    <text class="tip-text">空空如也~</text>
	  </view>
</template>

<script>
	import badgeMix from '../../mixins/tabber-badge.js';
	import { mapState,mapMutations } from 'vuex';
	export default {
		mixins:[badgeMix],
		data() {
			return {
				options:[
						{
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ]
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHander(e){
				this.updateGoodsState(e)
			},
			// 商品的数量发生了变化
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			// 点击了滑动操作按钮
			swipeActionClickHandler(goods) {
			  this.removeGoodsById(goods.goods_id)
			},
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>

import Vue from 'vue'
import Vuex from "vuex"
import moduleCart from "../store/cart"
import moduleUser from './user.js'

Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
	  m_cart:moduleCart,
	  m_user:moduleUser,
  },
})

export default store
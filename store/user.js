export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),

	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		  updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('m_user/saveUserInfoToStorage')
		  },
		  // 将 userinfo 持久化存储到本地
		    saveUserInfoToStorage(state) {
		      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		    },
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		 saveTokenToStorage(state) {
		    uni.setStorageSync('token', state.token)
		  }
	},

	getters: {
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}

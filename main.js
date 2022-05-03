// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store'
//添加网络请求@escook/request-miniprogram
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'http://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options) {
	//配置发起网络请求前的拦截功能
	uni.showLoading({
		title: '数据加载中...'
	})
}
$http.afterRequest = function() {
	//配置网络请求完毕后的拦截功能
	uni.hideLoading()
}
//封装弹出框
uni.$toastMsg = function(title = "数据加载中。。。", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
//定义改变HTTPs函数
Vue.filter('changeHttp', function(Value) {
	'http' + Value.slice(5);
	console.log(Value)
	return Value
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

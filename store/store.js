import Vue from 'vue'
import Vuex from 'vuex'
import request from '../api/request.js'
Vue.use(Vuex)
// 引入SDK核心类
var QQMapWX = require('../common/qqmap-wx-jssdk.min.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'LQDBZ-BZO63-JG43N-YMA42-Y3GNH-EXBXJ' // 必填
});  
export default new Vuex.Store({
	state:{
		city:'',
		newMovies:{}
	},
	mutations:{
		changeCity(state,r){
			state.city=r
		},
		changeNewMovies(state,r){
			state.newMovies=r
		}
	},
	actions:{
		async getNewMovies(context){
			uni.showLoading({
			    title: '加载中'
			});
			await uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					qqmapsdk.reverseGeocoder({
						location: {
						    latitude: res.latitude,
						    longitude: res.longitude
						},
						success(res){
							context.commit('changeCity',res.result.address_component.city)
							request('/v2/movie/in_theaters',{city:res.result.address_component.city}).then(res=>{
								uni.hideLoading()
								// let [err,res]=result
								context.commit('changeNewMovies',res)
							})
						}
					})
			    }
			});
		}
	}
})
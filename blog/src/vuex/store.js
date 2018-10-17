import Vue from 'vue'
import Vuex from 'vuex'
import token from './module/token'
import comment from './module/comment'
Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		token,comment
	}
})
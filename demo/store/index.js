import Vue from 'vue'
import Vuex from 'vuex'
import comment from './module/comment'
Vue.use(Vuex)
const  store = () => new Vuex.Store({
	modules:{
		comment
	}
})
export default store
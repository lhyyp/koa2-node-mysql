// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import {Loading ,Upload,Button,Icon,Input ,Radio,Pagination} from 'element-ui'

Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Button)

Vue.config.productionTip = false

store.dispatch('loginmess').finally(()=>{
  	new Vue({
	  el: '#app',
	  router,
	  store,
	  components: { App },
	  template: '<App/>'
	})
 })


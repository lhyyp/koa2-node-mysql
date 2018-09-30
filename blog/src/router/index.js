import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
    history: true,
  routes: [
    {path: '/', name: 'index', component: (resolve) => require(['@/views/index.vue'],resolve),
    	children:[
	       {path:'/',name:'index',component:(resolve) => require(['@/views/home/index'],resolve)},
	       {path:'/article',name:'article',component:(resolve) => require(['@/views/home/article'],resolve)}
	    ]
    },
    {path: '/login', name: 'login', component: (resolve) => require(['@/views/members/login'],resolve) },
    {path: '/register', name: 'register', component: (resolve) => require(['@/views/members/register'],resolve) }
  ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    	store.dispatch('loginmess').then(()=>{
	        if (store.getters.getmess) {  // 通过vuex state获取当前的token是否存在
	            next();
	        }
	        else {
	            next({
	                path: '/login',
	                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
	            })
	        }
    	})
    	
    }else {
        next();
    }
})
export default router
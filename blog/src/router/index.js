import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

Vue.use(Router)

const router = new Router({
	mode: 'history',
    history: true,
  routes: [
    {path: '/',component: (resolve) => require(['@/views/index.vue'],resolve),
    	children:[
	       {path:'/',name:'index',component:(resolve) => require(['@/views/home/index'],resolve)},	       
	       {path:'/Article',name:'Article',component:(resolve) => require(['@/views/home/article'],resolve)},
	       {path:'/MyArticle/id=:id',name:'MyArticle',meta: { requireAuth: true},component:(resolve) => require(['@/views/home/article'],resolve)}	       
	    ]
    },
    {path:'/ArticleDeail',name:'ArticleDeail',component:(resolve) => require(['@/views/home/ArticleDeail'],resolve)},
    {path: '/login', name: 'login', meta: { requireAuth: true},component: (resolve) => require(['@/views/members/login'],resolve) },
    {path: '/register', name: 'register', meta: { requireAuth: true},component: (resolve) => require(['@/views/members/register'],resolve) },
    {path: '/wangeditor', name: 'wangeditor', meta: { requireAuth: true},component: (resolve) => require(['@/views/wangeditor.vue'],resolve) }
  ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
		if(to.name == 'login' || to.name == 'register'){
			if (store.getters.getToken) {  // 通过vuex state获取当前的token是否存在
	            next({ path: '/'});
	        }else {
	        	router.app.urls = from.fullPath
	        	next();
	        }
    	}else{
    		if (store.getters.getToken) {  // 通过vuex state获取当前的token是否存在
	            next();
	        }else {
	            next({
	                path: '/login',
	                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
	            })
	        }
    	}
    }else {
        next();
    }
})
export default router
const router = require('koa-router')()
const controller = require('../controller/c-posts')
const Member = require('../controller/c-member')

router.prefix('/api')
 // 判断是否登录
router.get('/islogin',async (ctx, next) => {	
	if(ctx.session.id){
		ctx.body = ctx.session;
	}else{
		ctx.body = {
			'code' : 0,
			'message' : '未登录'
		}
	}
  
} )
// 获取banner列表
router.get('/getBanner',controller.getBannerList )
//登录
router.get('/login',Member.login)
//退出登录
router.get('/logout',Member.logout)

module.exports = router

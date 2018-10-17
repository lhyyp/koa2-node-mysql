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
//注册
router.post('/register',Member.register)

//副富文本编辑器上传图片
router.post('/uploadImg',async ctx => {	// ctx.uploadpath.files = >获取上传后文件的信息
	ctx.body = {
		'code' : 200,
		'message' : '上传成功',
		'data' : '/upload/'+ctx.uploadpath.files
	}
} )
// 发表文章页面
router.post('/create', controller.getCreate)
// 查找所有的文章分类
router.get('/getArticlepictures', controller.getArticlepictures)

// 查找所有的文章分类
router.get('/getArtiList', controller.getArtiList)
// 文章详情
router.get('/getArtiDeail', controller.getArtiDeail)
// 评论文章
router.post('/addComments', controller.addComments)
// 文章评论列表
router.get('/getCommentsList', controller.getCommentsList)

module.exports = router

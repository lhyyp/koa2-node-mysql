const Router = require("koa-router")
const router = new Router({
    prefix: '/v1/book'
})
const PositiveInteferValidator = require("../../validators/validators")
const Auth = require("../../../middlewares/auth")

router.get('/', new Auth(9).m, (ctx, next) => {
    ctx.body = { 
        uid: ctx.auth.uid ,
        scope : ctx.auth.scope
    }
})


module.exports = router
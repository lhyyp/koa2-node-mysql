const Router = require("koa-router")
const router = new Router()
const PositiveInteferValidator = require("../../validators/validators")

router.get('/v1/book',(ctx, next) => {
    ctx.body = {
        code : 200,
        data: 'book1'
    }

})

router.post('/v1/:id/book',(ctx, next) => {
    const id = ctx.params
    const v = new PositiveInteferValidator().validate(ctx)
   

    ctx.body = {
        code : 200,
        data: 'book4444'
    }
   

})
module.exports = router
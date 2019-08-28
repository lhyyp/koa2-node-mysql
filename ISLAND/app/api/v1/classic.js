const Router = require("koa-router")
const router = new Router({
    prefix: '/v1/classic'
})
const { Flow } = require("../../models/flow")
const { Art } = require("../../models/art")
const { Favor } = require("../../models/favor")
const { LikeValidator } = require("../../validators/validators")
const Auth = require("../../../middlewares/auth")
const { Success } = require("../../../utils/http-exception")



router.get('/latest', async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue("index", flow.index)
    ctx.body = new Success(art)
})


router.post('/like', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx,{id:'art_id'})
    await Favor.like(v.get("body.art_id"), v.get("body.type"), ctx.auth.uid)
    throw new Success()
})
router.post('/dislike', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx,{id:'art_id'})
    await Favor.dislike(v.get("body.art_id"), v.get("body.type"), ctx.auth.uid)
    throw new Success()
})
module.exports = router
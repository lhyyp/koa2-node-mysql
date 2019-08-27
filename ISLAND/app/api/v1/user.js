const Router = require("koa-router")
const router = new Router({
    prefix: '/v1/user'
})
const { User } = require("../../models/user")
const { RegisterValidator, TokenValidator, VerifyTokenValidator } = require("../../validators/validators")
const { Success, MissingParameters } = require("../../../utils/http-exception")
const { USER_EMAIL, USER_IPHONE, USER_MINI_PROGRAM } = require("../../lib/enum").LoginType
const { generateToken } = require("../../../utils/util")
const Auth = require("../../../middlewares/auth")
const WXManger = require("../../services/wx")

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        userName: v.get("body.userName"),
        email: v.get("body.email"),
        password: v.get("body.password1")
    }
    await User.create(user)
    throw new Success()
})

router.post('/login', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token = null
    // 处理不同的登录类型
    switch (v.get("body.type")) {
        case USER_EMAIL:
            token = await emailLogin(v.get("body.account"), v.get("body.secret"))
            break
        case USER_IPHONE:
            throw new MissingParameters("没有处理的函数")
        case USER_MINI_PROGRAM:
            token = await WXManger.codeToToken(v.get("body.account"))
            break
        default:
            throw new MissingParameters("没有处理的函数")
            break
    }
    ctx.body =  new Success({'token':token})
})

router.post("/verify", async (ctx) => {
    const v = await new VerifyTokenValidator().validate(ctx)
    const res = Auth.verifyToken(v.get("body.token"))
    ctx.body = res

})



async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return token = generateToken(user.id, Auth.USER)

}




module.exports = router
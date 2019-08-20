const Router = require("koa-router")
const router = new Router({
    prefix: '/v1/user'
})
const { User } = require("../../models/user")
const { RegisterValidator, TokenValidator } = require("../../validators/validators")
const { Success ,MissingParameters} = require("../../../utils/http-exception")
const { USER_MINI, USER_EMAIL, USER_IPHONE } = require("../../lib/enum").LoginType
const { generateToken } = require("../../../utils/util")


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
    switch (v.get("body.type")) {
        case USER_EMAIL:
              token = await emailLogin(v.get("body.account"), v.get("body.secret"))
            break;
        case USER_IPHONE:
            throw new MissingParameters("没有处理的函数")
        default:
            throw new MissingParameters("没有处理的函数")
    }
    ctx.body= {
        token
    }
})
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return token = generateToken(user.id, 2)

}




module.exports = router
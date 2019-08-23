
const { LinValidator, Rule } = require("../../utils/lin-validator")
const { User } = require("../models/user")
const { LoginType ,classicType} = require("../lib/enum")



class PositiveInteferValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt", "需要是正整数", { min: 1 }),
        ]
    }
}


class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule("isLength", "不符合规则", {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule("isOptional"),
            new Rule("isLength", "至少6个字符", {
                min: 6,
                max: 128
            })
        ]
        this.validateLoginType= checkLoginType

    }
    
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule("isEmail", "不符合Email规则"),
        ]
        this.password1 = [
            new Rule("isLength", "密码至少6个字符，最多32个字符", {
                min: 6,
                max: 32
            })
        ]
        this.password2 = this.password1
        this.userName = [
            new Rule("isLength", "昵称不符合规范", {
                min: 1,
                max: 6
            })
        ]
    }
    validatePassword(vals) {
        const password1 = vals.body.password1
        const password2 = vals.body.password2
        if (password1 != password2) {
            throw new Error("两次密码不相同")

        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error("email已存在")
        }

    }
}

class VerifyTokenValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule("isLength", "token不允许为空", {
                min: 1
            })
        ]
    }
}

function checkLoginType(vals){
    if (!vals.body.type) {
        throw new Error("type是必须参数")
    }
    if (!LoginType.isThisType(vals.body.type)) {
        throw new Error("type参数不合法")
    }  
}
function checkClassicType(vals){
    if (!vals.body.type) {
        throw new Error("type是必须参数")
    }
    if (!classicType.isThisType(vals.body.type)) {
        throw new Error("type参数不合法")
    }  
}

class LikeValidator extends PositiveInteferValidator {
    constructor() {
        super()
        this.validateType = checkClassicType
        
    }
}





module.exports = {
    PositiveInteferValidator,
    RegisterValidator,
    TokenValidator,
    VerifyTokenValidator,
    LikeValidator
} 
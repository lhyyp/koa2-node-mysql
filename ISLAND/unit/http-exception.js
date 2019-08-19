class HttpException extends Error{
    constructor(msg ="服务器错误",errorCode = 1000, code = 400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code

    }
}


class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.msg = msg
        this.errorCode = errorCode

    }
}



module.exports = { HttpException ,ParameterException}
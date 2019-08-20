class HttpException extends Error{
    constructor(msg ="服务器错误",status = 1000, code = 400){
        super()
        this.msg = msg
        this.status = status
        this.code = code

    }
}


class ParameterException extends HttpException{
    constructor(msg, status){
        super()
        this.msg = msg
        this.status = status

    }
}

class Success extends HttpException{
    constructor(msg, status){
        super()
        this.msg = msg || "ok"
        this.status = status || 200
        this.code = 201

    }
}


class NotFount extends HttpException{
    constructor(msg, status){
        super()
        this.msg = msg || "资源未找到"
        this.status = status || 401
        this.code = 404

    }
}

class Authfailed extends HttpException{
    constructor(msg, status){
        super()
        this.msg = msg || "授权失败"
        this.status = status || 401
        this.code = 401

    }
}

class MissingParameters extends HttpException{
    constructor(msg, status){
        super()
        this.msg = msg || "缺少参数"
        this.status = status || 401
        this.code = 401

    }
}


module.exports = { 
    HttpException ,
    ParameterException,
    Success,
    NotFount,
    Authfailed,
    MissingParameters
}
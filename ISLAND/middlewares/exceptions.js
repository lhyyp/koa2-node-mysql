const { HttpException } = require("../unit/http-exception")
const catchError = async (ctx, next) =>{
    try {
        await next()
    } catch (error) {
        if(process.env.NODE_ENV == 'development'){
            throw error
        }
        
        
        if(error instanceof HttpException){
            ctx.body = {
                msg : error.msg,
                errorCode : error.errorCode,
                requestUrl : `${ctx.method} ${ctx.path}`   
            }
            ctx.status = error.code
        }else{
            ctx.body = {
                msg : "未知异常",
                errorCode : 999,
                requestUrl : `${ctx.method} ${ctx.path}`   
            }
            ctx.status = 5000

        }
        
        
    }
}
module.exports = catchError
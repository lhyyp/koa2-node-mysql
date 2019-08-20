const koa = require("koa")
const InitManger = require('./utils/init.js')
const parser = require("koa-bodyparser")
const catchError = require("./middlewares/exceptions")  //异常处理


const app = new koa()
app.use(parser())
app.use(catchError)
InitManger.initCore(app)


app.listen(3005, () => {
    console.log("启动")
})

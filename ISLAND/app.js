const koa = require("koa")
const InitManger = require('./unit/init.js')
const parser = require("koa-bodyparser")
const catchError = require("./middlewares/exceptions")


const app = new koa()
app.use(parser())
app.use(catchError)
InitManger.initCore(app)


app.listen(3005, () => {
    console.log("启动")
})

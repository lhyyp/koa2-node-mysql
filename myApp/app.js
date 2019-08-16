const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');
const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const books = require('./routes/books')
const logsUtil = require('./utils/logs.js');




const koaBody = require('koa-body');
const path = require('path');
const getUploadFileExt = require('./utils/getUploadFileExt');
const getUploadFileName = require('./utils/getUploadFileName');
const checkDirExist = require('./utils/checkDirExist');
const getUploadDirName = require('./utils/getUploadDirName');



app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();
      const dir = path.join(__dirname, `public/upload/${dirName}`);
      // console.log(dir)
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(ext);
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `${dirName}/${fileName}`;
    },
  }
}));



// error handler
onerror(app)


app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 2*60*60*1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date();					          // 响应开始时间
    let intervals;								          // 响应间隔时间
    try {
        await next();
        intervals = new Date() - start;
        logsUtil.logResponse(ctx, intervals);	            //记录响应日志
    } catch (error) {
        intervals = new Date() - start;
        logsUtil.logError(ctx, error, intervals);           //记录异常日志
        ctx.response.status = error.statusCode || error.status || 500;
        ctx.response.body = {
            code: 1,
            message: error.message
        };
        ctx.app.emit('error', error, ctx); // 手动释放error事件
    }
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())
app.use(books.routes(), books.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

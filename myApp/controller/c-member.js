const userModel = require('../lib/SQL.js')
const moment = require('moment');




//登录
exports.login = async ctx => {
    // console.log(ctx.request.body)
    let { name, pass } = ctx.request.query;
    await userModel.login(name).then(result => {
            let res = result
            if (res.length && pass === res[0]['pass']) {
                ctx.session = {
                    name: res[0]['name'],
                    id: res[0]['id'],
                    avator: res[0]['avator'],
                    registrationTime: res[0]['registrationTime']
                }
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    result : result
                }
                
            } else {
                ctx.body = {
                    code: 0,
                    message: '用户名或密码错误'
                } 
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        })
}

//退出登录
exports.logout = async ctx => {
    ctx.session = null;
    ctx.body = {
        code: 200,
        message: '退出成功'
    }            
}

//注册
exports.register = async ctx => {
    let { name, pass } = ctx.request.body;
    let filesPath = ctx.uploadpath.files  // ctx.request.files = >获取上传后文件的信息    
    await userModel.login(name).then(async (result) =>{
        if(result.length>0){
            ctx.body = {
                code: 0,
                message: '该用户已存在'
            }
        }else{
            let registrationTime = moment().format('YYYY-MM-DD HH:mm:ss');
            await userModel.insertData([name, pass, filesPath, registrationTime]).then(result =>{
                ctx.session = {
                    name: name,
                    id: result.insertId,
                    avator: filesPath,
                    registrationTime: registrationTime
                }
                ctx.body = {
                    code: 200,
                    message: '注册成功',
                    result:ctx.session
                }   
            })
        }

    })
    

}
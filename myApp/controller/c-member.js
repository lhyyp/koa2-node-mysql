const userModel = require('../lib/SQL.js')

exports.login = async ctx => {
    let { name, pass } = ctx.query;
    await userModel.login(name)
        .then(result => {
            let res = result
            if (res.length && pass === res[0]['pass']) {
                ctx.session = {
                    user: res[0]['name'],
                    id: res[0]['id']
                }
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    result : result
                }
                console.log(ctx.session)
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
            console.log(err)
        })
}


exports.logout = async ctx => {
    ctx.session = null;
    ctx.body = {
        code: 200,
        message: '退出成功'
    }
              

}
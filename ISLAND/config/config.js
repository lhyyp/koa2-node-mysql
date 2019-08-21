module.exports = {
    database:{
        dbName:'island',
        host:"localhost",
        port:3306,
        user:'root',
        password:'root',
    },
    security:{
        secretKey:"1111",
        expiresIn:60*60*24
    },
    wx:{
        appId:'wx677cb3ca79d71b08',
        appSecret:'7a65b8d4a357b10ae2e50ea5e27d9232',
        loginuRL:"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
    }
}
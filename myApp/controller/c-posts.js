const userModel = require('../lib/SQL.js')

exports.getBannerList = async ctx => {
    await userModel.getBanners()
        .then(result => {
            ctx.body = {
                code: 1,
                result: result
            };
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
            console.log(err)
        })

}
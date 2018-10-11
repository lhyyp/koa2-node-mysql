const userModel = require('../lib/SQL.js')
const moment = require('moment');
// 获取banner列表
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
// 发表文章页面
exports.getCreate = async ctx => {
    let {  title ,content ,classification,abstract } = ctx.request.body;
    let picturesArticle = ctx.uploadpath.files  // ctx.request.files = >获取上传后文件的信息
    let uid = ctx.session.id;
    let author = ctx.session.name;
    let Headportrait = ctx.session.avator;
     /**
      author  => 作者
      title => 文章标题
      content => 文章内容
      uid =>  作者id
      publicationTime => 发表时间
      classification => 文章分类
      picturesArticle => 文章图片
      abstract  =>文章摘要
       => 作者头像
    */
    await userModel.insertPost([author, title, content,uid, moment().format('YYYY-MM-DD HH:mm:ss'),classification,picturesArticle,abstract,Headportrait]).then(result =>{
        ctx.body = {
            code: 200,
            message: '发表成功'
        }   
    })

}

// 查找所有的文章分类
exports.getArticlepictures = async ctx => {
    await userModel.getArticlepictures()
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
        })

}

// 查找文章列表   id  => 用户id  0 => 所有文章
exports.getArtiList = async ctx => {
    let uid = ctx.request.query.id
    await userModel.getArtiList(uid)
        .then(result => {
            if(result.length>0){
                ctx.body = {
                    code: 200,
                    msg:'请求成功',
                    result: result
                };
            }else{
                ctx.body = {
                    code: 0,
                    msg:'暂无数据'
                };
            }
            
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        })
}


// 文章详情   id  => 文章id
exports.getArtiDeail = async ctx => {
    let id = ctx.request.query.id
    await userModel.getArtiDeail(id)
        .then(result => {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
            if(result.length>0){
                ctx.body = {
                    code: 200,
                    msg:'请求成功',
                    result: result[0]
                };
            }else{
                ctx.body = {
                    code: 0,
                    msg:'找不到该文章'
                };
            }
            
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        })
}

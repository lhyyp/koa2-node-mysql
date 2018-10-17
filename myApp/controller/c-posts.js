const userModel = require('../lib/SQL.js')
const moment = require('moment');
// 获取banner列表
exports.getBannerList = async ctx => {
    await userModel.getBanners().then(result => {
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
    await userModel.getArticlepictures().then(result => {
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
    let uid = ctx.request.query.id;
    let page = ctx.request.query.page;
    let number = ctx.request.query.number;
    await userModel.findAllPostCount( uid  ).then(async (result) => {
        let count = result[0].count;   //总页数
        await userModel.findPostByPage( uid , page ,number).then(result => {
            if(result.length>0){
                ctx.body = {
                    code: 200,
                    msg:'请求成功',
                    count: count,
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
    await userModel.updateCountnum(id).then(async (result) =>{
        await userModel.getArtiDeail(id).then(result => {
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
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })      
}




/*
文章评论  
    uid => 用户id
    articleId => 文章id
    content => 评论内容
    commentTime => 评论时间
    cid => 跟随原有评论的id来产生新的评论关联cid,默认0,
    pid =>回复的评论的用户uid 默认0

*/
exports.addComments = async ctx => {
    let articleId = ctx.request.body.articleId,
        content =   ctx.request.body.content,
        cid =   ctx.request.body.cid || 0,
        pid =   ctx.request.body.pid || 0,
        commentTime =  moment().format('YYYY-MM-DD HH:mm:ss'),
        uid = ctx.session.id;
    await userModel.insertComment([uid , articleId, content, commentTime , cid,pid]).then(async (result) =>{
        await userModel.updateComments(uid).then(result => {
            ctx.body = {
                code: 200,
                msg:'评论成功'
            };              
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        })
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })      
}


/*
文章评论列表  
    articleId => 文章id
*/
exports.getCommentsList = async ctx => {
    let articleId = ctx.request.query.articleId;
    let page = ctx.request.query.page || 1;
    let number = ctx.request.query.number || 5;

    await userModel.getCommentsNumber(articleId).then(async (result) =>{
        let count = result[0].count;   //总页数
        await userModel.getComments(articleId , page ,number).then(async (result) => {      //获取文章的评论  
            if(result.length>0){
                for(var i = 0 ; i < result.length ; i++){
                    await userModel.getCommentsList(result[i].id).then(res =>{
                        result[i].list = res;
                    }).catch(err => {
                        ctx.body = {
                            code: 500,
                            message: err
                        };
                    })
                }
                ctx.body = {
                    code: 200,
                    msg:'请求成功',
                    count: count,
                    result: result
                };
            }else{
                ctx.body = {
                    code: 200,
                    msg:'暂无评论'
                };      
            }            
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        })
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })      
}
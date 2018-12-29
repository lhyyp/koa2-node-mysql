const mysql = require('mysql');
const config = require('../config/config.js')
const pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT,
  dateStrings: true
});

let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}
let  articlepictures =
          "CREATE TABLE if not exists `articlepictures` ("+
            "`id` int(11) NOT NULL AUTO_INCREMENT,"+
            "`name` varchar(255) NOT NULL COMMENT '分类名',"+
            "PRIMARY KEY (`id`)"+
          ") ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;"

let  banners = 
          "CREATE TABLE if not exists `banners` ("+
            "`id` int(11) NOT NULL AUTO_INCREMENT,"+
            "`src` varchar(255) NOT NULL COMMENT '图片路径',"+
            "`url` varchar(255) NOT NULL,"+
            "PRIMARY KEY (`id`)"+
          ") ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;"

let  comment =
        "CREATE TABLE if not exists `comment` ("+
         " `id` int(11) NOT NULL AUTO_INCREMENT,"+
          "`uid` int(11) NOT NULL COMMENT '用户id',"+
          "`articleId` int(11) NOT NULL COMMENT '文章id',"+
          "`content` text NOT NULL COMMENT '评论内容',"+
          "`commentTime` datetime NOT NULL COMMENT '评论时间',"+
          "`cid` int(11) NOT NULL COMMENT '跟随原有评论的id来产生新的评论关联cid,默认0,',"+
          "`pid` int(11) NOT NULL COMMENT '回复的评论的uid 默认0',"+
          "PRIMARY KEY (`id`)"+
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;"

let  article =
         "CREATE TABLE if not exists `article` ("+
          "`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',"+
          "`author` varchar(255) NOT NULL COMMENT '作者',"+
          "`title` varchar(255) NOT NULL COMMENT '文章标题',"+
          "`content` text NOT NULL COMMENT '文章内容',"+
          "`uid` int(11) NOT NULL COMMENT '作者id',"+
          "`publicationTime` datetime NOT NULL COMMENT '发表时间',"+
          "`pv` int(255) NOT NULL COMMENT '浏览量',"+
          "`comments` int(255) NOT NULL COMMENT '文章评论数',"+
          "`classification` int(255) NOT NULL COMMENT '文章分类',"+
          "`picturesArticle` varchar(255) NOT NULL COMMENT '文章图片',"+
          "`abstract` varchar(255) NOT NULL COMMENT '摘要',"+
          "`Headportrait` varchar(255) NOT NULL COMMENT '作者头像',"+
          "PRIMARY KEY (`id`)"+
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;"

let  user =
        "CREATE TABLE if not exists `user` ("+
        " `id` int(11) NOT NULL AUTO_INCREMENT,"+
        "`name` varchar(255) NOT NULL COMMENT '用户名',"+
        "`pass` varchar(255) NOT NULL COMMENT '密码',"+
        "`avator` varchar(255) NOT NULL COMMENT '头像',"+
        "`registrationTime` datetime NOT NULL COMMENT '注册时间',"+
        "PRIMARY KEY (`id`)"+
        ") ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;"


let createTable = ( sql ) => {
  return query( sql, [] )
}
 
// 建表
createTable(articlepictures)
createTable(banners)
createTable(comment)
createTable(article)
createTable(user)

// 获取banner
exports.getBanners = ( value ) => {
  let _sql = "select * from banners "
  return query( _sql, value )
}

// 通过名字查找该用户
exports.login = ( name ) => {
  let _sql = `select * from user where name="${name}"`
  return query( _sql)
}

// 注册用户
exports.insertData = ( value ) => {
  let _sql = "insert into user set name=?,pass=?,avator=?,registrationTime=?;"
  return query( _sql, value )
}

// 发表文章
exports.insertPost = ( value ) => {
  let _sql = "insert into article set author=?,title=?,content=?,uid=?,publicationTime=?,classification=?,picturesArticle=?,abstract=?,Headportrait=?;"
  return query( _sql, value )
}


// 查找所有的文章分类
exports.getArticlepictures = (  ) => {
  let _sql = `select * from articlepictures`
  return query( _sql)
}

// 查询所有文章数量
exports.findAllPostCount = (uid) => {
  if(uid == 0){
    let _sql = `select count(*) as count from article`
    return query( _sql)
  }else{
    let _sql = `select count(*) as count from article where uid="${uid}"`
    return query( _sql)
  }  
}
// 查询当前页的文章文章
exports.findPostByPage = ( uid ,page ,number) => {
  if(uid == 0){
    let _sql = `select * from article order by pv desc limit ${(page-1)*number},${number}`
    return query( _sql)
  }else{
    let _sql = `select * from article where uid="${uid}" order by id desc limit ${(page-1)*number},${number}`
    return query( _sql)
  } 
}


// 文章浏览量+1
exports.updateCountnum = ( id ) => {
  let _sql = `update article set pv = pv + 1 where id="${id}"`
  return   query( _sql)
}


// 文章详情
exports.getArtiDeail = ( id ) => {
  let _sql = `select * from article where id="${id}"`
  return query( _sql)
}


// 插入评论
exports.insertComment = ( value ) => {
  let _sql = "insert into comment set uid=?,articleId=?,content=?,commentTime=?,cid=?,pid=?"
  return query( _sql, value )
}


// 文章评论+1
exports.updateComments = ( id ) => {
  let _sql = `update article set comments = comments + 1 where id="${id}"`
  return query( _sql)
}

//查询文章评论（时间倒叙10）
exports.getComments = ( articleId ,page ,number) => {
  let _sql = `select c.*,u.name,u.avator from comment as c LEFT JOIN user as u on c.uid = u.id where c.cid=0 and c.articleId = "${articleId}" order by c.commentTime desc limit ${(page-1)*number},${number}`
  return query( _sql)
}
//查询评论下的评论
exports.getCommentsList = ( cid ) => {
  let _sql = `select c.*,u.name,u.avator,u2.name as pName from comment as c LEFT JOIN user as u on c.uid = u.id left join (select * from user) as u2 on c.pid = u2.id where c.cid= "${cid}" order by c.commentTime `
  return query( _sql)
}
// 查询所有评论数量
exports.getCommentsNumber = (articleId) => {
  let _sql = `select count(*) as count from comment where articleId="${articleId}" and cid = 0`
  return query( _sql)
}


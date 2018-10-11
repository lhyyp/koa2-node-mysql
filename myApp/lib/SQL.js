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
          "CREATE TABLE `articlepictures` ("+
            "`id` int(11) NOT NULL AUTO_INCREMENT,"+
            "`name` varchar(255) NOT NULL COMMENT '分类名',"+
            "PRIMARY KEY (`id`)"+
          ") ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;"

let  banners = 
          "CREATE TABLE `banners` ("+
            "`id` int(11) NOT NULL AUTO_INCREMENT,"+
            "`src` varchar(255) NOT NULL COMMENT '图片路径',"+
            "`url` varchar(255) NOT NULL,"+
            "PRIMARY KEY (`id`)"+
          ") ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;"

let  comment =
        "CREATE TABLE `comment` ("+
         " `id` int(11) NOT NULL AUTO_INCREMENT,"+
          "`uid` int(11) NOT NULL COMMENT '用户id',"+
          "`articleId` int(11) NOT NULL COMMENT '文章id',"+
          "`content` text NOT NULL COMMENT '评论内容',"+
          "`commentTime` datetime NOT NULL COMMENT '评论时间',"+
          "PRIMARY KEY (`id`)"+
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;"

let  article =
         "CREATE TABLE `article` ("+
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
        "CREATE TABLE `user` ("+
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

// 查找文章
exports.getArtiList = ( uid ) => {
  if(uid == 0){
    let _sql = `select * from article`
    return query( _sql)
  }else{
    let _sql = `select * from article where uid="${uid}"`
    return query( _sql)
  }  
}
// 文章详情
exports.getArtiDeail = ( id ) => {
  let _sql = `select * from article where id="${id}"`
  return query( _sql)
 
}
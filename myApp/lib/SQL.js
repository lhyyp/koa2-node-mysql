const mysql = require('mysql');
const config = require('../config/config.js')
const pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
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

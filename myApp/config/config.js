let config = null
console.log("process.env.NODE_ENV："+process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
    config = {
        // 启动端口
        port: 3000,
        // 数据库配置
        database: {
            DATABASE: 'blog',
            USERNAME: 'root',
            PASSWORD: 'root',
            PORT: '3306',
            HOST: 'localhost',
            DIALECT: 'mysql',
            dateStrings: true,
        }
    }
} else {
    config = {
        // 启动端口
        port: 3000,
        // 数据库配置
        database: {
            DATABASE: 'blog',
            USERNAME: 'root',
            PASSWORD: 'root',
            PORT: '3306',
            HOST: '127.0.0.1',
            DIALECT: 'mysql',
            dateStrings: true
        }
    }

}

module.exports = config
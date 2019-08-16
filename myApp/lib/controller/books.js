const books  = require('../models/books')

class Books{
    constructor(){}
    async add(ctx){
        let data = books.create({
            ownerId:1,
            name: 'lhyyp',
            gender: "db.BOOLEAN",
            birth: "hello word",
        })
        ctx.body = { code: 0, msg: '公告发布成功', result: data };
    }
    async del(ctx){
        console.log(ctx.query.id,1233)

    }

}
module.exports = new Books();
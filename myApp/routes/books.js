const router = require('koa-router')()
const books = require('../lib/controller/books')

router.get('/books/add',books.add)
router.get('/books/del',books.del)





module.exports = router
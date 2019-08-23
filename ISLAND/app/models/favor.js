
const { db } = require("../../utils/db")
const { Sequelize, Model } = require("sequelize")
const { LikeError } = require("../../utils/http-exception")
const { Art } = require("./art")

class Favor extends Model {

    static async like(art_id, type, uid) {
        // 1、添加记录
        // 2、classic fav_nums +1
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        })
        if (favor) {
            throw new LikeError()
        }

        // 开启事务
        return db.transaction(async t => {
            await Favor.create({
                art_id, type, uid
            }, { transaction: t })
            const art = await Art.getData(art_id, type)
            await art.increment("fac_nums", { by: 1, transaction: t })
        })
    }

    static async dislike(art_id, type, uid) {
        // 1、删除记录
        // 2、classic fav_nums -1
        const favor = await Favor.destroy({
            where: {
                art_id, type, uid
            }
        })
        if (!favor) {
            throw new LikeError("你未点赞")
        }

        // 开启事务
        return db.transaction(async t => {
            const art = await Art.getData(art_id, type)
            await art.decrement("fac_nums", { by: 1, transaction: t })
            await favor.destroy({
                force: true,
                transaction: t
            })
        })
    }
}

Favor.init({
    art_id: Sequelize.INTEGER,
    uid: Sequelize.INTEGER,
    type: Sequelize.TINYINT
}, {
        sequelize: db,
        tableName: "favor"
    })




module.exports = { Favor }
const { Movie, Music, Sentence } = require("./classic")

class Art {
    static async getData(art_id, type) {
        const finder = {
            where:{
                id: art_id
            }
            
        }
        let res = null
        switch (type) {
            case 1:
                res = await Movie.findOne(finder)
                break
            case 2:
                res = await Music.findOne(finder)
                break
            case 3:
                res = await Sentence.findOne(finder)
                break
            default:
                break
        }
        return res
    }
}
module.exports = { Art}
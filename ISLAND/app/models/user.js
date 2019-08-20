const bcrypt = require("bcryptjs")
const { db } = require("../../utils/db")
const { Sequelize, Model } = require("sequelize")
const { NotFount ,Authfailed,MissingParameters} = require("../../utils/http-exception")


class User extends Model {
    static async verifyEmailPassword(email, plainPassword){
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            throw new NotFount("账号不存在")
        }
        if(!plainPassword){
            throw new MissingParameters("缺少密码参数")
        }
        console.log(plainPassword,user.password)
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new Authfailed("密码不正确")
        }
        return user
    }

}


User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: ''
    },
    userName: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password",psw)
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    }
}, { sequelize: db })

module.exports = { User }
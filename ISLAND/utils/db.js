
const { Sequelize, Model } = require("sequelize")
const {
    clone,
    isArray,
    unset
} = require("lodash")
const {
    dbName,
    host,
    port,
    user,
    password
} = require("../config/config").database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: "+08:00",
    define: {
        timestamps: true,
        paranoid: true

    }
})
sequelize.sync({
    force: false
})
Model.prototype.toJSON = function () {
    let data = clone(this.dataValues)
    if (isArray(this.exclude)) {
        this.exclude.forEach(value => {
            unset(data, value)
        });
    }
    return data
}
module.exports = {
    db: sequelize
}


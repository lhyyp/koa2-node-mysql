function isThisType(val) {
    for (let key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false

}

const LoginType = {
    USER_MINI: 100,
    USER_EMAIL: 101,
    USER_IPHONE: 102,
    isThisType
}

module.exports = { LoginType } 

const {LinValidator,Rule} = require("../../unit/lin-validator")
class PositiveInteferValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule("isInt", "需要是正整数",{min:1}),
        ]
            

    

    }
}
module.exports = PositiveInteferValidator
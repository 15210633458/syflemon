var mongodb = require('mymongo1610')

//获取icon图标
function icon(req, res, next) {
    mongodb.find("icon", function(error, result) {
        if (error) {
            res.json({
                code: 0,
                mes: error
            })
        } else {
            res.json({
                code: 1,
                data: result
            })
        }
    })
}

//查询分类
module.exports = {
    icon: icon
}
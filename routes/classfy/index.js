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
function findType(req, res, next) {
    var uid = req.query.uid;
    mongodb.find("listbill", { $or: [{ uid: '*' }, { uid: uid }] }, function(error, result) {
        if (error) {
            res.json({
                code: 0,
                mes: error
            })
        } else {
            //console.log(result)
            res.json({
                code: 1,
                data: result,
            })
        }
    })
}

function addType(req, res, next) {

}
module.exports = {
    icon: icon,
    findType: findType,
    addType: addType
}
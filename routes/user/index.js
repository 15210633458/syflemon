var mongodb = require('mymongo1610')

function user(req, res, next) {
    var users = req.query.user || '';
    mongodb.insert("user", { user: users }, function(error) {
        if (error) {
            return res.json({
                code: 0,
                mes: error
            })
        }
        //console.log(result.insertedIds[0])
        res.json({
            code: 1,
            mes: "添加成功"
        })
    })
}
module.exports = user;
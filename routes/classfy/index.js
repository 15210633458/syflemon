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

//添加分类
function addType(req, res, next) {
    //获取所有传过来的值：intor ,icon,uid,type
    var parse = req.body,
        intor = parse.intor,
        icon = parse.icon,
        uid = parse.uid, //这是用户集合的(用户_id) 
        type = parse.type;
    //console.log(parse)
    //判断每一个值是否为空
    if (!intor || !icon || !uid || !type) {
        return res.json({ code: 4, mes: '缺少参数' })
    }
    //判断 这个用户是否存在,就是找用户集合中的这个用户是否存在
    mongodb.find('user', { _id: uid }, function(error, result) {
        if (error) {
            res.json({ code: 0, mes: error })
        } else {
            //存在，则result的length>0
            if (result.length) { //用户存在
                isHasclassType()
            } else { //用户不存在
                res.json({ code: 2, mes: "此用户不存在" })
            }
        }
    })

    function isHasclassType() { //在分类数据库找有没有这个分类intor,uid,type 都一样
        mongodb.find('listbill', { $and: [{ type: type }, { intor: intor }, { uid: uid }] }, function(error, result) {
            if (error) {
                res.json({ code: 0, mes: error })
            } else {
                if (result.length) {
                    res.json({ code: 3, mes: "此分类已存在" })
                } else {
                    //添加分类
                    addclassfy()
                }
            }
        })

    }
    //添加分类
    function addclassfy() {
        mongodb.insert('listbill', parse, function(error) {
            if (error) {
                res.json({ code: 0, mes: error })
            } else {
                res.json({ code: 1, mes: '添加成功' })
            }
        })
    }
}
module.exports = {
    icon: icon,
    findType: findType,
    addType: addType
}
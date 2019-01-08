var mongodb = require('mymongo1610')
    //添加账单
function addbill(req, res, next) {
    //1.判断这个用户是否存在；2.判断这个分类是否存在；3.添加；
    //获取传过来的数据
    var parse = req.body,
        uid = parse.uid, //用户的_id,用来判断用户是否存在
        timer = parse.timer,
        icon = parse.icon,
        intro = parse.intro,
        type = parse.type,
        money = parse.money,
        cid = parse.cid; //每个分类的_id

    if (!uid || !timer || !icon || !intro || !type || !money || !cid) {
        console.log(parse)
        return res.json({ code: 4, mes: "缺少参数" })
    }
    //判断是否有这个用户
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

    //判断有没有这个类
    function isHasclassType() { //在分类数据库找有没有这个分类intor,uid,type 都一样
        mongodb.find('listbill', { _id: cid }, function(error, result) {
            if (error) {
                res.json({ code: 0, mes: error })
            } else {
                if (result.length) { //这个类存在
                    //添加账单
                    add()
                } else {
                    res.json({ code: 4, mes: "没有此分类，请创建分类" })
                }
            }
        })
    }

    //添加账单
    function add() {
        mongodb.insert('rellybill', { uid: uid, timer: new Date(timer), icon: icon, intro: intro, type: type, money: money }, function(error) {
            if (error) {
                res.json({ code: 0, msg: error });
            } else {
                res.json({ code: 1, msg: '添加成功' });
            }
        })
    }
}

//获取账单
function getbill(req, res, next) {

}

module.exports = {
    addbill: addbill,
    getbill: getbill
}
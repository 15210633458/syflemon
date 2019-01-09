var mongodb = require('mymongo1610');
var mongo = require('mymongo1610/utils/getCollection.js')

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

//查询账单（1.按年查询；2.按月查询）无能怎么查询都是一个时间段
function getbill(req, res, next) {
    //传过来的数据（账单分类的每个类的自己的_id;每个类的intro;
    var params = req.query,
        timer = params.timer,
        uid = params.uid, //每个类的_id
        intro = params.intro; //每个类的介绍

    if (!timer || !uid) {
        return res.json({ code: 4, msg: '丢失参数' });
    }

    var bigtimer = null; //查询的时候，后面的那个时间段
    if (timer.indexOf('-') != -1) { //说明找到了，找到了就是按月查询的，是一个时间段
        //判断月份是12月就是今年的12月到明年的1月
        var timerArr = timer.split('-'); //把时间截开
        if (timerArr[1] == 12) { //月份是否是12

            //是的话就是把一月的时间赋值给bigtimer
            bigtimer = (timerArr[0] * 1 + 1) + '-01'; //下一年的1月
        } else {
            bigtimer = timerArr[0] + '-' + (timerArr[1] * 1 + 1) //不是12月的时候，年不变，月变成后一个月
        }
    } else {
        //按年查询 后面的那个时间段是后一年
        bigtimer = timer * 1 + 1 + '';
    }

    //开始查询
    mongo('rellybill', function(err, con, coll) {
        if (err) {
            res.json({ code: 0, mes: err })
        } else {
            //查询的条件：时间小于后一个时间段，大于当前的时间段；账单分类的_id；分类的介绍intro
            //intro 也可以是数组 {intro:{$in:intros}}
            coll.find({ $and: [{ timer: { "$lt": new Date(bigtimer), "$gt": new Date(timer) } }, { uid: uid }, { intro: intro }] }).sort({ timer: 1 }).toArray(function(error, result) {
                if (error) {
                    res.json({ code: 0, msg: error });
                } else {
                    res.json({ code: 1, data: result });
                }
                con.close();
            })

        }
    })
}

module.exports = {
    addbill: addbill,
    getbill: getbill
}
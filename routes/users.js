var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb')
    //console.log(mongodb)

/* GET users listing. */
//添加用户
router.get('/api/addUser', function(req, res, next) {
    var user = req.query.user || '';
    mongodb.getmongodb("user", function(err, con, coll) {
        if (err) {
            return res.json({
                code: 0,
                mes: err
            })
        }
        coll.insert({ user: user }, function(error, result) {
            if (error) {
                return res.json({
                    code: 0,
                    mes: error
                })
            }
            //console.log(result.insertedIds[0])
            res.json({
                code: 1,
                id: result.insertedIds[0]
            })
        })
    })
})
module.exports = router;
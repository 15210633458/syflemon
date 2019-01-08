var express = require('express');
var router = express.Router();

/* GET home page. */
//加载icon图标
// router.get('/api/icon', function(req, res, next) {
//     mongodb.getmongodb("icon", function(err, con, coll) {
//         if (err) {
//             res.json({ code: 0, mes: err })
//         } else {
//             coll.find().toArray(function(error, result) {
//                 if (error) {
//                     res.json({
//                         code: 0,
//                         mes: error
//                     })
//                 } else {
//                     res.json({
//                         code: 1,
//                         data: result
//                     })
//                 }
//             })
//         }
//     })
// });

// //添加分类
// //查询分类
// router.get('/api/findType', function(req, res, next) {
//     mongodb.getmongodb("listbill", function(err, con, coll) {
//         if (err) {
//             res.json({ code: 0, mes: err })
//         } else {
//             var uid = req.query.uid;
//             console.log(uid)
//             coll.find({ $or: [{ uid: '*' }, { uid: uid }] }).toArray(function(error, result) {
//                 if (error) {
//                     res.json({
//                         code: 0,
//                         mes: error
//                     })
//                 } else {
//                     console.log(result)
//                     res.json({
//                         code: 1,
//                         data: result,
//                     })
//                 }
//             })
//         }
//     })
// })

module.exports = router;
var express = require('express');
var router = express.Router();
var classfy = require('./classfy/index.js');
//console.log(classfy)


/* GET home page. */

//加载icon图标
router.get('/api/icon', classfy.icon);


//查询分类
router.get('/api/findType', classfy.findType)

//添加分类
router.post('/api/addType', classfy.addType)
module.exports = router;
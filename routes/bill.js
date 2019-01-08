var express = require('express');
var router = express.Router();
var bill = require('./bill/index.js')

console.log(bill)
    /* GET home page. */

//添加账单
router.post('/api/addbill', bill.addbill);

//获取账单
router.get('/api/getbill', bill.getbill);
module.exports = router;
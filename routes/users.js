var express = require('express');
var router = express.Router();
var user = require('./user')
    //console.log(mongodb)

/* GET users listing. */
//添加用户
router.post('/api/addUser', user)
module.exports = router;

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  var data = {
    code: 0,
    data: { name: 'aaa', pwd: '123' },
    isSuccess: true,
    msg: "请求成功"
  }
  res.json(data);
});
/* post home page. */
router.post('/', function (req, res, next) {
  console.log(req.body);
});

router.post('/index', function (req, res, next) {
  console.log(req.body);
});

module.exports = router

var express = require('express');
var router = express.Router();
var Tags = require('../models/tags')
var Categories = require('../models/categories')
var ArticleList = require('../models/articleList')
var User = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 请求得到标签
 */
router.get('/api/getTags', function (req, res) {
  Tags.find(function (err, tags) {
    if (err) {
      alert('错误')
    }
    res.send(tags)
  })
})
/**
 * 请求得到分类
 */
router.get('/api/getCgies', function (req, res) {
  Categories.find(function (err, Cgies) {
    if (err) {
      alert('错误')
    }
    res.send(Cgies)
  })
})
/**
 * 得到文章列表
 */
router.get('/api/getArticleList', async function (req, res) {
  // 删除所有的数据
  // Categories.deleteMany({ cgyName: /^[a-zA-Z0-9_]{1,}$/ }, function (err) {console.log(err);});
  // Categories.deleteMany({ cgyName: 'vue' }, function (err) { });

  await ArticleList.find(function (err, ArticleList) {
    if (err) {
      console.log('错误');
    }
    res.send(ArticleList)
  })
})
/**
 * 根据分类得到文章列表
 */
router.get('/api/getArtByTag', function (req, res) {

  ArticleList.find({
    tagName: req.query.tagName
  }, function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.send(data)
  })
})
/**
 * 根据标签得到文章列表
 */
router.get('/api/getArtByCgy', function (req, res) {
  console.log(req.query);

  ArticleList.find({
    cgyName: req.query.cgyName
  }, function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.send(data)
  })
})
/**
 * 根据文章id得到文章数据
 */
router.get('/api/getArtlistById', function (req, res) {
  const { id } = req.query
  ArticleList.findById({ _id: id }, function (err, art) {
    res.send({ code: 0, data: art })
  })
})


// router.get('/deleteAllUser', (req, res) => {

//   // User.find(function(err, users){
//   //   res.send({code: 0, data: users})
//   // })

//   const {key} =  req.query
//   if (key === '1249434465') {
//     User.deleteMany({username: /[a-zA-z]/}, function (err, user){
//       User.find({username: /[a-zA-z]/}, function(err, users){
//         console.log(users);
//         res.send({code: 0, data: users})
//       })
//     })
//   }else{
//     res.send({code: 1, msg: '请输入key'})
//   }
// })

// router.post('/delete', function (req, res) {
//   const {name, pwd} = req.body
//   if (name ==='delete' && pwd === 'delete') {
//     UserModel.deleteMany({type: 'dashen'}, function (err, user) {
//       UserModel.find({type: 'dashen'}, function (err, users) {
//         res.send({code: 0, data: users})
//       })
//     })
//   }
// })



module.exports = router;

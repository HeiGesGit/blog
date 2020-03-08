var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Tags = require('../models/tags')
var Categories = require('../models/categories')
var ArticleList = require('../models/articleList')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')
// const md5 = require('blueimp-md5')
const app = express()
const Cookies = require('js-cookie')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 账号注册请求
router.post('/api/register', function (req, res, next) {

  var body = req.body
  User.findOne({
    $or: [
      { email: body.email },
      { username: body.username }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server Error'
      })
    }
    // 如果邮箱存在
    if (data) {
      return res.status(200).json({
        err_code: 1,
        msg: 'email or nickname is already exited'
      })
    }

    // md5重复加密
    // body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Server Error'
        })
      }
      const data = {
        id: user._id,
        name: user.username
      }

      res.status(200).json({
        code: 0,
        data: data
      })
    })

  })

})

// 账户登录请求
router.post('/api/login', async (req, res) => {
  
  const { username, password } = req.body
  // 1. 根据用户名查找用户
  const user = await User.findOne({ username }).select('+password')
  // console.log(user);
  // assert(user, 422, '用户不存在')
  if (!user) {
    return res.send({
      code: 1,
      message: '用户不存在'
    })
  }
  // 2. 校验密码
  const isVaild = require('bcryptjs').compareSync(password, user.password)
  // console.log(isVaild);
  if (!isVaild) {
    return res.send({
      code: 1,
      message: '账号或密码错误'
    })
  }
  // 3. 返回token
  const token = jwt.sign({ id: user._id }, req.app.get('secret'))
  res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7})
  res.send({ code: 0, token, data: user })

})



// 添加标签
router.post('/api/addTag', function (req, res, next) {
  var body = req.body

  Tags.findOne({
    tagName: body.tagName
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server Error'
      })
    }

    // 如果邮箱存在
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'email or nickname is already exited'
      })
    }

    // 保存至数据库
    new Tags(body).save(function (err, tag) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Server Error'
        })
      }

      return res.status(200).json({
        err_code: 0,
        foo: 'OK'
      })
    })
  })

  // 设置一个假数据
  // var body2 = { name: '小明' }

})
// 删除标签
router.get('/api/tags/delete', function (req, res) {
  Tags.findOneAndRemove({ _id: req.query.id }, function (err, data) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '删除失败'
      })
    }
    res.status(200).json({
      err_code: 0,
      msg: 'ok'
    })
  })
})

// 添加分类
router.post('/api/addCgy', function (req, res, next) {
  var body = req.body

  // console.log(body);
  // Categories.find(function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log(data);
  // })
  // console.log(body.cgyName);

  Categories.findOne({
    cgyName: body.cgyName.toLowerCase()
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server Error'
      })
    }

    // 如果标签存在
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'email or nickname is already exited'
      })
    }

    // 保存至数据库
    new Categories(body).save(function (err, tag) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Server Error'
        })
      }

      return res.status(200).json({
        err_code: 0,
        foo: 'OK'
      })
    })
  })
})
// 删除标签
router.get('/api/cgies/delete', function (req, res) {
  console.log(req.query.id);

  // Tags.findByIdAndRemove(req.query.id)
  Categories.findOneAndRemove({ _id: req.query.id }, function (err, data) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '删除失败'
      })
    }
  })
})

// 发布文章
router.post('/api/updateArticle', function (req, res, ) {
  // console.log('okok');
  const body = req.body
  // console.log(body);
  new ArticleList(body).save(function (err, tag) {
    if (err) {
      // console.log(err);
      return res.status(500).json({
        err_code: 500,
        message: 'Server Error'
      })
    }

    // res.redirect('/')
    return res.status(200).json({
      err_code: 0,
      foo: 'OK'
    })

  })
})
// 删除文章
router.get('/api/article/delete', function (req, res) {
  ArticleList.findOneAndRemove({ _id: req.query.id }, function (err) {
    if (err) {
      res.status(500).json({
        err_code: 500,
        message: '删除失败'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  })
})

// app.use( (err, req, res, next) => {
//   // console.log(err);
//   res.status(422).send({
//     message: err.message
//   })
// })



module.exports = router;

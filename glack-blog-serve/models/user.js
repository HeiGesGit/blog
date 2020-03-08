var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/user', {useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  // 必须项
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },

  // 非必须
  created_time: {
    type: Date,
    // 不能写死不加(),方法的返回值就是default的值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-max-img.png'
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  bio: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 1表示不可以评论,2表示不登录使用, 0没有限制
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
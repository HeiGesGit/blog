var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema({
  // 必选
  tagName: {
    type: String,
    required: true
  },
  cgyName: {
    type: String,
    required: true
  },
  articleDataForStr: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
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

})

module.exports = mongoose.model('ArticleList', Schema)
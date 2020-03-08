var mongoose = require('mongoose')

var tagSchema = new mongoose.Schema({
  // 必选
  tagName: {
    type: String,
    required: true
  },
  
  // 非必须
  created_time: {
    type: Date,
    default: Date.now
  }

})


module.exports = mongoose.model('Tags', tagSchema)
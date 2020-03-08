var mongoose = require('mongoose')

var cateSchema = new mongoose.Schema({
  // 必选
  cgyName: {
    type: String,
    required: true
  },
  
  // 非必须
  created_time: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Categories', cateSchema)

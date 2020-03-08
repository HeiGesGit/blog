module.exports =  () => {

  const mongoose = require('mongoose')
  // 该配置需要在schema的配置上使用
  // mongoose.set('useFindAndModify', false);
  mongoose.createConnection('mongoose://127.0.0.1:27017/node-vue-moba')
  
};

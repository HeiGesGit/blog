import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
})
axios.defaults.withCredentials = true

// 全局定义错误处理
http.interceptors.response.use((res) => {
  return res
}, (err) => {
  Vue.prototype.$message({
    type: 'error',
    message: err
  })
  return console.log(err)
})

// 拦截请求验证token
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = 'Bearer ' + localStorage.token

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default http

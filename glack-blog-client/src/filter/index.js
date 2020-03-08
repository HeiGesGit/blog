import Vue from 'vue'
// import moment from 'moment'

// Vue.filter('date-format', function (value, formatStr = "YYYY-MM-DD HH:mm:ss") {
// return moment(value).format(formatStr)
// })

import { format } from 'date-fns'
Vue.filter('date-format', function (value, formatStr = 'yyyy-MM-dd HH:mm:ss') {
  // return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
  return format(value, formatStr)
})

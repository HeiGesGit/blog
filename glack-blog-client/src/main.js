import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store/index'

// 全局注册mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 导入http模块
import http from './http'

//  导入时间过滤器
import './filter/index'

import { MessageBox, Message } from 'element-ui'

import { Tabbar, TabbarItem } from 'vux/src/components/tabbar'
Vue.component('Tabbar', Tabbar)
Vue.component('TabbarItem', TabbarItem)

Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(store)
Vue.use(mavonEditor)

router.replace('/maincenter/1')
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

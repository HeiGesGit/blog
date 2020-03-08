import Vue from 'vue'
import VueRouter from 'vue-router'
import CenterAbout from '../components/Main/MainCenter/CenterAbout'
import CenterLabel from '../components/Main/MainCenter/CenterLabel'
import CenterClassify from '../components/Main/MainCenter/CenterClassify'
import CenterArchives from '../components/Main/MainCenter/CenterArchives'
import CenterMyproject from '../components/Main/MainCenter/CenterMyproject'
import ArticleView from '../components/Main/MainCenter/ArticleView'
import CenterSocail from '../components/Main/MainCenter/CenterSocail'
import Login from '../components/common/Login'
import MainCenter from '../components/Main/MainCenter/MainCenter'
// import ArticleView from '../components/Main/MainCenter/ArticleView.vue'

// 禁止全局路由打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: MainCenter,
      children: [
        {
          path: '/maincenter/1',
          component: CenterAbout
        },
        {
          path: '/maincenter/2',
          component: CenterLabel
        },
        {
          path: '/maincenter/3',
          component: CenterClassify
        },
        {
          path: '/maincenter/4',
          component: CenterArchives
        },
        {
          path: '/maincenter/5',
          component: CenterMyproject
        },
        {
          path: '/maincenter/7/:id',
          component: ArticleView
        },
        {
          path: '/maincenter/6',
          component: CenterSocail
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]

})

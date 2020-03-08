<template>
  <div id="app">
    <div>
      <!-- 顶部背景栏 -->
      <TopBg />
      <!-- 中间卡片栏 -->
      <CenterCard />
      <!-- 中间mian部分 -->
      <Main />
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import '../public/css/main.css'
import TopBg from './components/TopBg/TopBg'
import CenterCard from './components/CenterCard/CenterCard'
import Main from './components/Main/Main'
import Cookies from 'js-cookie'

export default {
  name: 'app',
  components: {
    TopBg,
    CenterCard,
    Main
  },
  methods: {
    updateLogin () {
      const userid = Cookies.get('userid')
      console.log(userid)

      if (userid) {
        // 将登录状态改变为已登录
        this.$store.commit('updateLogin', true)
      } else {
        this.$store.commit('updateLogin', false)
      }
    }
  },
  mounted () {
    this.updateLogin()
    const FastClick = require('fastclick')
    FastClick.attach(document.body)
  },
  updated () {
    this.updateLogin()
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.weui-bar__item_on .weui-tabbar__label{
  color: #409EFF !important;
}

</style>

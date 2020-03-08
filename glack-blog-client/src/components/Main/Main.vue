<template>
  <div>
    <div class="main">
      <div class="main_left">
        <LeftNav />
        <LeftBottom />
      </div>
      <MainCenter v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
import LeftNav from './LeftNav/LeftNav'
import LeftBottom from './LeftBottom/LeftBottom'
import MainCenter from './MainCenter/MainCenter'
export default {
  components: {
    LeftNav,
    LeftBottom,
    MainCenter
  },
  data () {
    return {
      isRouterAlive: true,
      screenWidth: document.body.clientWidth, // 屏幕宽度
      timer: false
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  watch: {
    screenWidth (val) {
      const isMobile = this.$store.state.isMobile
      if (!this.timer) {
        if (val >= 768) {
          // pc端
          setTimeout(() => {
            this.$store.commit('updateIsMobile', false)
          }, 0);
        } else {
          // 移动端
          this.$store.commit('updateIsMobile', true)
        }
        this.timer = true
        setTimeout(() => {
          this.timer = false
        }, 400)
      }
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    __choiceWidth () {
    }
  },
  created() {
    let screen = document.body.clientWidth
    if (screen >= 768) {
      // pc端
      this.$store.commit('updateIsMobile', false)
    } else {
      // 移动端
      this.$store.commit('updateIsMobile', true)
    }
  },
  mounted () {
    // 监听窗口大小
    window.onresize = () => {
      return (() => {
        let screen = document.body.clientWidth
        this.screenWidth = screen
         if (screen >= 768) {
          // pc端
          this.$store.commit('updateIsMobile', false)
        } else {
          // 移动端
          this.$store.commit('updateIsMobile', true)
        }
      })()
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 768px){
  .main {
    width: 80%;
    margin: 0 auto;
    // border: 1px solid red;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .main_left{
      width: 25%;
    }
  }
}
@media (max-width: 768px){
  .main{
    width: 100%;
    margin-top: 24px;
    .main_left{
      // overflow: scroll;
    }
  }
}
</style>

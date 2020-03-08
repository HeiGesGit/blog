<template>
  <div>
    <div class="center_card">
      <div class="card_left">
        <Menu mode="horizontal" router :default_active="1">
          <Submenu index="1">
            <template slot="title">了解博主</template>
            <menu-item index="/maincenter/1">关于我</menu-item>
            <menu-item index="/maincenter/6">友链</menu-item>
            <menu-item @click="goPath('http://heiheiheiheihei.xyz/')">blog(hexo)</menu-item>
          </Submenu>
          <Submenu index="2">
            <template slot="title">其他网址</template>
            <menu-item @click="goPath('http://vuejs.org/')">Vue</menu-item>
            <menu-item @click="goPath('https://vuex.vuejs.org/zh/guide/')">Vuex</menu-item>
            <menu-item @click="goPath('https://router.vuejs.org/zh/guide/')">Vue-Router</menu-item>
            <menu-item
              @click="goPath('https://element.eleme.cn/#/zh-CN/component/quickstart')"
            >Element-UI</menu-item>
          </Submenu>
        </Menu>
      </div>
      <div class="card_center">
        <!-- 这里是一个音乐播放器 -->
      </div>
      <div class="card_right" v-popover:el_popover>
        <div class="card_info">
          <div class="right_name">Glack</div>
          <div class="right_address">
            <i></i>
            江西宜春
          </div>
        </div>
        <div class="right_photo">
          <img src="../../../public/images/zp.png" alt width="100%" />
        </div>
      </div>
    </div>

    <Popover placement="top-start" trigger="hover" ref="el_popover" width="200">
      <div class="popover_info">
        <p>Glack</p>
        <Button class="btn_pop_info" @click="pathTo('/maincenter/1')">个人信息</Button>
      </div>
      <img src="../../../public/images/zp_hurge.jpg" width="100%" />
    </Popover>
  </div>
</template>

<script>
import { Menu, Submenu, MenuItem, Popover, Button } from 'element-ui'
export default {
  data () {
    return {
      alertShow: false
    }
  },
  methods: {
    enterLeave () {
      this.alertShow = !this.alertShow
    },
    enterLeave2 () {
      this.alertShow = false
    },
    goPath (path) {
      this.$store.commit('openNewWindow', path)
    },
    pathTo (path) {
      this.$router.push(path)
    }
  },
  components: {
    Menu,
    MenuItem,
    Popover,
    Submenu,
    Button
  }
}
</script>

<style lang="scss" scoped>
.center_card {
  display: flex;
  justify-content: space-between;
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  border-radius: 7px;
  margin: -20px auto;
  padding: 3px;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  .card_left {
    @media (min-width: 768px) {
      width: 40%;
    }
    @media (max-width: 768px) {
      width: 74%;
    }
    .el-menu-demo {
      // border-radius: 12px;
      background: transparent;
    }
  }
  // .card_center {
  // }
  .card_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card_info {
      margin-right: 5px;
      .right_name {
        font-size: 16px;
        font-weight: 800;
      }
      .right_address {
        font-size: 12px;
      }
    }
    .right_photo {
      width: 40px;
      height: 40px;
    }
  }
}
.popover_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  p {
    font-size: 15px;
    font-weight: 600;
  }
  .btn_pop_info {
    border: none;
    background-color: transparent;
  }
}
</style>

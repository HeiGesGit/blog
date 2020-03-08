<template>
  <div class="left_nav" ref="left_nav" style="overflow: hidden">
    <div ref="wrapper" class="warpper" v-if="!$store.state.isMobile">
      <Menu
        :default-active="$route.path"
        router
        v-for="item in navList"
        :key="item.title"
      >
        <menu-item :index="'/maincenter/' + item.index" style="paddingLeft:'10px'">
          <i :class="item.icon_class"></i>
          <span slot="title">{{ item.title }}</span>
        </menu-item>
      </Menu>
    </div>
    <div class="tap" v-else>
      <tabbar>
        <tabbar-item selected link="/maincenter/2">
          <img slot="icon" src="../../../assets/icons/biaoqian.png" />
          <img slot="icon-active" src="../../../assets/icons/biaoqian-a.png" />
          <span slot="label">标签</span>
        </tabbar-item>
        <tabbar-item link="/maincenter/4">
          <img slot="icon" src="../../../assets/icons/wenzhang.png" />
          <img slot="icon-active" src="../../../assets/icons/wenzhang-a.png" />
          <span slot="label">文章</span>
        </tabbar-item>
        <tabbar-item link="/maincenter/5">
          <img slot="icon" src="../../../assets/icons/xiangmu.png" />
          <img slot="icon-active" src="../../../assets/icons/xiangmu-a.png" />
          <span slot="label">项目</span>
        </tabbar-item>
        <tabbar-item link="/maincenter/1">
          <img slot="icon" src="../../../assets/icons/guanyuwomen.png" />
          <img slot="icon-active" src="../../../assets/icons/guanyuwomen-a.png" />
          <span slot="label">关于我</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { Menu, MenuItem } from 'element-ui'

export default {
  data () {
    return {
      mobile: true,
      navList: [
        { title: '关于', path: 'about', icon_class: 'el-icon-user', index: 1 },
        {
          title: '标签',
          path: 'label',
          icon_class: 'el-icon-collection-tag',
          index: 2
        },
        {
          title: '分类',
          path: 'classify',
          icon_class: 'el-icon-s-unfold',
          index: 3
        },
        {
          title: '存档',
          path: 'archives',
          icon_class: 'el-icon-s-release',
          index: 4
        },
        {
          title: '项目',
          path: 'myproject',
          icon_class: 'el-icon-folder-opened',
          index: 5
        },
        {
          title: '社交',
          path: 'social',
          icon_class: 'el-icon-mobile-phone',
          index: 6
        }
      ],
      screenWidth: document.body.clientWidth, // 屏幕宽
      screeHeight: document.body.clientHeight // 屏幕高
    }
  },
  components: {
    Menu,
    MenuItem
  },
  methods: {
    // goToMainCenter (index) {
    //   // console.log(index)
    //   this.$router.push('/maincenter/' + index)
    // }
  },
  mounted () {
    // if (parseInt(this.screenWidth) <= '768') {
    //   this.$refs.left_nav.style.top = this.screenHeight + 56 + 'px'
    // }
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.left_nav, {
        scrollX: true,
        click: true
      })
      // console.log(this.scroll)
    })
  }
}
</script>

<style lang="scss">

@media (min-width: 768px) {
  .left_nav {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    .el-menu-vertical-demo {
      width: 80%;
    }
  }
}
@media (max-width: 768px) {
  .left_nav {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    // width: 600px;
    .warpper {
      width: 200%;
      height: 56px;
    }
    ul {
      width: 16.4%;
      margin: 0 auto;
      float: left;
      background-color: #fff;
      li {
        margin: 0 auto;
        padding: 0 27px;
      }
    }
  }
}
.weui-tabbar{
  position: fixed !important;
  width: 100%;
}
.weui-tabbar__icon {
  box-sizing: border-box !important;
  padding: 5px !important;
}
</style>

<template>
  <div class="left_nav" ref="left_nav">
    <div ref="wrapper" class="warpper">
      <!-- <el-menu default-active="1" class="el-menu-vertical-demo" v-for="item in navList" :key="item.title">
        <el-menu-item @click="goToMainCenter(item.index)">
          <i :class="item.icon_class"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>-->
      <el-menu
        :default-active="$route.path"
        class="el-menu-horizontal-demo"
        router
        v-for="item in navList"
        :key="item.title"
      >
        <el-menu-item :index="'/maincenter/' + item.index" style="paddingLeft:'10px'">
          <i :class="item.icon_class"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
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
  components: {},
  methods: {
    // goToMainCenter (index) {
    //   // console.log(index)
    //   this.$router.push('/maincenter/' + index)
    // }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.left_nav, {
        scrollX: true,
        click: true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
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
    .warpper{
      width: 200%;
      height: 56px;
    }
    ul {
      i {
        // display: none;
      }
      width: 16.4%;
      margin: 0 auto;
      float: left;
      background-color: #fff;
      li{
        margin: 0 auto;
        padding: 0 27px;
      }
    }
  }
}
</style>

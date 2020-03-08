<template>
  <div class="top_bg" ref="topbg" :style="elMain">
    <div class="lgrg" v-if="!$store.state.isLogin">
      <div class="login" @click="$router.push('/login')">登录</div>
      <div class="register" @click="isShowRegister = ! isShowRegister" v-if="false">注册</div>
    </div>
    <div class="change">
      <button class="change_left" @click="change(0)">
        <i class="el-icon-arrow-left"></i>
      </button>
      <button class="change_right" @click="change(1)">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
    <div class="welcome">
      <h1 class="name">Glack</h1>
      <div class="des">欢迎来到Glack的博客</div>
      <div class="btn_group">
        <Button class="top_btn" @click="goPath('https://github.com/HeiGesGit')">GitHup主页</Button>
        <Button
          class="top_btn"
          @click="goPath('https://github.com/HeiGesGit/Glack_Blog.git')"
        >博客源码</Button>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  data () {
    return {
      elMain: {
        backgroundImage: 'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)'
        // backgroundImage: 'linear-gradient(to right, #4568dc, #b06ab3)'
      },
      arrColor: [
        'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
        'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)',
        'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
        'linear-gradient(to right, #4568dc, #b06ab3)',
        'linear-gradient(to right, #16a085, #f4d03f)',
        'linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)',
        'linear-gradient(to right, #ef33b1, #f6e6bc)'
      ],
      currentIndex: 1,
      isShowLogin: false,
      isShowRegister: false,
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    goPath (path) {
      this.$store.commit('openNewWindow', path)
    },
    change (index) {
      if (index) {
        // 显示下一个颜色
        // this.elMain.backgroundImage = 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)'
        this.currentIndex++
        if (this.currentIndex > this.arrColor.length - 1) {
          this.elMain.backgroundImage = this.arrColor[0]
          this.currentIndex = 0
        } else {
          this.elMain.backgroundImage = this.arrColor[this.currentIndex]
        }
      } else {
        // 显示上一个颜色
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.elMain.backgroundImage = this.arrColor[this.arrColor.length - 1]
          this.currentIndex = this.arrColor.length - 1
        } else {
          this.elMain.backgroundImage = this.arrColor[this.currentIndex]
        }
      }
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
.top_bg {
  @media (min-width: 768px) {
    height: 360px;
  }
  @media (max-width: 768px) {
    height: 250px;
  }
  height: 360px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .lgrg {
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.4rem;
    cursor: pointer;
  }
  .change {
    display: none;
    width: 100%;
    position: absolute;
    button {
      background-color: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 50%;
      padding: 10px;
      cursor: pointer;
      i {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    button:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
    button:focus {
      outline: none;
    }
    .change_left {
      float: left;
      margin-left: 10px;
    }
    .change_right {
      float: right;
      margin-right: 10px;
    }
  }
  .welcome {
    display: inline-block;
    text-align: center;
    font-size: 20px;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      color: #fff;
    }
    .btn_group {
      .top_btn {
        color: rgba(255, 255, 255, 0.7);
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.7);
      }
    }
  }
}
.top_bg:hover .change {
  display: block;
}

@media (max-width: 768px) {
}

.alert_login{
  z-index: 1000;
  position: absolute;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #bbb;
  border-radius: 16px;
  color: #000;
}
@media (max-width: 768px) {
  .alert_login{
    width: 70%;
    transform: translateY(100%);
  }
}

.alert_register{
  z-index: 1000;
  position: absolute;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #bbb;
  border-radius: 16px;
  color: #000;
}
@media (max-width: 768px) {
  .alert_register{
    width: 70%;
    transform: translateY(100%);
  }
}
</style>

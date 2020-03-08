<template>
  <Card>
    <div class="alert_login" v-show="true">
      <div style="font-size: 30px; text-align: center">请输入您的账号</div>
      <Input v-model="model.username" placeholder="请输入账号" style="margin-bottom: 10px" width="80%"></Input>
      <Input v-model="model.password" placeholder="请输入密码"></Input>
      <Button @click="login" style="margin-top: 10px; width:100%">登录</Button>
    </div>
    <div class="alert_register" v-show="false">
      <div style="font-size: 30px">注册</div>
      <Input v-model="model.username" placeholder="请输入账号" style="margin-bottom: 10px"></Input>
      <Input v-model="model.password" placeholder="请输入密码" type="password" style="margin-bottom: 10px"></Input>
      <Input v-model="model.email" placeholder="请输入邮箱"></Input>
      <Button @click="register" style="margin-top: 10px">注册</Button>
    </div>
  </Card>
</template>

<script>
import Cookies from 'js-cookie'
import { Card, Input, Button } from 'element-ui'
export default {
  data () {
    return {
      isShowLogin: true,
      model: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    async login () {
      const { username, password } = this.model
      if (!username || !password) {
        return this.$message.error({
          type: 'fail',
          message: '文本不能为空'
        })
      }
      const res = await this.$http.post('/users/api/login', this.model)
      console.log(res)

      if (res.data.code === 0) {
        // 注册一个cookie到本地
        const userid = res.data.data._id
        Cookies.set('userid', userid, { expires: 7 })
        this.isShowLogin = !this.isShowLogin
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        this.$store.commit('updateLogin', true)
        this.$router.push('/maincenter/1')
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    },
    async register () {
      const { username, password, email } = this.model
      if (!username || !password || !email) {
        return this.$message.error({
          type: 'fail',
          message: '文本不能为空'
        })
      }
      const res = await this.$http.post('/users/api/register', {
        username,
        password,
        email
      })
      if (res.data.code === 0) {
        console.log(res)
        const userid = res.data.data.id
        Cookies.set('userid', userid, { expires: 7 })
        this.$message({
          type: 'success',
          message: '注册成功'
        })
        this.isShowRegister = false
        this.$store.commit('updateLogin', true)
      } else {
        this.$message({
          type: 'fail',
          message: res.data.msg
        })
      }
    }
  },
  components: {
    Card,
    Button,
    Input
  }
}
</script>

<style lang="scss">
</style>

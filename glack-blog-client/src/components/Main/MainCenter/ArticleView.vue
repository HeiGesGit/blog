<template>
  <transition name="fade">
    <div class="article_view">
      <Card class="box-card">
        <div slot="header" class="clearfix">
          <div>
            <div class="title">{{artdata.title}}</div>
            <div class="creat_time">发表日期 {{ create_time }}</div>
          </div>
          <div class="btn_group">
            <Button
              style="padding: 3px 0; margin-right:15px;"
              type="text"
              @click="deleteArt()"
              v-if="$store.state.isLogin"
            >删除此文章</Button>
            <Button @click="goBack" style="float: right; padding: 3px 0" type="text">返回</Button>
          </div>
        </div>
        <div class="body">
          <div class="content" v-html="artdatamd"></div>
          <!-- 标签 -->
          <div class="tag">标签: {{artdata.tagName}}</div>
          <!-- 分类 -->
          <div class="cgy">分类: {{artdata.cgyName}}</div>
        </div>
      </Card>
    </div>
  </transition>
</template>

<script>
import { Button, Card } from 'element-ui'
import { format } from 'date-fns'
export default {
  data () {
    return {
      artdata: {},
      articleDataForStr: ''
    }
  },
  inject: ['reload'],
  methods: {
    goBack () {
      this.$router.go(-1) // 返回上一层
    },
    deleteArt () {
      const id = this.artdata._id
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const res = this.$http.get('/api/users/article/delete', { params: { id } })
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              msg: res.data.msg
            })
            this.$router.go(0)
          }
        })
        .catch(() => {
          // console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async getArtcleByid (id) {
      const res = await this.$http('/api/getArtlistById', { params: { id } })
      if (res.data.code === 0) {
        const artdata = res.data.data
        this.artdata = artdata
        this.articleDataForStr = artdata.articleDataForStr
      } else {
        this.$message({
          type: 'error',
          message: 'serve error'
        })
      }
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.getArtcleByid(id)
  },
  computed: {
    create_time: function () {
      let formatStr = 'yyyy-MM-dd HH:mm:ss'

      const value = new Date(this.artdata.created_time)
      try {
        return format(value, formatStr)
      } catch (err) {
        return err
      }
    },
    artdatamd: function () {
      // var marked = require('marked')
      // this.htmlMarked = marked('I am using __markdown__.')
      // console.log(this.htmlMarked)

      // 将文本转化为md格式
      var marked = require('marked')
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })

      const artContent = this.articleDataForStr
      return marked(artContent)
    }
  },
  components: {
    Button,
    Card
  }
}
</script>

<style lang="scss" scoped>
// 渐隐动画
.fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
.fade-enter-active {
  transition: all 0.8s ease;
}

.article_view {
  .clearfix {
    .title {
      font-size: 30px;
    }
    .creat_time {
      font-size: 12px;
      color: #555;
    }
    display: flex;
    justify-content: space-between;
  }
  .content {
    padding: 17px;
  }
}
</style>

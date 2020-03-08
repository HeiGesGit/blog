<template>
  <transition name='fade'>
    <div class="center_archives">
    <Card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>

        <transition name="fade">
          <div v-if="artIsShow">
          <mavon-editor v-model="articleDataForStr" class="mavon_editor" />
          <Row class="btnGroup">
            <Input v-model="title" placeholder="请输入标题"></Input>
            <Input v-model="tagName" placeholder="请输入标签"></Input>
            <Input v-model="cgyName" placeholder="请输入分类"></Input>
            <Button type="primary" @click="artIsShow = ! artIsShow">退出</Button>
            <Button type="success" @click="postArt">发布</Button>
          </Row>
        </div>
        </transition>
        <Button
          style="float: right; padding: 3px 0"
          type="success"
          @click="artIsShow = ! artIsShow"
          v-if="$store.state.isLogin"
        >点击发表文章</Button>
      </div>
      <div class="article_item">
        <div class="article_list" v-for="(item, index) in ArticleList" :key="index">
          <Link class="article_title" @click="showArticleView(item._id)">{{ item.title }}</Link>
          <div class="article_update">{{ new Date(item.created_time) | date-format }}</div>
        </div>
      </div>
    </Card>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { Button, Link, Card, Input, Row } from 'element-ui'

export default {
  inject: ['reload'],
  data () {
    return {
      artIsShow: false,
      articleDataForStr: '',
      tagName: '',
      cgyName: '',
      title: '',
      htmlMarked: ''
    }
  },
  methods: {
    postArt () {
      this.$http
        .post('/users/api/updateArticle', {
          tagName: this.tagName,
          cgyName: this.cgyName,
          title: this.title,
          articleDataForStr: this.articleDataForStr
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '发表成功'
          })
          this.artIsShow = false
          this.reload()
        })
        // .catch(err => {
        //   console.log(err)
        // })
    },

    // 初始化文章列表
    __initArticles () {
      var marked = require('marked')
      this.htmlMarked = marked('I am using __markdown__.')
      this.$store.dispatch('getArticleList')
    },

    showArticleView (id) {
      this.$router.push({
        path: '/maincenter/7/' + id
      })
    }
  },
  mounted () {
    this.__initArticles()
  },
  computed: {
    ...mapState(['ArticleList'])
  },
  components: {
    Button,
    Link,
    Card,
    Input,
    Row
  }
}
</script>

<style lang="scss" scoped>
// 移动动画
.move-enter {
  opacity: 0;
  transform: translateX(100%);
}
.move-enter-active {
  transition: all 0.5s ease;
}

// 渐隐动画
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.8s ease;
}

.center_archives {
  .clearfix {
    .mavon_editor {
      position: absolute;
      width: 100%;
      height: 80%;
      left: 0;
      top: 0;
    }
    .btnGroup {
      position: absolute;
      top: 85%;
      display: flex;
      justify-content: space-between;
      left: 15%;
      z-index: 2;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.6);
    }
  }

  .article_item {
    .article_list {
      display: flex;
      justify-content: space-between;
      padding: 4px;
      .article_update {
        font-size: 10px;
      }
    }
  }
}
</style>

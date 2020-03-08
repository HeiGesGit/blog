<template>
  <transition name="fade">
    <div class="center_label">
      <Card class="box-card">
        <div slot="header" class="clearfix">
          <span v-show="!isShowArtList">目前共有{{tagsList.length}}个标签:</span>
          <transition name="fade">
            <span v-show="isShowArtList">#{{ currentTag }}</span>
          </transition>
          <Button
            style="float: right; padding: 3px 0;"
            type="text"
            v-show="isShowArtList"
            @click="goback"
          >返回</Button>
          <Button
            style="float: right; padding: 3px 0; margin-right:15px;"
            type="text"
            v-show="isShowArtList"
            v-if="$store.state.isLogin"
            @click="deleteTag()"
          >删除此标签</Button>
          <Button
            style="float: right; padding: 3px 0;"
            type="text"
            maxlength="6"
            @click="isShow = !isShow"
            v-if="$store.state.isLogin"
            v-show="!isShowArtList"
          >添加标签</Button>
          <transition name="move">
            <Card class="box-card alert_add_tag" v-if="isShow">
              <div class="el-card__body">
                请输入你想要添加的标签名:
                <Input v-model="tagName" style="width: 30%" size="mini"></Input>
                <Button size="small" type="text" round @click="save">确认保存</Button>
                <Button size="small" type="text" round @click="isShow = !isShow">取消</Button>
              </div>
            </Card>
          </transition>
        </div>
        <!-- 所有标签 -->
        <div class="label_item" v-if="!isShowArtList">
          <div class="label_list" v-for="(item, index) in tagsList" :key="index">
            <Button type="text" class="__list" @click="showArtList(item)">#{{item.tagName}}</Button>
          </div>
        </div>
        <!-- 当前标签下的文章 -->
        <transition name="move">
          <div class="article_item" v-if="isShowArtList">
            <div class="article_list" v-for="(item, index) in artlistByTag" :key="index">
              <el-link class="article_title" @click="showArticleView(index)">{{ item.title }}</el-link>
              <div class="article_update">{{ new Date(item.created_time) | date-format}}</div>
            </div>
          </div>
        </transition>
      </Card>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { Card, Button, Input } from 'element-ui'
export default {
  props: ['isShowTag'],
  inject: ['reload'],
  data () {
    return {
      tagName: '',
      isShow: this.isShowTag,
      tagsList: [],
      visible: false,
      isShowArtList: false,
      currentTag: '',
      currentTagById: ''
    }
  },

  methods: {
    __initTags () {
      this.$http
        .get('/api/getTags')
        .then(res => {
          if (res.status === 200) {
            this.tagsList = res.data
          }
        })
        // .catch(err => {
        //   console.log(err)
        // })
    },
    async save () {
      // 添加到数据库,更新state等等
      // try {
      await this.$http
        .post('/users/api/addTag', {
          tagName: this.tagName
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.err_code === 0) {
            // 成功
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.$router.go(0)
          } else if (res.data.err_code === 1) {
            this.$message.error('email or password is already exited')
          }
        })
        .catch(err => {
          err = ''
          this.$message.error('Server Error')
        })
      this.$router.push('/maincenter/2')
      this.isShow = !this.isShow
    },
    showArtList (item) {
      this.currentTag = item.tagName
      this.currentTagById = item._id
      // console.log(this.currentTagById)
      this.$store.dispatch('getArtByTag', {
        tagName: item.tagName
      })
      this.isShowArtList = !this.isShowArtList
    },
    goback () {
      this.isShowArtList = !this.isShowArtList
    },
    showArticleView (index) {
      this.$router.push({
        path: '/maincenter/7',
        query: { ArticleList: this.artlistByTag, artIndex: index }
      })
    },
    deleteTag () {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('deleteByTagId', this.currentTagById)
          // this.$router.go(0)
          // 刷新当前路由
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted () {
    this.__initTags()
  },
  computed: {
    ...mapState(['ArticleList']),
    ...mapState(['artlistByTag'])
  },
  components: {
    Card,
    Button,
    Input
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

.center_label {
  .clearfix {
    .alert_add_tag {
      position: absolute;
      right: auto;
      top: auto;
    }
  }
  .label_item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .__list :hover {
      border-bottom: 1px solid #409eff;
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

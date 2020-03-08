<template>
  <transition name='fade'>
    <div class="center_classify">
    <Card class="box-card">
      <div slot="header" class="clearfix">
        <span v-show="!isShowArtList">目前共有{{ cgiesList.length }}个分类:</span>
        <span v-show="isShowArtList">#{{ currentCgy }}</span>
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
          @click="deleteCgy()"
        >删除此标签</Button>
          <Button style="float: right; padding: 3px 0" type="text" @click="isShow = !isShow" v-show="!isShowArtList" v-if="$store.state.isLogin">添加分类</Button>
        <transition name="move">
          <Card class="box-card alert_add_tag" v-if="isShow">
          <div class="el-card__body">
            请输入你想要添加的分类名:
            <Input v-model="cgyName" style="width: 30%" size="mini"></Input>
            <Button size="small" type="text" round @click="save">确认保存</Button>
            <Button size="small" type="text" round @click="isShow = !isShow">取消</Button>
          </div>
        </Card>
        </transition>
      </div>
      <!-- 分类列表 -->
      <div class="category_item" v-show="!isShowArtList">
        <div class="category_list" v-for="(item, index) in cgiesList" :key="index">
          <Button class="__list" type="text" @click="showArtList(item)">#{{item.cgyName}}</Button>
        </div>
      </div>
      <!-- 当前分类下的文章 -->
      <transition name="move">
        <div class="article_item" v-if="isShowArtList">
        <div class="article_list" v-for="(item, index) in artlistByCgy" :key="index">
          <Link class="article_title" @click="showArticleView(index)">{{ item.title }}</Link>
          <div class="article_update">{{ new Date(item.created_time) | date-format }}</div>
        </div>
      </div>
      </transition>
    </Card>
  </div>
  </transition>

</template>

<script>
import { mapState } from 'vuex'
import { Card, Button, Link, Input } from 'element-ui'
export default {
  data () {
    return {
      cgyName: '',
      isShow: false,
      cgiesList: [],
      isShowArtList: false,
      currentCgy: ''
    }
  },
  inject: ['reload'],
  mounted () {
    this.__initCgies()
  },
  methods: {
    __initCgies () {
      this.$http
        .get('/api/getCgies')
        .then(res => {
          if (res.status === 200) {
            this.cgiesList = res.data
            // console.log(this.cgiesList)
          }
        })
        // .catch(err => {
        //   console.log(err)
        // })
    },
    async save () {
      await this.$http
        .post('/users/api/addCgy', {
          cgyName: this.cgyName
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
          res.redirect('/maincenter/1')
        })
        .catch(err => {
          // console.log(err)
          err = ''
          // this.$message.error('Server Error')
        })
      this.isShow = !this.isShow
      this.$router.push('/maincenter/3')
    },
    showArtList (item) {
      this.currentCgy = item.cgyName
      this.currentCgyById = item._id
      // console.log(this.currentTagById)
      this.$store.dispatch('getArtByCgy', {
        cgyName: item.cgyName
      })
      this.isShowArtList = !this.isShowArtList
    },
    goback () {
      this.isShowArtList = !this.isShowArtList
    },
    deleteCgy () {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('deleteByCgyId', this.currentCgyById)
        this.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showArticleView (index) {
      this.$router.push({
        path: '/maincenter/7',
        query: { ArticleList: this.artlistByCgy, artIndex: index }
      })
    }

  },
  computed: {
    ...mapState(['ArticleList']),
    ...mapState(['artlistByCgy'])
  },
  components: {
    Card, Button, Link, Input
  }
}
</script>

<style lang="scss" scoped>
// 移动动画
.move-enter {
  opacity: 0;
  transform: translateX(100%);
}
.move-enter-active{
  transition: all 0.5s ease;
}

// 渐隐动画
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: all 0.8s ease;
}

.center_classify {
  .alert_add_tag {
    position: absolute;
    right: auto;
    top: auto;
  }
  .category_item {
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

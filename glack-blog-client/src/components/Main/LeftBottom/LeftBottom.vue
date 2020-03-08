<template>
  <div class="left_bottom" v-if="!$store.state.isMobile">
    <Card>
      <div slot="header" class="clearfix">
        <span>最近文章</span>
      </div>
      <div class="article_list" v-for="(item, index) in articlelist" :key="index" @click="showArticleView(item._id)">
        <Link class="article_title">{{item.title}}</Link>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card, Link } from 'element-ui'
export default {
  data () {
    return {
      // ArticleList:
    }
  },
  computed: {
    articlelist () {
      return this.$store.state.ArticleList
    }
  },
  methods: {
    showArticleView (id) {
      this.$router.push({
        path: '/maincenter/7',
        query: { id }
      })
    }
  },
  components: {
    Card,
    Link
  }
}
</script>

<style lang="scss" scoped>
.left_bottom {
  width: 100%;
  border: 1px solid #e4e4e4;
  margin-top: 10px;
  .article_list {

    .article_title {
      margin: 5px 0;
      display: inline-block;
    }
  }
}
</style>

<template>
  <transition name='fade'>
    <div class="center_myproject">
    <Card class="box-card">
      <Input placeholder="请输入搜索内容" style="width:40%"></Input>
      <Button icon="el-icon-search" circle style="margin-left:10px"></Button>
      <Button icon="el-icon-share" circle type="warning"></Button>
    </Card>
    <div class="card_list" v-for="(item, index) in gitDataList" :key="index">
      <Card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-data"></i>
          <span>{{item.name}}</span>
          <Button
            style="padding: 3px 0; float: right;"
            type="text"
            @click="gopath(item.gitPath)"
          >前往Githup</Button>
          <Button class="el-icon-share" style="float: right; padding: 3px 0" type="text"></Button>
        </div>
        <div class="project_content">
          <div class="update_time">上传时间:{{item.update}}</div>
          <div class="project_name">{{item.des}}</div>
          <div class="content_bottom">
            <div class="gift_star">
              <div class="star">
                <i class="el-icon-star-off"></i>
                {{item.getGitfs[0]}}
              </div>
              <div class="watch">
                <i class="el-icon-stopwatch"></i>
                {{item.getGitfs[1]}}
              </div>
              <div class="fork">
                <i class="el-icon-upload"></i>
                {{item.getGitfs[2]}}
              </div>
            </div>
            <div>
              <Tag type="danger" class="small" style="margin-right:8px">vue</Tag>
              <Tag type="success" class="small">javascript</Tag>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
  </transition>
</template>

<script>
import { Card, Input, Button, Tag } from 'element-ui'
export default {
  data () {
    return {
      gitDataList: [
        {
          name: 'Glack_blog',
          des: '这是glack的个人博客',
          update: '2019-10-10',
          gitPath: 'https://github.com/HeiGesGit/Glack_Blog.git',
          getGitfs: [5, 10, 12]
        },
        {
          name: 'elemei',
          des: '这是一个仿的一个外卖平台,数据使用mock模拟得到',
          update: '2018-10-10',
          gitPath: 'https://github.com/HeiGesGit/Elemei.git',
          getGitfs: [1, 3, 10]
        },
        {
          name: 'shopApp',
          des: '这是一个vue的购物案例',
          update: '2017-10-10',
          gitPath: 'https://github.com/HeiGesGit/shopApp',
          getGitfs: [3, 1, 19]
        }
      ]
    }
  },
  methods: {
    gopath (path) {
      this.$store.commit('openNewWindow', path)
    }
  },
  components: {
    Card,
    Input,
    Button,
    Tag
  }
}
</script>

<style lang="scss" scoped>
.center_myproject {
  .box-card {
    margin-top: 10px;
  }
  .card_list {
    margin-bottom: 10px;
    .box-card {
      .project_content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .update_time {
          font-size: 13px;
          color: #909399;
        }
        .project_name {
          line-height: 30px;
        }
        .content_bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .gift_star{
            width: 32%;
            display: flex;
            justify-content: space-around;
          }
        }
      }
    }
  }
}

// 渐隐动画
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.8s ease;
}
</style>

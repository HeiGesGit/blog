/* eslint-disable vue/no-parsing-error */
<template>
  <div class="center_about">
    <div class="el-card box-card is-always-shadow">
      <div class="el-card__header">
        <div class="author_name">
          <i class="el-icon-s-custom"></i>
          关于Glack
        </div>
        <div class="card_introduce">
          <p class="card_sub_content">Email:</p>
          <p class="card_content">1249434465@qq.com</p>
          <p class="card_sub_content">Blog:</p>
          <p class="card_content">
            <!-- <el-button size="mini" class="content_btn" @click="goBlog">heiheiheiheihei.xyz</el-button> -->
            <Link href="http://heiheiheiheihei.xyz/" target="_blank">heiheiheiheihei.xyz</Link>
          </p>
          <p class="card_sub_content">Tel:</p>
          <p class="card_content">13576599725</p>
          <!-- <p>qqEmail: 1249434465@qq.com</p>
            <p>tel: 13576599725</p>
          <p>blog: heiheiheiheihei.xyz</p>-->
        </div>
      </div>
      <div class="el-card__body">
        <p>我是Glack,真名左俊宇,是一位前端攻(ban)城(zhuan)狮(de)。</p>
        <p>目前是一位在校大学生,喜欢研究比较前沿的一些web框架,熟练使用Vue,全家桶。</p>
        <p>正如你所见,2019年下半年一直想动手打造自己的博客网站,终于到了毕业前一个月开始了我的个人博客开发之路。</p>
        <p>
          之前使用的是用
          <a class="logo">Hexo</a> 的搭建的个人blog,灵活性远远不如自己做的。
        </p>
        <p>
          这次的博客系统使用了
          <a class="logo">Vue</a> 全家桶,
          <a class="logo">Element-UI</a> 等技术。
        </p>
        <p>当然了,我只是一个前端爱好者,在审美设计上还是有许多不足的地方,如果你有更好的想法,创意或者寻求帮助的话,可以发邮件(1249434465@qq.com)给我。</p>
        <p>最后,祝自由快乐。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Link } from "element-ui";
export default {
  components: {
    Link
  }
};
</script>

<style lang="scss" scoped>
.center_about {
  .el-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .author_name {
      font-size: 20px;
      color: #000;
    }
    img {
      text-align: center;
    }
    .card_introduce {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .card_sub_content {
        font-size: 10px;
        color: #909399;
      }
      .card_content {
        font-size: 13px;
        .content_btn {
          background-color: transparent;
          border: none;
        }
      }
    }
  }
  .el-card__body {
    .logo:hover {
      color: #e6a23c;
    }
    .logo {
      cursor: pointer;
      color: #4bc0c8;
      font-size: 15px;
    }
    p {
      font-size: 14px;
      color: #909399;
      line-height: 24px;
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

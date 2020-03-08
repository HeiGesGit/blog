<template>
  <div class="center_social">
    <Carousel indicator-position="outside">
    <carousel-item v-for="(item, index) in list" :key="index">
      <h3>{{item}}</h3>
    </carousel-item>
  </Carousel>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
export default {
  data () {
    return {
      calList: '有待开发'
    }
  },
  methods: {
    // __initCal () {
    //   this.$http.get('http://easy-mock.ncgame.cc/mock/5d8f6319f274710a8d2161d8/bilibili/swiperList').then((res) => {
    //     if (res.status === 200) {
    //       this.calList = res.data.swiperList
    //       console.log(this.calList)
    //     }
    //   }).catch(() => {

    //   })
    // }
  },
  mounted () {
    // this.__initCal()

  },
  computed: {
    list () {
      return this.calList.split('')
    }
  },
  components: {
    Carousel, CarouselItem
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 50px;
    opacity: 0.75;
    line-height: 300px;
    margin: auto 45%;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

@media (max-width: 768px){
  .center_social{
    width: 100%;
    height: 270px;
  }
}
</style>

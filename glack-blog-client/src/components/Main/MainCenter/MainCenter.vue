<template>
  <div class="main_center">
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tagName: '',
      isShowTag: false
    }
  },
  methods: {},
  components: {
  }
}
</script>

<style lang="scss">
@media (max-width: 768px){
  .main_center {
    width: 100%;
    margin-bottom: 56px;
    .fade-enter-active .fade-leave-active{
      transition: all 2s;
    }
    .fade-leave-to, .fade-enter {
      transform: translateX(20px)
    }
  }
}
@media (min-width: 768px){
  .main_center {
   text-align: center;
    width: 99%;
    padding-left: 10px;
    .fade-enter-active .fade-leave-active{
      transition: all 2s;
    }
    .fade-leave-to, .fade-enter {
      transform: translateX(20px)
    }
  }
}
</style>

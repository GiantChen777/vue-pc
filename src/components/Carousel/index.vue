<template>
  <!-- 为了组件的复用性，应该自定义ref属性 -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in carouselList" :key="banner.id">
        <!-- <img src="./images/banner1.jpg" /> -->
        <img :src="banner.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
              <img src="./images/banner2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner4.jpg" />
            </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swpier轮播图插件
import Swiper from 'swiper'
// 引入swiper样式
// import 'swiper/swiper-bundle.css'
// core version + navigation, pagination modules:
import { Navigation, Pagination, Autoplay } from 'swiper'
// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay])

export default {
  name: 'Carousel',
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    carouselList() {
      this.$nextTick(() => {
        // 然后这里就不应该new同一个类名，这样使用的就是同一个组件，并且在watch监听组件中，数据只更新一次，
        //因为在ListContainer组件中，一上来要先渲染DOM元素，才会有数据，因为数据是异步请求的，所以我们在watch中监视数据的发现变化，但数据只会请求一次，所以轮播图数据只会请求一次
        if (this.swiper) return
        this.inSwpier()
      })
    },
  },
  methods: {
    inSwpier() {
      // 给实例对象上面添加swiper方法
      this.swiper = new Swiper(this.$refs.swiper, {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    },
  },
  mounted() {
    /* 
      1. ListContainer组件
        一上来没有数据 -- 触发watch
      2. Floor 
        一上来就有数据 -- mounted  
    */
    //  然后在下面小的轮播图数据的时候，数据我们已经请求到，只需要在DOM元素渲染完成的时候，数据也有了，
    if (!this.carouselList.length) return
    this.inSwpier()
  },
}
</script>
<style lang="less" scoped>
</style>

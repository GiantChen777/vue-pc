<template>
  <div class="swiper-container">
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
import 'swiper/swiper-bundle.css'
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
        new Swiper('.swiper-container', {
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
      })
    },
  },
}
</script>
<style lang="less" scoped>
</style>

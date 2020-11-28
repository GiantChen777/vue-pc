<template>
  <div>
    <Header />
    <!-- 显示组件 -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isFootershow"></Footer>
    <!-- <Footer v-if="!$route.meta.isHideFooter"></Footer> -->
  </div>
</template>

<script>
import Header from './components/Headers'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>
<style scoped>
</style>

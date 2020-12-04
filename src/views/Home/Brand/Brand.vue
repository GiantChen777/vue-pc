<template>
  <div class="brand">
    <div class="py-container">
      <ul class="brand-list">
        <!-- <li class="brand-item">
          <img src="./images/brand_21.png" />
        </li> -->
        <li class="brand-item" v-for="bran in brand" :key="bran.id">
          <img :src="bran.imgURL" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Brand',
  computed: {
    ...mapState({
      brand: (state) => state.home.brand,
    }),
  },
  methods: {
    ...mapActions(['getbrand']),
  },
  mounted() {
    this.getbrand()
  },
}
</script>

<style lang="less" scoped>
.brand {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .brand-list {
      overflow: hidden;
      padding: 15px 0;
      background: #f7f7f7;
      line-height: 18px;

      .brand-item {
        width: 120px;
        float: left;
        height: 37px;

        img {
          border-left: 1px dotted #ccc;
          padding: 0 10px;
        }

        &:first-child {
          img {
            border-left: 0;
          }
        }
      }
    }
  }
}
</style>
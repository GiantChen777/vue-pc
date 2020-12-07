<template>
  <div class="spec-preview">
    <!-- 中图区域 -->
    <img :src="imgUrl" />
    <!-- <div class="event" @mousemove="move" ref="event"></div> -->
    <div class="event" @mousemove="move"></div>
    <!-- 大图区域 -->
    <div class="big">
      <img :src="BigimgUrl" ref="bigImg" />
    </div>
    <!-- 绿色的遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    BigimgUrl: String,
  },
  methods: {
    move(event) {
      let left, top
      const mask = this.$refs.mask
      const bigImg = this.$refs.bigImg
      // 获取事件的offsetX/offsetY,maskDiv的宽度maskWidth
      const { offsetX, offsetY } = event
      // 计算left、top
      left = offsetX - 100
      top = offsetY - 100
      // left和top必须在[0, maskWidth]区间内
      if (left < 0) {
        left = 0
      } else if (left > 200) {
        left = 200
      }
      if (top < 0) {
        top = 0
      } else if (top > 200) {
        top = 200
      }

      // 指定mask <div>的坐标值(left, top)
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 指定大图 <img>的坐标值(left, top)
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    },
    /* move(e) {
      let x = e.offsetX - 100
      let y = e.offsetY - 100
      // console.log(x);
      // console.log(y);
      if (x <= 0) {
        x = 0
      }
      if (x >= 200) {
        x = 200
      }
      if (y >= 200) {
        y = 200
      }
      if (y <= 0) {
        y = 0
      }

      this.$refs.mask.style.left = x + 'px'
      this.$refs.mask.style.top = y + 'px'
      this.$refs.bigImg.style.left = -2 * x + 'px'
      this.$refs.bigImg.style.top = -2 * y + 'px'
    }, */
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
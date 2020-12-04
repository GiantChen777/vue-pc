<template>
  <div class="pagination">
    <button
      @click="setCurrentPage(myCurrentPage - 1)"
      :disabled="myCurrentPage <= 1"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <!-- 这里要进行遍历，遍历的区间在start和end -->
    <!-- (end - start + 1) 这个就是中间显示遍历的按钮数据-->
    <!-- 下一步点击的时候，我们更新 myCurrentPage的值，这样start和end数据就会重新值,需要传我们点击的值-->
    <button
      v-for="item in startEnd.end - startEnd.start + 1 >= 1
        ? startEnd.end - startEnd.start + 1
        : 0"
      :key="item"
      @click="setCurrentPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      <!-- item就是我们内次遍历出来的数字，1~5的数字 -->
      {{ startEnd.start + item - 1 }}
    </button>
    <button v-show="startEnd.end < totalNumber - 1">...</button>
    <!-- 结尾 -->
    <!-- totalNumber表示页数 -->
    <button
      :class="{ active: myCurrentPage === totalNumber }"
      v-show="totalNumber > 1"
      @click="setCurrentPage(totalNumber)"
    >
      {{ totalNumber }}
    </button>
    <!-- 然后判断当点击到最后一个的时候，要禁用下一页 ,禁用设置完之后我们需要点击的时候更新数据-->
    <button
      @click="setCurrentPage(myCurrentPage + 1)"
      :disabled="myCurrentPage >= totalNumber"
    >
      下一页
    </button>
    <button>总数：{{ total }}</button>
  </div>
</template>

<script>
export default {
  // 分页器
  /* current-page="options.pageNo"
            :pager-count="7"
            :page-size="5"
            :total="total" 
             current-page:表示当前的页码，默认值是应该是1，是一个可读被点击的 
          pager-count：分页器显示多少个按钮
          page-size：每页显示多少条数据
          total：总的数量
            */
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pagerCount: {
      type: Number,
      validator(val) {
        // 验证，验证通过才会有用
        // 大于等于 5 且小于等于 21 的奇数
        // 返回true验证成功，
        // 返回false验证失败
        return val >= 5 && val <= 21 && val % 2 === 1
      },
      default: 7,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    // 总数
    total: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  data() {
    return {
      // 为了方便修改myCurrentPage，定义data数据
      // 原因：props数据只读不能修改
      // myCurrentPage就是我们所需要点的分页器上面的数字进行切换的
      myCurrentPage: this.currentPage,
    }
  },
  watch: {
    // 监听每次触发的点击页码发生变化，然后就触发更新数据的请求
    myCurrentPage(currentPage) {
      this.$emit('current-change', currentPage)
    },
    // 最后一步：当外面页面发生变化，里面页面也要变化，监听currentPage的变化
    currentPage(currentPage) {
      this.myCurrentPage = currentPage
    },
  },
  methods: {
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage
    },
  },
  computed: {
    // 第一步，首先得到总页数
    totalNumber() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算分页器除去开头和结尾中间显示按钮的start和end
    // 从this上面解构赋值得到我们计算start和end 的数量
    startEnd() {
      const { myCurrentPage, pagerCount, totalNumber } = this
      // 获取中间的显示的按钮部分
      const count = pagerCount - 2
      // 然后获取中间的一半
      const halfCount = Math.floor(count / 2)

      // 然后获取start、end,需要考虑三种情况，一头一尾和中间
      let start, end
      if (start > totalNumber) return
      if (myCurrentPage >= totalNumber - halfCount) {
        start = totalNumber - count
      } else {
        start = myCurrentPage - halfCount
      }
      if (start <= 1) {
        start = 2
      }
      end = start + count - 1
      if (end >= totalNumber) {
        end = totalNumber - 1
      }
      return {
        start,
        end,
      }
    },
  },
}
</script>
<style lang='less' scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>

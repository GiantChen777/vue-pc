<template>
  <!-- 商品分类导航 -->
  <div class="type-nav" @mouseleave="issearchshow = false">
    <div class="container">
      <h2 class="all" @mouseenter="issearchshow = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="search">
        <div class="sort" v-show="ishomeshow || issearchshow">
          <div class="all-sort-list2" @click="gosearch">
            <div
              class="item bo"
              v-for="category in categoryList"
              :key="category.categoryId"
            >
              <h3>
                <!-- 放置一级分类 -->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dt>
                      <!-- 二级分类名称 -->
                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        >{{ child.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="grandChild in child.categoryChild"
                        :key="grandChild.categoryId"
                      >
                        <!-- 三级分类名称 -->
                        <a
                          :data-categoryName="grandChild.categoryName"
                          :data-categoryId="grandChild.categoryId"
                          :data-categoryType="3"
                          >{{ grandChild.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TypeNav',
  // 初始化数据,是一个数组，方便后面便利渲染数据,初始化响应式数据
  data() {
    return {
      // 判断路劲是不是在home组件。是的话，就显示，不是的话就隐藏
      ishomeshow: this.$route.path === '/',
      issearchshow: false,
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 15)
      },
    }),
  },
  /*   // 在组件挂载的时候就响应数据，
  async mounted() {
    const result = await reqGetBaseCategoryList()
    this.categoryList = result.slice(0, 14)
  }, */
  methods: {
    ...mapActions(['getCategoryList']),
    // 通过事件委托事件，给外层父级绑定事件，通过data-xxx,自定义事件来给元素添加上数据，然后函数中，通过e.target.dataset可以获取到我们自定义事件的参数和数据，
    gosearch(e) {
      const { categoryname, categoryid, categorytype } = e.target.dataset

      //判断是不是点的为空，为空内容的话就不跳转
      if (!categoryname) return

      // 判断有没params参数，有的话需要加上params参数在路径上面
      const location = {
        name: 'search',
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      }
      // 判断当前是否有params参数，有加上
      const { searchText } = this.$route.params

      if (searchText) {
        location.params = {
          searchText,
        }
      }

      this.$router.push(location)
    },
  },
  mounted() {
    // 减少请求的数据，请求同一数据的时候，就没次请求的数据的时候，判断请求的是不是同一数据，是的话就直接return
    //我们就判断categoryList（这个是我们的数据），看这里面有没有数据，有的话，就直接return
    if (this.categoryList.length) return
    // 在组件挂载成功的时候调用actions函数，获取数据
    this.getCategoryList()
  },
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.search-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }
      &.search-enter-to {
        height: 461px;
      }
      &.search-enter {
        height: 0px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 然后在根据里面有没有内容，我们判断哪个li显不显示使用v-show -->
            <!-- 然后下一步我们当点击删除按钮的时候，search搜索框的内容也要被清空掉，因为一个是header组件，另一个是search组件，是兄弟关系，所以使用全局事件总线需要 -->
            <li class="with-x" @click="delkeyword" v-show="options.keyword">
              关键词： {{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              @click="delcategoryName"
              v-show="options.categoryName"
            >
              分类名称： {{ options.categoryName }}<i>×</i>
            </li>
            <!-- 品牌的那个li标签 -->
            <li class="with-x" @click="deltrademark" v-show="options.trademark">
              品牌： {{ options.trademark.split(':')[1] }}<i>×</i>
            </li>

            <!-- 品牌属性数据的那个li -->
            <!-- 因为有多个，所以需要遍历生成这个li,,,key的值使用这个prop，因为里面既包含id，还因为prop是一个特殊的值，不会重复，所以可以使用 -->
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delprop(index)"
            >
              {{ prop.split(':')[2] }}： {{ prop.split(':')[1] }}<i>×</i>
            </li>

            <!--  <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li> -->
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" :addProps="addProps" />
        <!-- <TypeNav /> -->
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 这里class类名active'就要写成动态的类名，不然不好转换 -->
                <!-- 左边是key active类名，右边是value，为true就是有这个类名，为false就是没有这个类名， -->
                <li
                  :class="{ active: options.order.indexOf('1') > -1 }"
                  @click="setOrder('1')"
                >
                  <!-- 可以通过跟上面一样的来判断字体图标的为true或者是false，来让图标字体进行切换 -->
                  <a
                    >综合
                    <i
                      :class="{
                        iconfont: true,
                        'icon-falling': isDone, //降序
                        'icon-rising': !isDone, //升序
                      }"
                    ></i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: options.order.indexOf('2') > -1 }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格
                    <div>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-arrow-up': true,
                          deactive: options.order.indexOf('2') > -1 && isShow, //升序
                        }"
                      ></i>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-arrow-down': true,
                          deactive: options.order.indexOf('2') > -1 && !isShow, //降序
                        }"
                      ></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">{{
                      goods.title
                    }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- size-change点击每页的那个页面显示多少条 -->
          <!-- current-change点击页码的那个页面显示那个页面 -->
          <!--  <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="5"
            background
            layout=" prev, pager, next, sizes,total, jumper"
            :total="total"
          >
          </el-pagination> -->
          <!--
          current-page:表示当前的页码，默认值是应该是1，是一个可读被点击的 
          pager-count：分页器显示多少个按钮
          page-size：每页显示多少条数据
          total：总的数量
           -->
          <!--  @current-change="handleCurrentChange" 是一个自定义事件，可以通过监听currentPage的值从而触发函数更新数据 -->
          <Pagination
            @current-change="handleCurrentChange"
            :current-page="options.pageNo"
            :pager-count="7"
            :page-size="5"
            :total="total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
import TypeNav from '@comps/TypeNav'
import Pagination from '@comps/Pagination'

export default {
  name: 'Search',
  data() {
    return {
      // 初始化data对象（在search组件请求数据的时候可能会携带参数）
      options: {
        category1Id: '', //一级分类id
        category2Id: '', //二级分类id
        category3Id: '', //三级分类id
        categoryName: '', //分类名称
        keyword: '', //搜索关键字（params参数
        order: '1:desc', //排序方式
        pageNo: 1, //分页页码（当前在第几页）
        pageSize: 10, //分页 的每页商品数量
        props: [], //商品属性
        trademark: '', //商品品牌
      },
      isDone: true, //综合排序的图标，
      isShow: false, //价格
    }
  },
  components: {
    SearchSelector,
    TypeNav,
    Pagination,
  },
  computed: {
    ...mapGetters(['goodsList', 'total']),
  },
  methods: {
    ...mapActions(['getProductList']),
    UpdateProductList(pageNo = 1) {
      const { searchText: keyword } = this.$route.params
      // 结构赋值得到query参数
      const {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query
      // 当数据变化的时候，我们就直接更新options的初始化的值
      const options = {
        ...this.options, //携带上所有初始化数据
        keyword, //以下更新的数据后会覆盖之前得到的数据
        categoryName,
        category1Id,
        category2Id,
        category3Id,
        pageNo,
      }
      // 想要keyword得到数据，就需要给我们初始化定义的数据重新赋值
      this.options = options

      this.getProductList(options)
      // console.log(options)
    },
    // s删除keyword的内容
    delkeyword() {
      this.options.keyword = ''
      this.$bus.$emit('clearsearch')
      //删除关键字之后，清楚路径params参数(这一步操作完之后，我们使之不管在那个页面，当点击回退按钮，都跳回到首页)
      this.$router.replace({
        name: 'search',
        params: '',
        query: this.$route.query,
      })
    },
    // 删除categoryName的内容，然后根据里面的内容判断显不显示
    delcategoryName() {
      this.options.categoryName = ''
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      // 点击删除categoryName的内容之后，清除query参数
      this.$router.replace({
        name: 'search',
        params: this.$route.params,
        query: '',
      })
    },
    // 添加品牌数据和删除品牌数据
    addTrademark(trademark) {
      if (this.options.trademark) return
      this.options.trademark = trademark
      // 当品牌数据更新了，我们监视请求数据，更新数据，就需要调用这个函数
      this.UpdateProductList()
    },
    // 删除品牌数据，
    deltrademark() {
      this.options.trademark = ''
      // 删除之后更新数据
      this.UpdateProductList()
    },
    // 添加品牌属性数据，是一个对象，需要进行传参（每次在父组件定义添加的函数方法，是因为li需要在父组件里面定义展示生成的li，需要子组件给进行传参，然后才能生成所对应点击的数据，）
    addProps(prop) {
      if (this.options.props.indexOf(prop) > -1) return
      this.options.props.push(prop)
      // 向初始数据里面添加数据之后需要重新发送请求，更新数据
      this.UpdateProductList()
    },
    // 点击删除品牌属性数据,可以跟传送过来的数据下标，然后点击删除所想要删除的品牌属性数据
    delprop(index) {
      this.options.props.splice(index, 1)
      this.UpdateProductList()
    },
    // @click="setOrder('2')"
    // 给order定义点击事件，设置排序方式 1:desc
    // 这下面这行的order是上面定义传下来的字符串""1""2"
    setOrder(orderNum) {
      // 这下面这行代码是原生的'1:desc'
      let [ordernum, orderType] = this.options.order.split(':')
      // 判断ordernum ===orderNum是否相等，
      // 相等就是第二次，就改变图标，不想等就是第一次，不改变图标
      if (ordernum === orderNum) {
        // 然后判断ordernum的值是""1"还是""2"，是1的话就改综合排序，是2的话就改价格排序
        if (orderNum === '1') {
          this.isDone = !this.isDone
        } else {
          this.isShow = !this.isShow
        }
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        if (orderNum === '1') {
          orderType = this.isDone ? 'desc' : 'asc'
        } else {
          this.isShow = false
          orderType = 'asc'
        }
      }
      // 这下面的这个orderNum是上面所传过来的字符串“1”，“2”
      this.options.order = `${orderNum}:${orderType}`
      this.UpdateProductList()
    },
    // 当每页条数发生变化触发
    handleSizeChange(pageSize) {
      this.options.pageSize = pageSize
      this.UpdateProductList()
    },
    //当页面发生变化触发
    handleCurrentChange(pageNo) {
      // this.options.pageNo = pageNo
      this.UpdateProductList(pageNo)
    },
  },
  mounted() {
    /**
     * 第一步，根据url地址栏，来更新点击全部分类的可以搜索的内容
     * 第二步，在search组件中，同时也更新搜索之后根据地址栏发生变化，也更新数据，使用watch属性，监听地址栏的变化从而更新数据
     */
    // 在这里发送请求数据的时候，可能会携带data数据，因为这个data是一个空对象，有没有数据都是可以的
    // 结构赋值提取params参数中的searchText属性（因为我们设置的params参数就是searchText）
    // 并且重命名为keyword（因为在我们初始化数据的时候命名的就是keyword）
    /* const { searchText: keyword } = this.$route.params
    // 结构赋值得到query参数
    const {
      categoryName,
      category1Id,
      category2Id,
      category3Id,
    } = this.$route.query
    // 当数据变化的时候，我们就直接更新options的初始化的值
    const options = {
      ...this.options, //携带上所有初始化数据
      keyword, //以下更新的数据后会覆盖之前得到的数据
      categoryName,
      category1Id,
      category2Id,
      category3Id,
    } 
    this.getProductList(options)
  },
  */
    this.UpdateProductList()
  },
  watch: {
    // 监听$route属性的变化，这样不管是params还是query参数发生变化，都可以监听的到
    $route() {
      this.UpdateProductList()
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                i {
                  margin-left: 5px;
                }
                div {
                  display: flex;
                  flex-direction: column;
                  height: 8px;
                  line-height: 3px;
                  i {
                    // margin-top: 1px;
                    padding: 0 0 5px 5px;
                    &.deactive {
                      color: rgba(0, 0, 0, 0.7);
                    }
                  }
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
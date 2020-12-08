// 封装axios拦截器
import axios from "axios";
//引入nprogress进度条插件，在哪里使用就在哪里引入
import NProgress from "nprogress"
// 引入nprogress，直接从这个插件上面引入css样式
import "nprogress/nprogress.css"

// store就是vuex的store，也是this.$store
import store from "../store";

// 单独引入element.ui组件
import { Message } from 'element-ui';

// 引入我们生成uuid的方法
import getuserTempId from "@utils/getuserTempId"
// import store from "../store"

// 调用方法，生成userTempId，
// 定义一个变量，让内存中进行读取，这样性能就会比在硬盘、磁盘中读取速度会更快
const userTempId = getuserTempId();

const instance = axios.create({
  baseURL: "/api",//公共基础路劲
  headers: {
    // 放置公共请求参数

  }
})

// 设置请求拦截器
instance.interceptors.request.use(
  // 这里面是config函数，放置请求对象
  (config) => {
    // 将来请求的地址，请求参数，请求方式等，都会在config中找
    //开始进度条
    NProgress.start();

    // 修改config，用来添加公共的请求参数
    const token = store.state.user.token;
    if (token) {
      config.headers.token = token;
    }
    config.headers.userTempId = userTempId;

    return config
  }
)
//设置响应拦截器
instance.interceptors.response.use(
  // 响应成功的回调函数：响应状态码是2xx开头的
  (response) => {
    //结束进度条
    NProgress.done();
    if (response.data.code === 200) {
      // response.data.data里面的数据才是我们响应成功后所需要的数据
      return response.data.data;
    }
    // 如果响应成功，但是功能有可能会失败，所以有可能也会返回一个失败的的promise对象
    // 功能失败 --> 返回失败的Promise
    const { message } = response.data
    // 提示失败信息(element.ui组件的)
    Message.error(message)
    return Promise.reject(message);
  },
  // 响应失败的回调函数：当响应状态码不是2xx开头的
  (err) => {
    // 结束进度条
    NProgress.done();
    const message = err.message || "网络错误";
    // 提示失败信息(element.ui组件的)
    Message.error()
    return Promise.reject(message)
  }
)

// 最后将这个axios拦截器给暴露出去使用，这个axios拦截器返回的是一个promise对象，
export default instance;
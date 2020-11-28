// 封装axios拦截器
import axios from "axios";

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
    return config
  }
)
//设置响应拦截器
instance.interceptors.response.use(
  // 响应成功的回调函数：响应状态码是2xx开头的
  (response) => {
    if (response.data.code === 200) {
      // response.data.data里面的数据才是我们响应成功后所需要的数据
      return response.data.data;
    }
    // 如果响应成功，但是功能有可能会失败，所以有可能也会返回一个失败的的promise对象
    // 功能失败 --> 返回失败的Promise
    return Promise.reject(response.data.message);
  },
  // 响应失败的回调函数：当响应状态码不是2xx开头的
  (err) => {
    const message = err.message || "网络错误";
    return Promise.reject(message)
  }
)

// 最后将这个axios拦截器给暴露出去使用，这个axios拦截器返回的是一个promise对象，
export default instance;
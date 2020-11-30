// 定义我们的接口，发送请求，请求数据
// 引入我们的axios请求拦截器，
import request from "@utils/request"

// 发送请求的时候是一个函数，函数里面可以放置我们所需要的参数，
// 获取首页三级分类的数据
export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "http://182.92.128.115/api/product/getBaseCategoryList"
  })
}
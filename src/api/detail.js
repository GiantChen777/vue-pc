// 定义detail的api接口
// 引入我们的axios请求拦截器，
import request from "@utils/request"
export const reqGetProductDetail = (id) => {
  return request({
    method: "GET",
    url: `/item/${id}`
  })
}
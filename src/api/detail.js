// 定义detail的api接口
// 引入我们的axios请求拦截器，
import request from "@utils/request"
export const reaGetDetail = () => {
  return request({
    method: "GET",
    url:`/item/${id}`
  })
}
import request from "@utils/request"

// 定义请求search组件的数据
export const reqGetProductList = (data) => {
  return request({
    method: "POST",
    url: "/list",
    data,
  })
}
import request from "@utils/request"
export const reqGetpayDate = () => {
  return request({
    method: "GET",
    url: `/order/auth/trade`
  })
}
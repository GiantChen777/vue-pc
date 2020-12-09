import request from "@utils/request"
export const reqGetpayDate = () => {
  return request({
    method: "GET",
    url: `/order/auth/trade`
  })
}

//定义提交订单api接口
export const reqGetsubmitOrder = (
  {
    tradeNo,
    consignee,
    consigneeTel,
    deliveryAddress,
    paymentWay,
    orderComment,
    orderDetailList,
  }
) => {
  return request({
    method: "POST",
    url: "/order/auth/submitOrder",
    params: {
      tradeNo  //url地址上的params参数
    },
    data: {
      // body参数
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    }
  })
}

// 定义点击支付然后发送请求的api接口
export const reqGetpaysuccess = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`
  })
}
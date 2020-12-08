// 引入request  axios拦截器
import request from "@utils/request"

//封装发送请求的功能函数
export const reqLogin = ({ phone, password }) => {
  // request是拦截器，拦截不必要的数据，只响应我们需要的数据
  return request({
    // 里面是配置对象
    method: "POST",
    url: "/user/passport/login",
    data: {
      // 放置请求体参数，通常post请求
      phone,
      password,
    }
  })
}

//封装登录跳转到login页面的功能函数
export const reqRegister = ({ phone, password, code }) => {
  // request是拦截器，拦截不必要的数据，只响应我们需要的数据
  return request({
    // 里面是配置对象
    method: "POST",
    url: "/user/passport/register",
    data: {
      // 放置请求体参数，通常post请求
      phone,
      password,
      code
    }
  })
}

// 退出登录的api接口请求
export const reqGetLogout = () => {
  // request是拦截器，拦截不必要的数据，只响应我们需要的数据
  return request({
    // 里面是配置对象
    method: "GET",
    url: "/user/passport/logout",
  })
}


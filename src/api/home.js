// 定义我们的接口，发送请求，请求数据
// 引入我们的axios请求拦截器，
import request from "@utils/request"
import mockRequest from "@utils/mockRequest";

// 发送请求的时候是一个函数，函数里面可以放置我们所需要的参数，
// 获取首页三级分类的数据
export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList"
  })
}

/**
* 获取首页轮播图数据
*/
export const reqGetBanners = () => {
  return mockRequest({
    method: "GET",
    url: "/banners",
  });
};

/**
* 获取首页楼层是数据
*/
export const reqGetFloors = () => {
  return mockRequest({
    method: "GET",
    url: "/floors",
  });
};
// 定义今日推荐的图片数据的api
export const reqGetChen = () => {
  return mockRequest({
    method: "GET",
    url: "/chen",
  })
};
//定义热卖排行接口，以便请求数据
export const reqGetTian = () => {
  return mockRequest({
    method: "GET",
    url: "/tian",
  })
};
// 定义猜你喜欢的数据接口
export const reqGetFu = () => {
  return mockRequest({
    method: "GET",
    url: "/fu",
  })
};
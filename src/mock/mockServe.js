import Mock from "mockjs";
import banners from "./rbanners.json";
import floors from "./rfloors.json";
import chen from "./chenchen.json"
import tian from "./tian.json"
import fu from "./fu.json"
import brand from "./brand.json"
import banner from "./banner.json"
import zong from "./zong.json"

// 一旦运行就会拦截Get请求，请求地址/mock/banners
// 并最后参数作为响应结果响应~
Mock.mock("/mock/banners", "get", {
  code: 200,
  "data|4": banners,
});

Mock.mock("/mock/floors", "get", {
  code: 200,
  "data|3-5": floors,
});
Mock.mock("/mock/chen", "get", {
  code: 200,
  "data|5": chen,
});
Mock.mock("/mock/tian", "get", {
  code: 200,
  "data|4": tian
});
Mock.mock("/mock/fu", "get", {
  code: 200,
  "data|6": fu
})
// 定义mock的数据服务器
Mock.mock("/mock/brand", "get", {
  code: 200,
  "data|10": brand
})
// 定义尚品汇快报的li内容
Mock.mock("/mock/banner", "get", {
  code: 200,
  "data|5": banner
})
// 定义图标字体的数据
Mock.mock("/mock/zong", "get", {
  code: 200,
  "data|12": zong
})
// 定义设置userTempId的请求方法，给每一个商品添加userTempId，让后台知道我们添加购物车的数据是哪一个，就点击每一条数据的时候，使用uuid设置生成一个唯一的id，设置在请求头上面
/*
  userTempId 未登录用户的临时id
    通过uuid来生成
  1. 因为每个userTempId自己的购物车数据
      后台会根据userTempId的值来返回购物车数据
      如果userTempId刷新了，购物车数据就没了（清空了）
    所以生成后要持久存储起来，未来将来可以反复使用	
      localStorage 永久存储
      sessionStorage 回话存储（一旦关闭浏览器数据就会被清空）
        xxx.setItem(key, value) 存储
        xxx.getItem(key) 读取
        xxx.removeItem(key) 删除单个
        xxx.clear() 清空所有
	
  2. 整体流程：
    - 先读取本地localStorage数据，看是否有userTempId
    - 如果有，直接使用
    - 如果没有，需要创建userTempId，并重新命名为userTempId，同时保存在localStorage中,

  3. 在内存中缓存一份localStorage数据，让性能更好
*/
import { v4 as uuidv4 } from 'uuid';

function getuserTempId () {
  let userTempId = localStorage.getItem("userTempId")
  if (userTempId) {
    return
  }
  userTempId = uuidv4()

  localStorage.setItem("userTempId", userTempId)

  return getuserTempId
}

export default getuserTempId
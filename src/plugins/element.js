import Vue from 'vue'
import { Button, Pagination, InputNumber, Message, MessageBox } from 'element-ui'
// 按需引入
Vue.use(Button)
Vue.use(Pagination)
Vue.use(InputNumber)

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert;
<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form @submit.prevent="submit">
              <ValidationProvider rules="required|length" v-slot="{ errors }">
                <div class="input-text clearFix">
                  <span>{{ errors[0] }}</span>
                  <input
                    type="text"
                    placeholder="邮箱/用户名/手机号"
                    v-model="user.phone"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider rules="word" v-slot="{ errors }">
                <div class="input-text clearFix">
                  <span class="pwd">{{ errors[0] }}</span>
                  <input
                    type="text"
                    placeholder="请输入密码"
                    v-model="user.password"
                  />
                </div>
              </ValidationProvider>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" v-model="isautologin" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" type="submit">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

// 必填规则
extend('required', {
  ...required,
  message: '手机号必须填写',
})
// 自定义规则
extend('length', {
  validate(value) {
    return value.length === 11
  },
})
// 密码校验规则
extend('word', {
  validate(value) {
    return /^(\w){6,20}$/.test(value)
  },
  message: '密码不符合规范',
})

export default {
  name: 'Login',
  data() {
    return {
      user: {
        phone: '',
        password: '',
      },
      // islogining为false,表示用户没有登录，只要一点击，就会进行跳转，在submit函数里面设置定义islogining为true，就表示用户已经点击登录，如果再次点击，就直接给return出去
      islogining: false, //正在登录
      isautologin: true, //自动登录
    }
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      token: (state) => state.user.token,
    }),
  },
  // 如果vuex中存储了token，则在组件created的时候就自动登录，
  /*
      自动登录：
        在login组件判断是否有token
        有就认为登录过，跳转到首页

        不够安全：token是可以伪造的
        解决：拿到token发送请求
          1. 验证token的合法性（正确，没有过期）
          2. 请求用户数据
    */
  created() {
    if (this.token) {
      this.$router.replace('/')
    }
  },
  methods: {
    async submit() {
      // 检测如果一开始登录失败，使用try...catch，就进行重置，让islogining的值为false，
      try {
        if (this.islogining) return
        this.islogining = true
        const { phone, password } = this.user
        await this.$store.dispatch('login', { phone, password })
        // console.log(this.name, this.token)
        // 在组件跳转的时候，因为token是存在vuex中的，需要印射过来，判断token有没有，
        // 在自动登录时点击的时候，将用户名和token存储在localStorage中，如果登录过，下次就直接自动登录
        // 如果有存储token，就在组件created的时候，
        if (this.isautologin) {
          localStorage.setItem('name', this.name)
          localStorage.setItem('token', this.token)
        }
        this.$router.replace('/')
      } catch {
        this.islogining = false
      }
    },
  },
  components: {
    ValidationProvider,
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(./images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
<template>
  <div id="login">
    <div class="main">
      <div class="left">
        <div class="title"></div>
        <div class="inputCtn">
          <div class="icon">
            <i class="el-icon-user"></i>
          </div>
          <input class="input"
            placeholder="请输入帐号"
            v-model="telephone" />
        </div>
        <div class="inputCtn">
          <div class="icon">
            <i class="el-icon-key"></i>
          </div>
          <input class="input"
            type="password"
            placeholder="请输入密码"
            v-model="password" />
        </div>
        <div class="psdOp">
          <el-checkbox v-model="remPsd">记住密码</el-checkbox>
          <div class="fogotPsd"
            @click="$router.push('/changePsd')">忘记密码？</div>
        </div>
        <div class="subBtn"
          @click="goLogin">登录</div>
      </div>
      <div class="right"></div>
    </div>
    <!-- 备案信息 -->
    <div class="bottomInfo">
      <div class="line">©zwyknit.com版权所有 数据应用服务：浙ICP备 <a target="_blank"
          href="http://www.miit.gov.cn/">19041626号</a></div>
      <!-- <div class="line">浙公网安备 33010602009975号</div> -->
    </div>
  </div>
</template>

<script>
import { login, getAuthorization } from '@/assets/js/api.js'
export default {
  name: 'home',
  data () {
    return {
      telephone: window.localStorage.getItem('zhUsername'),
      password: window.localStorage.getItem('zhPassword'),
      remPsd: true
    }
  },
  methods: {
    noOpr () {
      this.$message.warning('暂无注册功能，请联系管理员添加账号')
    },
    // 登录
    goLogin () {
      let _this = this
      login({
        user_name: _this.telephone,
        password: _this.password
      }).then((res) => {
        if (res.data.code === 200) {
          window.sessionStorage.setItem('token', res.data.data.access_token)
          window.sessionStorage.setItem('token_type', res.data.data.token_type)
          getAuthorization.get().then((res) => {
            this.$message.success({
              message: '登录成功',
              duration: 1000
            })
            window.sessionStorage.setItem('user_name', res.data.data.user_name)
            window.sessionStorage.setItem('company_name', res.data.data.company_name)
            window.sessionStorage.setItem('module_id', res.data.data.module_id)
            window.sessionStorage.setItem('logo', res.data.data.company_logo)
            window.sessionStorage.setItem('has_check', res.data.data.has_check)
            window.sessionStorage.setItem('user_id', res.data.data.user_id)
            window.sessionStorage.setItem('group_name', res.data.data.group_name)
            window.localStorage.setItem('zhUsername', _this.telephone)
            if (_this.remPsd) {
              window.localStorage.setItem('zhPassword', _this.password)
            } else {
              window.localStorage.setItem('zhPassword', '')
            }
            if (_this.$route.query.nextUrl) {
              _this.$router.push(_this.$route.query.nextUrl)
            } else {
              _this.$router.push('/order/orderCreate/1570')
            }
          })
        } else {
          _this.password = ''
        }
      })
    },
    // 注册
    goRegister () {
      this.$message.warning({
        message: '注册功能暂不开放'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/login.less";
</style>
<style lang="less">
#login {
  .zhInputBox {
    height: 40px !important;
  }
  .zhInput {
    padding-left: 36px;
    border-radius: 4px !important;
    color: rgba(0, 0, 0, 0.65);
  }
  .zhInputPrepend {
    position: absolute;
    background: transparent;
    border: 0;
    line-height: 40px;
  }
  .el-checkbox {
    font-size: 16px;
    .el-checkbox__label {
      font-size: 16px;
    }
  }
}
</style>

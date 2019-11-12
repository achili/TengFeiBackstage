<template>
  <div class="row">

    <div class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 mt100 fast-login-with-phone">
      <div class="text-primary f25 text-center mb20">手机快捷登录</div>

      <div class="input-group input-box">
        <span class="input-group-addon"><i class="fa fa-mobile f20 w14"></i></span>
        <input type="email" class="form-control" placeholder="手机" v-model="phoneValidation.phone">
      </div>

      <div class="row mt40">
        <div class="col-xs-7">
          <div class="input-group" style="margin-right: -20px">
            <span class="input-group-addon">手机验证码</span>
            <input type="text" class="form-control" placeholder="验证码" v-model="phoneValidation.value">
          </div>
        </div>
        <div class="col-xs-5">
          <div class="input-group">
            <button class="btn btn-info" @click.stop.prevent="fetchPhoneValidate"
                    v-if="phoneValidation.coldingDown===0">获取验证码
            </button>
            <button class="btn btn-info" disabled
                    v-if="phoneValidation.coldingDown>0">{{phoneValidation.coldingDown}}s后重试
            </button>
          </div>
        </div>
      </div>

      <div class="item mb20 mt20">
        <div ref="response" class="l-captcha" data-site-key="61dcf8329789e03cc897415bb0777510" data-width="300px"></div>
      </div>

      <div class="row mt40">
        <div class="col-sm-6">
          <button class="btn btn-warning full-width" @click="fastLogin">快捷登录</button>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-warning full-width" @click="$router.push('/usr/login')">已有账号，立即登录</button>
        </div>
      </div>

      <div  v-if="loginFirst">
        *********************************
        *********************************
      </div>

      <div class="alert alert-danger text-left mt20" v-show="user.phoneValidation.errorMessage">
        {{user.phoneValidation.errorMessage}}
      </div>
      <div class="mb15 mt20" v-show="user.errorMessage">
        <div class="alert alert-danger">
          {{user.errorMessage}}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import $ from "jquery"
  import {startWith} from "../../common/filter/str";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        loginFirst: false
      }
    },
    props: {},
    watch: {
      "phoneValidation.phone"(newVal, oldVal) {
        this.user.phone = newVal;
      }
    },
    computed: {

    },
    components: {},
    methods: {
      fetchPhoneValidate() {
        this.phoneValidation.checkLogin = false;
        this.phoneValidation.httpFetch($(this.$refs["response"]).children("input").val());
      },
      fastLogin() {
        this.user.errorMessage = '';
        let that = this;
        this.user.httpFastLogin(function (response) {
          // console.log(that.$store.state.user.lastTime.toDateString());
          // console.log(that.$store.state.user.createTime.toDateString());
          // console.log(that.$store.state.user.password);
          //
          // if (that.$store.state.user.lastTime.toDateString() === that.$store.state.user.createTime.toDateString()) {
          //   console.log("第一次登录");
          //   that.loginFirst = true;
          // }

          if (that.redirect) {
            if (startWith(that.redirect, "/by")) {
              that.$router.push(that.redirect);
            } else {
              location.href = that.redirect;
            }
          } else {
            //自动进入到首页。
            that.$router.push('/by/by-center');
          }
          that.$store.state.config.showDrawer = true;
        }, function (response) {
          console.log("登录失败了！呜呜呜");
          that.user.defaultErrorHandler(response);
        })
      }
    },
    mounted () {
      this.user.errorMessage = null;
      this.phoneValidation.checkLogin = true;
      this.phoneValidation.reset();

      //调用外部js文件
      let c = document.createElement('script');
      c.type = 'text/javascript';
      c.async = true;
      c.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'captcha.luosimao.com/static/dist/captcha.js?v=201707071250';
      let s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(c, s);
      // this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .fast-login-with-phone {
    border: 1px solid #d8dee2;
    padding: 40px;
    border-radius: 5px;
    background-color: #fff;

    .input-group-addon {
      background-color: #fff;
      border: 1px solid #E5E6E7;
      border-radius: 1px;
      color: inherit;
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      padding: 6px 12px;
      text-align: center;
    }
    .item {
      .l-captcha {
        #captcha_widget {
          width: 100%;
        }
      }
    }
  }
</style>



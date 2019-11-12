<template>
	<div class="login">
    <div class="row">
        <div class="col-lg-7">
          <img src="../../assets/img/bridge-login.png" style="height: 364px;width: 934px;">
        </div>
        <div class="col-lg-5">
          <div class="login-block">
            <div class=" f52 mb30">欢迎回来！</div>
            <!--输入框开始-->
            <div class="input-group mb15">
              <!--<span class="input-group-addon"><i class="fa fa-user w14"></i></span>-->
              <input type="email" class="form-control" placeholder="邮箱" v-model="user.email"
                     @keyup.enter="login">
            </div>
            <div class="input-group mb15">
              <!--<span class="input-group-addon"><i class="fa fa-unlock-alt w14"></i></span>-->
              <input type="password" class="form-control" placeholder="密码" v-model="user.password"
                     @keyup.enter="login">
            </div>
            <div class="item mb20 mt60">
              <div ref="response" class="l-captcha" data-site-key="61dcf8329789e03cc897415bb0777510" data-width="300px"></div>
            </div>
            <!--<div class="row mb15" v-if="loginFail">-->
            <!--<div class="col-xs-8">-->

            <!--<div class="input-group">-->
            <!--<span class="input-group-addon"><i class="fa fa-file-image-o w14"></i></span>-->
            <!--<input type="text" class="form-control" placeholder="图形验证码" v-model="captchaValue"-->
            <!--@keyup.enter="login">-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-xs-4">-->
            <!--<NbImageCaptcha/>-->
            <!--</div>-->
            <!--</div>-->
            <div class="mt60">
              <button class="btn btn-primary button " @click.prevent.stop="login" :disabled="user.loading">
                <span v-if="user.loading">
                  <i class="fa fa-spinner fa-spin"></i>
                  正在登录...
                </span>
                <span v-else>
                  <!--<i class="fa fa-user-circle-o"></i>-->
                  登录
                </span>
              </button>

            </div>
            <div class="mt60">
              <span style="color: #b6b6b6;font-size: 24px;">已绑定手机账号？</span>
              <a style="color: #00b5e2;font-size: 24px;" @click.stop.prevent="$router.push('/usr/fast/login')">
                手机登录
              </a>
            </div>


            <div class="mb15 mt40" v-show="user.errorMessage">
              <div class="alert alert-danger">
                {{user.errorMessage}}
              </div>
            </div>
          </div>
        </div>
    </div>
	</div>
</template>

<script>
  import NbImageCaptcha from '../../components/NbImageCaptcha.vue'
  import NbHumanCaptcha from '../../components/NbHumanCaptcha.vue'
  import { Notification } from 'element-ui'
  import $ from "jquery"
  import {startWith} from "../../common/filter/str";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        captchaValue: null,
        loginFail: false,
        redirect: this.$store.state.route.query.redirect,
        sss: null
      }
    },
    beforeCreate() {
    },
    props: {},
    watch: {},
    computed: {},
    components: {
      NbImageCaptcha,
      NbHumanCaptcha
    },
    methods: {
      luosimaoRefresh() {
        this.luosimaoResp = "";
        LUOCAPTCHA.reset();
      },
      login () {
        let that = this;
        if(this.user.loading) {
          return;
        }
        if (!$(this.$refs["response"]).children("input").val()) {
          Notification.error({
            message: '请先通过验证！'
          });
        } else {
          this.user.httpLogin($(this.$refs["response"]).children("input").val(), function() {
            LUOCAPTCHA.reset()
            that.loginFail = false;

            //自动跳转到之前的页面中去。
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
          }, function (err) {
            that.loginFail = true;
            LUOCAPTCHA.reset();
            Notification.error({
              title: '错误',
              message: err.data.msg
            })
          })
        }
      }
    },
    mounted () {
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
  .login {
    background-color: #ffffff;
    img{
      margin: 380px 0 0 73px;
    }
    .login-block {
      margin: 183px 0 293px 10px;
      .form-control{
        width: 500px;
        height: 63px;
        resize: none;
        border: 0;
        outline: none;
        border-bottom: 1px solid #b6b6b6;
        font-size: 24px;
        color: #b5b5b5;
      }
      .item {
        .l-captcha {

          #captcha_widget {
            width: 100%;
          }
        }
      }
      .button{
        width: 220px;
        height: 78px;
        border-radius: 50px;
        background-color: #00b5e2;
        color: #ffffff;
        font-size: 24px;
      }
    }
  }

</style>



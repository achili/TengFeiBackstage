<template>
	<div class="backyard-user-change-password animated fadeIn">
    <NbFlip v-model="flipped">
      <NbSlidePanel type="primary" slot="front">
        <span slot="heading">
          <i class="fa fa-moon-o"></i>
          修改密码
        </span>
        <span slot="actions">
          <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
        </span>
        <div slot="body">
          <div class="bg-white br4 border p10">
            <div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">旧密码</label>
                <div class="col-md-10">
                  <input type="password" class="form-control" v-model="user.oldPassword">
                </div>
              </div>


              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">新密码</label>
                <div class="col-md-10">
                  <input type="password" class="form-control" v-model="user.password">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">再输一次</label>
                <div class="col-md-10">
                  <input type="password" class="form-control" v-model="user.repeatPassword">
                </div>
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="mt10">
                <!--<button class="btn btn-sm btn-primary" @click.stop.prevent="$router.go(-1)">-->
                  <!--<span class="fa fa-reply"></span>-->
                  <!--返回-->
                <!--</button>-->
                <button class="btn btn-sm btn-primary pull-right" @click.stop.prevent="save">确认修改</button>
              </div>
            </div>
          </div>

        </div>
      </NbSlidePanel>

      <NbSlidePanel type="warning" slot="back">
					<span slot="heading">
						<i class="fa fa-google-wallet"></i>
						修改手机
					</span>
          <span slot="actions">
						<i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					</span>
        <div slot="body">
          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">已注册手机</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="phoneValidation.phone">
            </div>
          </div>

          <div class="item mb20 mt20">
            <div ref="response" class="l-captcha" data-site-key="61dcf8329789e03cc897415bb0777510" data-width="300px"></div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">已注册手机验证码</label>
            <div class="col-md-5">
              <input type="text" class="form-control" placeholder="手机验证码" v-model="phoneValidation.value">
            </div>
            <div class="col-md-5">
              <button class="btn btn-info" @click.stop.prevent="fetchPhoneValidate"
                      v-if="phoneValidation.coldingDown===0">获取验证码
              </button>
              <button class="btn btn-info" disabled
                      v-if="phoneValidation.coldingDown>0">{{phoneValidation.coldingDown}}s后重试
              </button>
            </div>
          </div>

          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">新手机</label>
            <div class="col-md-10">
              <input type="text" class="form-control" v-model="phoneValidation.newPhone">
            </div>
          </div>

          <div class="mt20">

            <div class="alert alert-danger " v-show="user.errorMessage">
              {{user.errorMessage}}
            </div>
            <div class="alert alert-danger " v-show="phoneValidation.errorMessage">
              {{phoneValidation.errorMessage}}
            </div>

            <div class="text-right">
              <button class="btn btn-sm btn-primary pull-right" @click.stop.prevent="changePhone">确认修改</button>
              <!--<NbLoadingButton :entity="currentUser" :callback="changePhone"/>-->
            </div>
          </div>
        </div>
      </NbSlidePanel>
    </NbFlip>

	</div>
</template>
<script>
  import { Message, MessageBox, Notification } from 'element-ui'
  import NbLoadingButton from "../../components/NbLoadingButton";
  import NbFlip from "../../components/NbFlip"
  import NbSlidePanel from "../../components/NbSlidePanel.vue";
  import User from '../../common/model/user/User'
  import $ from "jquery"

  export default {
    data () {
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        flipped: true,
        currentUser: new User()
      }
    },
    components: {
      NbLoadingButton,
      NbFlip,
      NbSlidePanel
    },
    watch: {
      "phoneValidation.newPhone"(newVal, oldVal) {
        this.user.phone = newVal;
      }
    },
    methods: {
      fetchPhoneValidate() {
        this.phoneValidation.httpFetch($(this.$refs["response"]).children("input").val());
      },
      save () {
        let that = this;
        this.user.httpUserChangePassword(function (response) {
          Notification.success({
            message: '修改密码成功！'
          });
          that.$router.go(-1)
        })
      },
      changePhone () {
        let that = this;
        if (!this.phoneValidation.phone) {
          this.user.errorMessage = "请填写已注册手机";
          return;
        }
        if (!$(this.$refs["response"]).children("input").val()) {
          this.user.errorMessage = "请进行人机验证";
          return;
        }
        if (!this.phoneValidation.value) {
          this.user.errorMessage = "请填写手机验证码";
          return;
        }
        if (!this.phoneValidation.newPhone) {
          this.user.errorMessage = "请填写新手机";
          return;
        }

        console.log(this.phoneValidation.value);
        this.user.httpPhoneChange(this.phoneValidation.newPhone,this.phoneValidation.value, function (response) {
          Notification.success({
            message: "修改手机成功"
          });
          // that.$router.push("/user/profile");
        });
      }
    },
    mounted() {
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
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .backyard-user-change-password {
    .item {
      .l-captcha {
        width: 300px;
        margin: 0 auto;
        #captcha_widget {
          /*width: 100%;*/
        }
      }
    }
  }
</style>

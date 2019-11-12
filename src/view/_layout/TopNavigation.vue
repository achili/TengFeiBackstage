<template>
	<div class="top-navigation-bar">
		<nav class="navbar">

			<div class="navbar-title">
					<router-link to="/by/by-center">
              <img class="logo" style="width: 220px;height: 118px;margin-top: -39px;" src="../../assets/img/bridge.png"/>
              <!--<span class="title">{{preference.name}}</span>-->
              <!--<span class="f18 cell-blue ml18">总部</span>-->
					</router-link>
			</div>

      <div class="p25 pull-left">
        <SpaceRegionalSelecton :spaceRegional="spaceRegional" :editMode="false" :refreshPage="true"></SpaceRegionalSelecton>
      </div>

      <ul class="nav navbar-right">
        <li v-if="user.isLogin">
          <a class="message-info" href="javascript:void(0)" title="开发者中心"
             @click.stop.prevent="$router.push('/dev/dev-center')">
            <i class="fa fa-wrench f20"></i>
            <!--<i v-if="" class="fa fa-wrench f20"></i>-->
          </a>
        </li>

        <li v-if="user.isLogin">
          <a class="message-info" href="javascript:void(0)" title="系统通知"
             @click.stop.prevent="$router.push('/by/system/message/letter/list')">
            <i class="fa fa-bell-o f20"></i>
            <span v-if="msg === 0" class="label label-info"></span>
            <span v-else class="label label-info">{{msg}}</span>
          </a>
        </li>

        <li v-if="user.isLogin">
          <a class="message-info" href="javascript:void(0)" title="用户消息"
             @click.stop.prevent="$router.push('/usr/user/message/letter/list')">
            <i class="fa fa-envelope-o f20"></i>
            <span v-if="count === 0" class="label label-info"></span>
            <span v-else class="label label-info f10">{{count}}</span>
          </a>
        </li>

        <li v-if="user.isLogin">
          <div class="cursor" style="margin-right: -5px;">
            <a class="text-white f20" @click.prevent="logout()" title="退出">
              <img class="logo" style="width: 20px;height: 20px;" src="../../assets/img/sign-out.png"/>
            </a>
          </div>
        </li>

        <li>
          <div @click.stop.prevent="$router.push('/usr/user/edit')">
            <a class="user-info text-white f14"  title="用户中心"><i class="text-white fa fa-user-o"></i>
              <span style="color: #00b5e2;">{{user.isLogin? user.name :  '请登录'}}</span>
            </a>
          </div>
        </li>
        <li v-if="user.isLogin">
          <a class="message-info" href="javascript:void(0)"
             @click.stop.prevent="$router.push('/usr/user/edit')">
            <img style="border-radius:50%; overflow:hidden;" class="mr35" width="32" height="32" :src="user.avatarUrl" />
          </a>
        </li>

      </ul>

			<button class="drawer-trigger btn btn-primary btn-sm"
			        @click.stop.prevent="$store.state.config.showDrawer=!$store.state.config.showDrawer">
				<i class="fa fa-bars"></i>
			</button>


		</nav>
	</div>
</template>
<script>

  import SpaceRegional from "../../common/model/space/SpaceRegional";
  import SpaceRegionalSelecton from "../../../src/view/backyard/space/regional/Selection";
  import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../common/util/Utils";

  export default {
    data () {
      return {
        preference: this.$store.state.preference,
        user: this.$store.state.user,
        messageLetter: this.$store.state.messageLetter,
        interval: null,
        count: null,
        msg:0,
        spaceRegional: new SpaceRegional(),
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    computed: {

    },
	  watch:{

	  },
    components: {
      SpaceRegionalSelecton
    },
    methods: {
      logout() {
        this.user.httpLogout();
        this.$router.push("/usr/login");
      },
      refresh() {
        this.msg = 0;
        let that = this;
        this.messageLetter.httpUnReadSYSTEM(function (response) {
          //that.unReadMessageUsers = response.data.data;
          that.count = response.data.data.count;
          that.msg = response.data.data.msg;
        });
      }
    },
    mounted() {
      let that = this;
      //this.refresh();
      this.msg = 0;
      //每隔5 秒刷新一次
      this.interval = setInterval( function () {
        that.messageLetter.httpUnReadSYSTEM(function (response) {
          //that.unReadMessageUsers = response.data.data;
          that.count = response.data.data.count;
          that.msg = response.data.data.msg;
        })
      }, 10000);
    },
    beforeDestroy(){
      if(this.interval) {
        clearInterval(this.interval)
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

	@import "../../assets/css/global/variables";

	//上方的导航栏
	.top-navigation-bar {

		height: @top-navigation-height;
		background-color: #ffffff;//#3a4759
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
    border: 0;
    border-bottom: 1px solid #f0f0f0;


		//手机屏幕
		@media (max-width: @screen-xs-max) {
			padding-left: 0;
		}

		.navbar-title {
			float: left;
			cursor: pointer;
			margin-left: 15px;
      margin-top: 12px;
			.logo {
				height: 22px;
			}


			.title{
				font-size: 18px;
				color: black;
				font-weight: bold;
				display: inline-block;
				line-height: @top-navigation-height;
				vertical-align: middle;
			}

			.logo-img {
				height: 30px;
			}

			.logo-title {
				line-height: 30px;
				font-size: 13px;
				color:#555555;//#778195  #00b5e2

				//手机屏幕
				@media (max-width: @screen-xs-max) {
					//display: none;
					font-size: 12px;
				}
			}

		}
    .cut-off {
      height: 50px;
      background: #485668;
      width: 1px;
      margin-left: 8px;
    }

		.login-trigger {
			float: right;
			margin-right: 10px;
			.login-span, .register-span {
				color: #555555;//#888 #00b5e2
				cursor: pointer;
				font-size: 14px;
				line-height: 40px;

				&:hover {
					color: black;
					text-decoration: underline;
				}
			}
		}

		.drawer-trigger {
			float: right;
			margin-top: 25px;
			margin-right: 5px;
		}

		.navbar-right {

			> li {
        > a:focus {
          /* text-decoration: none; */
          background-color: transparent;
          &:hover{
            background-color: #eeeeee;
          }
        }
				display: inline-block;
				&:last-child {
					margin-right: 5px;
				}
				a {
					color: #555555;//999c9e #00b5e2
					font-size: 14px;
					padding: 30px 12px;
				}

			}

			@media (min-width: 768px) {
				float: right !important;
				margin-right: 0;
			}

			.message-info {
				position: relative;

				.label {

					line-height: 12px;
					padding: 2px 5px;
					position: absolute;
					left: 10%;
					bottom: 50%;

				}
			}

      .message-info {
        position: relative;
        line-height: 31px;
        .label {
          line-height: 12px;
          padding: 2px;
          position: absolute;
          font-weight: normal;
          font-stretch: normal;
          left: 50%;
          bottom: 50%;
          border-radius:50%; overflow:hidden;
        }
      }

      .user-info {
        padding: 2px 5px;
        line-height: 46px;
      }

		}

		//小屏幕
		@media (min-width: @screen-sm-min) {
			.drawer-trigger {
				display: none;
			}
		}
		//手机屏幕
		@media (max-width: @screen-xs-max) {

			.navbar-right {
				display: none;
			}
		}

	}


</style>

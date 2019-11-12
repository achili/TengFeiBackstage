<template>
  <nav ref="menuNav" class="side-navigation" :class="{'show-drawer':showDrawer}">
    <div class="sidebar-collapse">

      <div class="menu-header" @click="goToProfile">
        <div class="logo-area">
          <img alt="image" class="img-circle" :src="user.getAvatarUrl()"/>
        </div>
        <div class="text-area">
          <div class="nickname">
            {{user.isLogin? user.username :  '请登录'}}
          </div>
          <div class="pl20 pr20 text-center f16 mv5" v-show="user.isLogin">
            <span>
              <a class="message-info" href="javascript:void(0)" title="开发者中心"
                 @click.stop.prevent="$router.push('/dev/dev-center')">
                <i class="fa fa-wrench"></i>
              </a>
            </span>
            <span class="ml5">
              <a class="message-info" href="javascript:void(0)" title="消息中心"
                 @click.stop.prevent="$router.push('/message/mes-center')">
                <i class="fa fa-envelope"></i>
                <span class="label label-primary">3</span>
              </a>
            </span>
          </div>
        </div>
      </div>

      <ul class="nav">
        <SideMenu v-for="menu in menus" :key="menu.name" :menu="menu"/>
      </ul>

    </div>
  </nav>
</template>
<script>
  import backyardMenu from "../../common/menu/backyardMenu";
  import developerMenu from "../../common/menu/developerMenu";
  import userMenu from "../../common/menu/userMenu";
  import {startWith} from "../../common/filter/str";
  import PerfectScrollbar from "perfect-scrollbar";
  import SideMenu from "./SideMenu.vue"
  import "perfect-scrollbar/css/perfect-scrollbar.css";

  export default {
    data() {
      return {
        user: this.$store.state.user,
        menus: backyardMenu,
        ps: null
      }
    },
    computed: {
      showDrawer() {
        return this.$store.state.config.showDrawer;
      },
      menuNav(){
        return this.$refs["menuNav"];
      }
    },
    components: {
      SideMenu
    },
    methods: {
      goToProfile() {
        if (!this.user.uuid) {
          this.$router.push("/usr/login");
        } else {
          this.$router.push("/usr/detail/" + this.user.uuid);
        }
      },
      refreshMenu() {
        if(startWith(this.$route.path, "/by")) {
          //if(this.$store.state.config.mobile) {
            //this.$store.state.config.showDrawer = true;
          //}
          this.menus = backyardMenu;
        } else if(startWith(this.$route.path, "/dev")) {
          this.menus = developerMenu;
        } else if(startWith(this.$route.path, "/usr")) {
          if(startWith(this.$route.path, "/usr/login")) {
            this.menus = [];
            this.$store.state.config.showDrawer = false;
          } else {
            this.menus = userMenu;
          }
        }
        // if(this.$store.state.config.mobile) {
        //   //this.$store.state.config.showDrawer = true;
        // }
      }
    },
    watch: {
      "$route"() {
        this.refreshMenu();
        //监视$route 变一次就更新一次菜单活动状态
        this.menus.forEach(eachMenu => {
          eachMenu.refreshChildrenActivity(this.$route.path);
        });
      }
    },
    mounted() {
      this.refreshMenu();
      this.ps = new PerfectScrollbar(this.menuNav,{
        wheelSpeed :1 ,
        wheelPropagation :true ,
        minScrollbarLength :2
      });
      this.menus.forEach(eachMenu => {
        eachMenu.refreshChildrenActivity(this.$route.path);
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/global/variables";
  @nav-bg: #ffffff;//white
  @nav-text-color: #485668; // #485668
  @font-highlight-color: #00b5e2;// #FFB74E
  @left-border-color: #00b5e2; // #FFB74E

  //大屏幕
  @media (min-width: @screen-lg-min) {
    .menu-header {
      display: none;
    }
  }
  //中屏幕
  @media (min-width: @screen-md-min) and (max-width: @screen-md-max) {
    .menu-header {
      display: none;
    }
  }
  //小屏幕
  @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
    .menu-header {
      display: none;
    }
  }
  //手机屏幕
  @media (max-width: @screen-xs-max) {

  }
  //左侧菜单block.
  .side-navigation {
    overflow: hidden;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
    position: fixed;
    width: @sidebar-width;
    left: -@sidebar-width;
    top: @top-navigation-height;
    bottom: 0;
    z-index: 80;
    background: @nav-bg;
    &.show-drawer {
      left: 0;
    }
    .sidebar-collapse {
      padding-top: 20px;
      padding-bottom: 40px;
    }
    //放头像和用户名的地方。
    .menu-header {
      border-bottom: 1px solid #2F4458;
      padding-bottom: 5px;
      .logo-area {
        cursor: pointer;
        text-align: center;
        padding: 5px 0;
      }
      .text-area {
        .nickname {
          text-align: center;
          color: @nav-text-color;
          font-weight: bold;
        }
        .role {
          text-align: center;
          color: @nav-text-color;
        }
        .message-info {
          position: relative;
          line-height: 31px;

          .label {
            line-height: 12px;
            padding: 2px 5px;
            position: absolute;
            left: 50%;
            bottom: 50%;
          }
        }
      }
    }
    .nav {
      li {
        padding: 24px 20px 0 15px;
        a {
          background-color: @nav-bg;
          color: @nav-text-color;
          padding: 0;

          font-size: 13px;
          &:hover, &:focus {
            color: #00b5e2;//#eeeeee
          }
          i {
            margin-right: 6px;
          }
        }
      }
      .nav-first-level {
        &.active {
          >a {
            i {
              color:black;
            }
            color: @font-highlight-color!important;
          }
        }
      }
      &.nav-second-level {
        padding-left: 15px;
        li {
          &.active {
            border: none;
            a {
              i {
                color:black;
              }
              color: @font-highlight-color!important;
            }
          }
        }
      }
      &.nav-third-level {
        padding-left: 30px;
      }
    }
  }
</style>

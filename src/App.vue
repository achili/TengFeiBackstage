<template>
  <div class="main-app">

    <!--<ProgressContainer/>-->
    <router-view/>
  </div>
</template>

<script>
  //TODO 这货全家螺旋升天了，新版vue-cil根本不能用，等他的2.0版本出了再试试看吧
  //import ProgressContainer from 'vue-nprogress/src/NprogressContainer'
  export default {
    data() {
      return {
        user: this.$store.state.user
      }
    },
    computed: {},
    components: {

    },
    mounted() {
      let that = this;

      //单页应用，在登录成功后更新一次用户的信息
      this.user.httpUpdateInfo(function () {

      }, function () {
        console.error("Update user information failure");
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./assets/css/app.less";
  .main-app {
    height: 100%;
    .nprogress-container {
      position: fixed !important;
      width: 100%;
      height: 150px;
      z-index: 2048;
      pointer-events: none;
      #nprogress {
        @color: #3F51B5;
        .bar {
          background: @color;
        }
        .peg {
          box-shadow: 0 0 10px @color, 0 0 5px @color;
        }
        .spinner-icon {
          border-top-color: @color;
          border-left-color: @color;
        }
      }
    }
  }
</style>

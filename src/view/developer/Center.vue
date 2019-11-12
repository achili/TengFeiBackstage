<template>
  <div>
    <NbSlidePanel type="primary" :initShow="false" :onOffCallback="onOffCallback">
					<span slot="heading">
             <i class="fa fa-file-text-o"></i>
						<span>fantasy日志</span>
					</span>
      <div slot="body">
        <div class="log-box" ref="logScroll">
          <div class="content-box" ref="scrollContent">
            <div v-for="(n,index) in indexDeveloper.logList" :key="index">
              {{n}}
            </div>
          </div>

          <div class="h100">
            <div class="text-center" v-show="indexDeveloper.loading">
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </div>
          </div>

        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel type="primary">
      <span slot="heading">
         <i class="fa fa-pie-chart"></i>
        <span>仪表盘</span>
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-6 col-sm-6" >
            <div class="card">
              <div class="pull-left">
                <i class="fa fa-folder-open"></i>
              </div>
              <div class="pull-right">
                <span><h4>Total files</h4></span>
                <div class="row">
                  <span style="font-size: 24px">{{indexDeveloper.tankTotal}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-6">
            <div class="card">
              <div class="pull-left">
                <i class="fa fa-folder"></i>
              </div>
              <div class="pull-right">
                <span><h4>Total file size</h4></span>
                <div class="row">
                  <span style="font-size: 24px" v-if="(indexDeveloper.sizeTotal) < 1024">{{Math.floor(this.indexDeveloper.sizeTotal )}}b</span>
                  <span style="font-size: 24px" v-if="(indexDeveloper.sizeTotal / 1024) < 1024 && (indexDeveloper.sizeTotal / 1024 ) > 1">{{Math.floor(this.indexDeveloper.sizeTotal / 1024 )}}kb</span>
                  <span style="font-size: 24px" v-if="(indexDeveloper.sizeTotal / 1024 /1024 ) < 1024 && (indexDeveloper.sizeTotal / 1024 /1024 ) > 1">{{Math.floor(this.indexDeveloper.sizeTotal / 1024 /1024 )}}MB</span>
                  <span style="font-size: 24px" v-if="(indexDeveloper.sizeTotal / 1024 /1024 / 1024) < 1024 && (indexDeveloper.sizeTotal / 1024 /1024 / 1024) > 1">{{Math.floor(this.indexDeveloper.sizeTotal / 1024 /1024 /1024 )}}G</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel type="primary">
      <span slot="heading">
         <i class="fa fa-external-link"></i>
        <span>相关外链</span>
      </span>
      <div slot="body">
        <div class="mv10">
          <i class="fa fa-comment mr10"></i>螺丝帽短信平台：<a href="https://my.luosimao.com/auth/login">https://my.luosimao.com/auth/login</a>
        </div>
        <div class="mv10">
          <i class="fa fa-git mr10"></i>GitLab：<a href="https://gitlab.com/users/sign_in">https://gitlab.com/users/sign_in</a>
        </div>
        <div class="mv10">
          <i class="fa fa-font-awesome mr10"></i>FontAwesome：<a href="https://fontawesome.com/v4.7.0/icons/">https://fontawesome.com/v4.7.0/icons/</a>
        </div>
      </div>
    </NbSlidePanel>

  </div>
</template>

<script>
  import NbSlidePanel from "./../../components/NbSlidePanel.vue";
  import IndexDeveloper from "../../common/model/_index/IndexDeveloper";
  import PerfectScrollbar from "perfect-scrollbar";


  import $ from "jquery";


  export default {
    data(){
      return {
        indexDeveloper: new IndexDeveloper(),
        ps: null,
        interval: null,
        isContinuousLoading: false
      }
    },
    watch:{
    },
    computed: {
      logScroll(){
        return this.$refs["logScroll"];
      },
      scrollContent(){
        return this.$refs["scrollContent"];
      }
    },
    props:{
    },
    components: {
      NbSlidePanel
    },
    methods: {
      onOffCallback(res) {
        this.isContinuousLoading = res;
        $(this.logScroll).animate({
          scrollTop: 9000
        }, 400);
      }
    },
    mounted(){
      let that = this;
      //完美滚动条
      this.ps = new PerfectScrollbar(this.logScroll,{
        wheelSpeed :1 ,
        wheelPropagation :true ,
        minScrollbarLength :2
      });
      //每隔5秒刷新一次
      this.interval = setInterval( function () {
        if(that.indexDeveloper.loading || !that.isContinuousLoading) {
          return
        }
        that.indexDeveloper.httpStatistic(function () {
          $(that.logScroll).animate({
            scrollTop: 9000
          }, 400);
        })
      }, 4000);
      //将滚动条设置在最底部
      this.indexDeveloper.httpStatistic(function () {
        $(that.logScroll).animate({
          scrollTop: 9000
        }, 10);
       });

    },
    beforeDestroy(){
      if(this.interval) {
        clearInterval(this.interval)
      }
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .card {
    width: 200px;
    height: 100px;
    text-align: center;
    padding-top: 25px;

    .title  {
      line-height: 44px;
      font-size: 36px;
      &:hover{
        font-size: 40px;
      }
    }
    .pull-left {
      font-size: 36px;
      padding-left: 20px;

      &:hover{
        font-size: 50px;
      }
    }
    .pull-right {
      padding-right: 20px;
    }
  }
  .log-box{
    position: relative;
    width: 100%;
    height: 400px;
    .content-box {
      width: 2500px;
    }
  }

</style>

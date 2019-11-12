<template>
  <div class="by-activeSite-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ">
          <span class="ml15 cell-max-title">活动场地详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30" >
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">类型</div>
              <div class="col-md-9">{{activeSite.name}}</div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">介绍</div>
              <div class="col-md-9">{{activeSite.introduce}}</div>
            </div>

            <div class="row pt15" >
              <div class="col-md-3 mt5">设施及服务</div>
              <div class="col-md-9">
                <div class="mt5" v-for="(s,index) in activeSite.services" :key="index">
                  <div v-for="(c,indexC) in activeSite.getServicesMap()" :key="indexC">
                    <span  v-if="s === c.val">{{index + 1}}.{{c.name}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">图片</div>
              <div class="col-md-9">
                <img width="122" height="122" :src="activeSite.poster.url" />
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{activeSite.spaceRegional.name}}
              </div>
            </div>

          </div>
          <div class="row pr50 pb30">
            <button title="编辑" class="btn btn-theme pull-right"  style="width: 122px;height: 46px;"
                    @click.stop.prevent="$router.push({path:'/by/activeSite/edit',query:{uuid:activeSite.uuid}})">
              编辑
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ActiveSite from "../../../common/model/activesite/ActiveSite";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";

  export default {
    data () {
      return {
        activeSite: new ActiveSite()
      }
    },
    components: {
      NbLoadingFrame
    },
    computed: {},
    watch: {},
    methods: {},
    mounted(){
      this.activeSite.uuid = this.$route.query.uuid;
      this.activeSite.httpDetail();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-activeSite-detail {
    padding: 20px 120px 0 30px;
    font-size: 14px;
    color: #555555;
  }
</style>


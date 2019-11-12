<template>
  <div class="by-space-regional-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left">
          <span class="ml15 cell-max-title" >空间区域详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30" >
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <div class="col-md-12">
                <span class="f18 cell-title-color">{{spaceRegional.name}}</span>
              </div>
            </div>
            <div class="row mt5">
              <div class="col-md-12">
                <span class="f14 cell-title-color">描述：{{spaceRegional.description}}</span>
              </div>
            </div>
            <div class="row mt20">
              <div class="col-md-12">
                {{spaceRegional.createTime | simpleDate }}
              </div>
            </div>
            <div class="row pr35 pt35 pb10" >
              <button title="编辑" class="btn btn-theme pull-right" style="width: 122px;height: 46px;"
                      @click.stop.prevent="$router.push({path:'/by/space/regional/edit',query:{uuid:spaceRegional.uuid}})">
                编辑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";

  export default {
    data () {
      return {
        spaceRegional: new SpaceRegional()
      }
    },
    components: {
      NbSlidePanel
    },
    methods: {

      refresh(){
        let that = this;
        this.spaceRegional.uuid = this.$route.query.uuid;
        if (this.spaceRegional.uuid) {
          this.spaceRegional.httpDetail();
        }
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-space-regional-detail{
    padding: 20px 100px 0 30px;
  }
</style>


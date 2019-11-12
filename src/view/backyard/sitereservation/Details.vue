<template>
  <div class="by-siteReservation-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left ">
          <span class="ml15 cell-max-title" >活动场地订单详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30" >
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">地点</div>
              <div class="col-md-9">{{siteReservation.address}}</div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">创建者</div>
              <div class="col-md-9">
                <a class="f14 cell-blue"
                      @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:siteReservation.creator.uuid}})">{{siteReservation.creator.name}}</a></div>
            </div>

            <div class="row pt20">
              <div class="col-md-3 mt5">电话</div>
              <div class="col-md-9">
                {{siteReservation.creator.phone}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">创建日期</div>
              <div class="col-md-9">
                {{siteReservation.createTime | simpleDateMinute }}
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">使用日期</div>
              <div class="col-md-9">
                {{siteReservation.startTime | simpleDateMinute }}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">备注</div>
              <div class="col-md-9">
                {{siteReservation.remarks}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{siteReservation.spaceRegional.name}}
              </div>
            </div>

          </div>
          <!--<div class="row pr50 pb30">-->
            <!--<button title="编辑" class="btn btn-theme pull-right" style="width: 122px;height: 46px;"-->
                    <!--@click.stop.prevent="$router.push({path:'/by/activeSite/edit',query:{uuid:activeSite.uuid}})">-->
              <!--编辑-->
            <!--</button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SiteReservation from "../../../common/model/sitereservation/SiteReservation";
  import NbLoadingFrame from "../../../components/NbLoadingFrame";

  export default {
    data () {
      return {
        siteReservation: new SiteReservation()
      }
    },
    components: {
      NbLoadingFrame
    },
    computed: {},
    watch: {},
    methods: {},
    mounted(){
      this.siteReservation.uuid = this.$route.query.uuid;
      this.siteReservation.httpDetail();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-siteReservation-detail{
    padding: 20px 120px 0 30px;
    font-size: 14px;
    color: #555555;
  }
</style>

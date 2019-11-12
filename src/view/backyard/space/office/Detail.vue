<template>
  <div class="by-spaceOffice-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left f26">
          <span class="ml15 cell-max-title">办公室详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">空间名</div>
              <div class="col-md-9">{{spaceOffice.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">面积</div>
              <div class="col-md-9">
                {{spaceOffice.area}}m²
              </div>
            </div>

            <div class="row pt15">
              <div class="col-md-3 mt5">状态</div>
              <div class="col-md-9">
                <span :style="'color:'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>              </div>
            </div>

            <div class="row pt15">
              <div class="col-md-3 mt5">所属大楼</div>
              <div class="col-md-9">
                <a title="查看" class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/building/detail',query:{uuid:spaceOffice.spaceBuilding.uuid}})">
                  {{spaceOffice.spaceBuilding.name}}
                </a>
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">地址</div>
              <div class="col-md-9">
                {{spaceOffice.address}}
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">工位数量</div>
              <div class="col-md-9">
                {{spaceOffice.seatNum}} 个
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{spaceOffice.spaceRegional.name}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">备注</div>
              <div class="col-md-9">
                {{spaceOffice.remarks}}
              </div>
            </div>

            <div class="row pr35 pb10" >
              <button title="编辑" class="btn btn-theme pull-right " style="width: 122px;height: 46px;"
                      @click.stop.prevent="$router.push({path:'/by/space/office/edit',query:{uuid:spaceOffice.uuid}})">
                编辑
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <span class="cell-subtitle pl15">工位列表</span>
            </div>
            <div class="row">
              <div class="col-md-12 pt30" v-for="spaceSeat in seatPager.data" :key="spaceSeat.uuid" >
                <div class="pull-left">
                  <span class="pr30">
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/seat/detail',query:{uuid:spaceSeat.uuid}})">
                         {{spaceSeat.name}}
                    </a>
                  </span>
                  <span :style="'color:'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span>
                </div>
              </div>
              <div class="col-md-12 mt20">
                <NbPager :pager="seatPager" :callback="refresh"></NbPager>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="spaceOffice.status === 'PRE_ALLOCATION'">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <span class="cell-subtitle pl15">空间预分配</span>
            </div>
            <div class="row">
              <div class="col-md-12 pt30" v-for="spaceOrder in orderPager.data" :key="spaceOrder.uuid" >
                <div class="pull-left">
                  <span class="pr30">
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/spaceOrder/detail',query:{uuid:spaceOrder.uuid}})">
                         {{spaceOrder.creator.name}}的空间申请（{{spaceOrder.name}}）
                    </a></span>
                  <span :style="'color:'+spaceOrder.getStatusStyle()">{{spaceOrder.getStatusName()}}</span>
                </div>
              </div>
              <div class="col-md-12 mt20">
                <NbPager :pager="orderPager" :callback="refresh"></NbPager>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="spaceOffice.status === 'OCCUPIED'">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <span class="cell-subtitle pl15">占用合同</span>
            </div>
            <div class="row">
              <div class="col-md-12 pt30" v-for="protocol in protocolPager.data" :key="protocol.uuid" >
                <div>
                  <span class="pr30">
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/protocol/space/detail',query:{uuid:protocol.uuid}})">
                         <span v-if="protocol.memberType === 'MOBILE_STATION'">移动办公桌</span>
                         <span v-else>独立办公室</span>租赁合同-{{protocol.accountName}}
                    </a>
                  </span>
                  <span :style="'color:'+protocol.getStatusStyle()">{{protocol.getStatusName()}}</span>
                </div>
                <div>房屋地址： {{protocol.registerAddress}}</div>
                <div>合同编号： {{protocol.no}}</div>
              </div>
              <div class="col-md-12 mt20">
                <NbPager :pager="protocolPager" :callback="refresh"></NbPager>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../../components/NbLoadingFrame";
  import SpaceOffice from "../../../../common/model/space/SpaceOffice";
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceSeat from "../../../../common/model/space/SpaceSeat";
  import NbPager from "../../../../components/NbPager";
  import SpaceOrder from "../../../../common/model/spaceOrder/SpaceOrder";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";

  export default {
    data () {
      return {
        spaceOffice: new SpaceOffice(),
        StatusMap: SpaceOffice.prototype.StatusMap,
        seatPager: new Pager(SpaceSeat),
        orderPager: new Pager(SpaceOrder),
        protocolPager: new Pager(ProtocolSpace)
      }
    },
    computed: {},
    watch:{
    },
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbPager
    },
    methods: {
      refresh() {
        this.seatPager.httpFastPage();
      }
    },
    mounted(){
      let that = this;
      this.spaceOffice.uuid = this.$route.query.uuid;
      this.spaceOffice.httpDetail();
      //工位列表
      this.seatPager.setFilterValue("spaceOfficeUuid", this.spaceOffice.uuid);
      this.seatPager.httpFastPage();
      //空间申请
      this.orderPager.setFilterValue("spaceOfficeUuid", this.spaceOffice.uuid);
      this.orderPager.setFilterValue("status","ACCEPT");
      this.orderPager.httpFastPage();
      //合同
      this.protocolPager.setFilterValue("spaceOfficeUuid", this.spaceOffice.uuid);
      this.protocolPager.httpFastPage();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-spaceOffice-detail {
    padding: 20px 100px 0 30px;
    .mail-body {
      font-size: 14px;
      color: #9c9c9c;
    }
  }
</style>

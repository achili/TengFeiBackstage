<template>
  <div class="by-spaceSeat-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left f24">
          <div title="返回" class="cursor-pointer"  @click.stop.prevent="$router.go(-1)">
            <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
            <span class="ml15 cell-max-title ">办公桌详情</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">工位名称</div>
              <div class="col-md-9">{{spaceSeat.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">工位编号</div>
              <div class="col-md-9">
                {{spaceSeat.stationNo}}
              </div>
            </div>

            <div class="row pt15">
              <div class="col-md-3 mt5">状态</div>
              <div class="col-md-9">
                <span :style="'color:'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span></div>
            </div>

            <div class="row" style="padding-top: 15px;">
              <div class="col-md-3 mt5">所属房间</div>
              <div class="col-md-9">
                <a title="查看" class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/office/detail',query:{uuid:spaceSeat.spaceOffice.uuid}})">
                  {{spaceSeat.spaceOffice.name}}
                </a>
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">价格</div>
              <div class="col-md-3">
                {{spaceSeat.day}}元/天
              </div>
              <div class="col-md-3">
                {{spaceSeat.month}}元/月
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">地址</div>
              <div class="col-md-9">
                {{spaceSeat.address}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">属性</div>
              <div class="col-md-9">
                <span v-for="(a,index) in AttributeMap" :key="index">
                  <span v-for="(c,index) in spaceSeat.attribute" :key="index">
                    <span class="mr10" v-if="c === a.val">{{a.name}}</span>
                  </span>
                </span>
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{spaceSeat.spaceRegional.name}}
              </div>
            </div>

            <div class="row pr35 pb10" >
              <button title="编辑" class="btn btn-theme pull-right" style="width: 122px;height: 46px;"
                      @click.stop.prevent="$router.push({path:'/by/space/seat/edit',query:{uuid:spaceSeat.uuid}})">
                编辑
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="spaceSeat.status === 'PRE_ALLOCATION'">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <span class="cell-subtitle pl15">空间预分配</span>
            </div>
            <div class="row">
              <div class="col-md-12 pt30" v-for="spaceOrder in orderPager.data" :key="spaceOrder.uuid" >
                <div class="pull-left">
                  <span style="padding-right: 27px;">
                     <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/spaceOrder/detail',query:{uuid:spaceOrder.uuid}})">
                          {{spaceOrder.creator.name}}的空间申请（{{spaceOrder.name}}）
                     </a>
                  </span>
                  <span style="padding-right: 27px;" :style="'color:'+spaceOrder.getStatusStyle()">{{spaceOrder.getStatusName()}}</span>
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

    <div class="row" v-if="spaceSeat.status === 'OCCUPIED'">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <span class="cell-subtitle pl15">占用合同</span>
            </div>
            <div class="row">
              <div class="col-md-12 pt30" v-for="protocol in protocolPager.data" :key="protocol.uuid" >
                <div>
                  <span class="mr20">
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/protocol/space/detail',query:{uuid:protocol.uuid}})">
                      <span v-if="protocol.memberType === 'MOBILE_STATION'">移动办公桌</span><span v-else>独立办公室</span>租赁合同-{{protocol.accountName}}
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
  import SpaceSeat from "../../../../common/model/space/SpaceSeat";
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceOrder from "../../../../common/model/spaceOrder/SpaceOrder";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
  import NbPager from "../../../../components/NbPager";

  export default {
    data () {
      return {
        AttributeMap:SpaceSeat.prototype.AttributeMap,
        spaceSeat: new SpaceSeat(),
        StatusMap: SpaceSeat.prototype.StatusMap,
        orderPager: new Pager(SpaceOrder),
        protocolPager: new Pager(ProtocolSpace),
        isOffice:false
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbPager
    },
    methods: {
      refresh(){
        let that = this;
        this.spaceSeat.uuid = this.$route.query.uuid;
        if(this.spaceSeat.uuid){
          this.spaceSeat.httpDetail(function () {
            //空间申请
            that.orderPager.setFilterValue("spaceSeatUuid", that.spaceSeat.uuid);
            that.orderPager.setFilterValue("status","ACCEPT");
            that.orderPager.httpFastPage();

            //合同
            that.protocolPager.setFilterValue("spaceSeatUuid", that.spaceSeat.uuid);
            that.protocolPager.httpFastPage();
          });
        }


      }
    },
    mounted(){
      let that = this;
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .by-spaceSeat-detail {
    padding: 30px 100px 0 30px;
    .mail-body {
      font-size: 14px;
      color: #9c9c9c;
    }
  }
</style>

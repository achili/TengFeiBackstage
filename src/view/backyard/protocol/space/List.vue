<template>
  <div class="animated fadeIn protocol-cell">
    <div class="row">
      <div class="col-md-12 col-xs-12 col-xs-12">
        <div class="pull-left f24">
          <span>租赁协议列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 120px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/protocol/space/create')">
            <span>创建租赁协议</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr12 f20">
            <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-xs-12 col-xs-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-xs-12 col-xs-12 events-title pl40">
        <div class="col-md-1 col-xs-1 col-xs-1 font-cell-mid">
          <NbTableFilter name="创建日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-mid" align="center">
          <NbTableFilter name="编号" :filter="pager.getFilter('orderNo')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-mid">所属时间</div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-mid">签约空间</div>
        <div class="col-md-3 col-xs-3 col-xs-3 font-cell-mid">付款公司名称</div>
        <div class="col-md-2 col-xs-2 col-xs-2 pl40 font-cell-mid">状态</div>
      </div>

      <div class="col-md-12 col-xs-12 col-xs-12 mt15" >
        <div v-for="protocolSpace in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="protocolSpace.uuid" :class="protocolSpace.deleted === true ? 'bg-change':''"
             @click.stop.prevent="protocolSpace.deleted||$router.push({path:'/by/protocol/space/detail',query:{uuid:protocolSpace.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-1 col-xs-1 col-xs-1 font-min-height" >{{protocolSpace.createTime | simpleDate }}</div>
            <div class="col-md-2 col-xs-2 col-xs-2 font-min-height" >{{protocolSpace.no}}</div>
            <div class="col-md-2 col-xs-2 col-xs-2 font-min-height" ><span>{{protocolSpace.startTime | simpleDate }} - {{protocolSpace.endTime | simpleDate }}</span></div>
            <div class="col-md-2 col-xs-2 col-xs-2 font-min-height" >
               <span v-for="ss in protocolSpace.accountSpaceName" :key="ss.index">
              <nobr>{{ss}} </nobr>
            </span>
            </div>
            <div class="col-md-3 col-xs-3 col-xs-3 font-min-height" >
              <span v-if="protocolSpace.mainType === '公司'">
                  {{protocolSpace.companyName}}
              </span>
              <span v-if="protocolSpace.mainType === '个人'">
                  {{protocolSpace.personName}}
              </span>
            </div>
            <div class="col-md-2 col-xs-2 col-xs-2 font-min-height pl40">
              <div v-if="protocolSpace.status !== 'EXPIRE'"><span :style="'color:'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span></div>
              <div style="line-height: 15px;" v-if="protocolSpace.status === 'EXPIRE'"><span :style="'color:'+protocolSpace.getStatusStyle()">{{protocolSpace.getStatusName()}}</span></div>
              <div v-if="(protocolSpace.status === 'EXPIRE' || protocolSpace.status === 'EXCEPTION') && protocolSpace.memberType === 'INDEPENDENT_SPACE'">
                <span class="cell-normal" v-if="protocolSpace.refund">押金已退还</span>
                <span class="cell-danger" v-else>押金未退还</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-xs-12 col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(ProtocolSpace),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    components: {
      NbPager,
      NbFilter,
      NbEntityLink,
      NbTableFilter,
      NbMultiFilter,
      NbSelectionFilter
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      let that = this;
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .protocol-cell {
    padding: 20px 30px 0 30px;
    .input-sm{
      width: 165px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .events-title{
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #888888;
    }
    .description{
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
      font-size: 14px;
      color: #666666;
      margin-top: 38px;
    }
    .status{
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
      font-size: 14px;
      color: #666666;
      margin-top: 38px;
    }
    .bg-change{
      background-color: #f6f6f6 !important;
    }
  }
</style>

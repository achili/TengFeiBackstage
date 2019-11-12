<template>
  <div class="animated fadeIn bill-cell">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left">
          <span class="title">已收账款信息列表</span>
        </div>
        <div class="pull-right">
          <!--<span class="pull-right">-->
            <!--<button style="width: 128px;height: 37px;background-color: #00b5e2;border: solid 1px #e2e2e2;" class="btn btn-primary" @click.stop.prevent="$router.push('/by/finance/bill/receipt/create')">-->
            <!--<span>创建已收账款信息</span>-->
            <!--</button>-->
          <!--</span>-->
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-sm-12 col-xs-12 events-title pl40" >
        <div class="col-md-2 col-sm-2 col-xs-2 description">
          <NbTableFilter name="创建日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 description">
          <NbTableFilter name="编号" :filter="pager.getFilter('orderNo')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1 description">付款日期</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description">金额</div>
        <div class="col-md-2 col-sm-2 col-xs-2 description">付款公司名称</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="center">收款人</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="center">支付方式</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="center">支付状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="center">收款类别</div>
      </div>

      <div class="col-xs-12 mt15" >
        <div v-for="financeBillReceipt in pager.data"  style="height: 100px;" class="bg-white mt10 cursor" :key="financeBillReceipt.uuid" :class="financeBillReceipt.deleted === true ? 'bg-change':''"
             @click.stop.prevent="financeBillReceipt.deleted||$router.push({path:'/by/finance/bill/receipt/detail',query:{uuid:financeBillReceipt.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">
              <span v-if="financeBillReceipt.financePayInfo.uuid == null">{{financeBillReceipt.financeOfficePay.createTime | simpleDate }}</span>
              <span v-else>{{financeBillReceipt.financePayInfo.createTime | simpleDate }}</span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{financeBillReceipt.no}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height"><span>{{financeBillReceipt.receiveTime | simpleDate }}</span></div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">{{financeBillReceipt.amount}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{financeBillReceipt.companyName}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{financeBillReceipt.creator.name}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">
              <span :style="'color:'+financeBillReceipt.getTypeStyle()">{{financeBillReceipt.getTypeName()}}</span>
              <!--<span v-if="financeBillReceipt.status === 'CONFIRMATION'">-->
                <!--<span :class="'text-'+financeBillReceipt.getStatusStyle()">{{financeBillReceipt.getStatusName()}}</span>-->
              <!--</span>-->
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{financeBillReceipt.getStatusName()}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center">{{financeBillReceipt.getCategoryName()}}</div>
          </div>
        </div>
      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>
    </div>
  </div>
</template>
<script>

  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import Pager from "../../../../common/model/_base/Pager";
  import FinanceBillReceipt from "../../../../common/model/finance/FinanceBillReceipt";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(FinanceBillReceipt),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    components: {
      NbPager,
      NbFilter,
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
  .bill-cell {
    padding: 20px 30px 0 30px;
    .input-sm{
      width: 180px;
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
    .bg-change{
      background-color: #f6f6f6 !important;
    }
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
</style>

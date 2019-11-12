<template>
  <div class="animated fadeIn office-cell">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>会议室付款信息列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 140px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/finance/office/pay/create')">
            <span>创建会议室付款单</span>
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
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div style="border-bottom: 1px #e2e2e2 solid;"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-sm-12 col-xs-12 events-title pl40">
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">
          <NbTableFilter name="创建日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">
          <NbTableFilter name="编号" :filter="pager.getFilter('orderNo')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">所属时间</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">付款单名称</div>
        <div class="col-md-2 col-sm-2 col-xs-2 pl60 font-cell-min">付款公司名称</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">状态</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15">
        <div v-for="financeOfficePay in pager.data"  style="height: 100px;line-height: 100px;" class="bg-white mt10 pt10 cursor" :key="financeOfficePay.uuid" :class="financeOfficePay.deleted === true ? 'bg-change':''"
             @click.stop.prevent="financeOfficePay.deleted||$router.push({path:'/by/finance/office/pay/detail',query:{uuid:financeOfficePay.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height">{{financeOfficePay.createTime | complexHumanTime() }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height">{{financeOfficePay.no}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height"><span>{{financeOfficePay.lastTime | simpleDate }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height">{{financeOfficePay.name}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height pl60">{{financeOfficePay.companyPrincipal}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2  font-max-height"  align="center"><span :style="'color:'+financeOfficePay.getStatusStyle()">{{financeOfficePay.getStatusName()}}</span></div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20">
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
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(FinanceOfficePay),
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
  .office-cell {
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
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
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

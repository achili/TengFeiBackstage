<template>
  <div class="animated fadeIn arrears">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left ">
          <span class="title">欠账单</span>
        </div>
        <div class="pull-right f24">
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20 ">

      <div class="col-md-12 col-sm-12 col-xs-12 invite-list">
        <div class="segmenting-line"></div>

        <div class="row mt40">
          <div class="col-md-12 col-sm-12 col-xs-12 pl40 cell-subtitle" >
            <div class="col-xs-4 font-cell-mid" >欠款公司</div>
            <div class="col-xs-2 font-cell-mid" >欠款天数</div>
            <div class="col-xs-2 font-cell-mid" >欠款开始日期</div>
            <div class=" col-xs-2 font-cell-mid" >欠款总额</div>
            <div class="col-xs-2 font-cell-mid" style="text-align: center;">滞纳金</div>
          </div>
        </div>

        <div class="row mt5">
          <div class="col-xs-12" >
            <div v-for="protocolCompany in pager.data"  class="bg-white  br4 mt18" style="height: 100px;" :key="protocolCompany.uuid" :class="protocolCompany.deleted === true ? 'bg-change':''"
                 @click="confirmShow(protocolCompany)">
              <div class="media">
                <div class="media-body pl30">
                  <div class="col-xs-4 font-middle-height" >{{protocolCompany.name}}</div>
                  <div class="col-xs-2 font-middle-height" >{{protocolCompany.arrearsDay}}</div>
                  <div class="col-xs-2 font-middle-height" >{{protocolCompany.arrearsStartTime | simpleDate}}</div>
                  <div class="col-xs-2 font-middle-height" >{{protocolCompany.arrearsTotal}}</div>
                  <div class="col-xs-2 font-middle-height" style="text-align: center;">{{protocolCompany.lateFee}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-12 mt20">
        <div>
          <NbPager :pager="pager" :callback="refresh"></NbPager>
        </div>
      </div>

      <div class="popup-box" v-if="show">
        <Show :closeShow="closeAllPopup" :arrearsFinancePayInfo="arrearsFinancePayInfo" :successCallback="successCallback" :errorCallback="errorCallback"></Show>
      </div>

    </div>
  </div>
</template>
<script>

  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import Pager from "../../../common/model/_base/Pager";
  import ProtocolCompany from "../../../common/model/protocol/company/ProtocolCompany";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import Show from "./Show";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(ProtocolCompany),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        show:false,
        arrearsFinancePayInfo:[],
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    components: {
      NbPager,
      NbFilter,
      NbSelectionFilter,
      Show

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
      },
      closeAllPopup(){
        this.show = false;
        //this.refresh();
      },
      successCallback(res){

      },
      errorCallback(){
      },
      confirmShow(protocolCompany){
        this.arrearsFinancePayInfo = protocolCompany.arrearsFinancePayInfo;
        this.show = true;
      }
    },
    mounted(){
      let that = this;
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      this.pager.setFilterValue("isArrears", true);
      this.pager.setFilterValue("orderStartTime", "ASC");
      this.pager.enableHistory();
      this.refresh();

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .arrears {
    padding: 20px 30px 0 30px;
    font-size: 16px;
    color: #666666;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
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

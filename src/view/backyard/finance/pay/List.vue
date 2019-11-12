<template>
  <div class="animated fadeIn pay-cell">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>付款信息列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <el-date-picker
              class="date-picker"
              v-model="selectTime"
              type="month"
              :picker-options="pickerOptions0"
              format="yyyy-MM"
              placeholder="选择日期时间">
            </el-date-picker>
          </span>
          <span class="pull-right mr20">
            <button style="width: 150px;height: 37px;" v-show="!financePayInfo.loading" class="btn btn-theme" @click.stop.prevent="batch">
              <span>批量创建付款信息单</span>
            </button>
            <button  style="width: 150px;height: 37px;" class="btn btn-theme f14" disabled v-show="financePayInfo.loading">
              <span style="color:#fff;">正在发送中...</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/finance/pay/info/create')">
            <span>创建付款信息</span>
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
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-sm-12 col-xs-12 events-title pl40">
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">
          <NbTableFilter name="创建日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">
          <NbTableFilter name="编号" :filter="pager.getFilter('orderNo')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-min">所属时间</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">关联合同编号</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">付款公司名称</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min" align="center">状态</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" >
        <div v-for="financePayInfo in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="financePayInfo.uuid" :class="financePayInfo.deleted === true ? 'bg-change':''"
             @click.stop.prevent="financePayInfo.deleted||$router.push({path:'/by/finance/pay/info/detail',query:{uuid:financePayInfo.uuid}})" >
          <div class="media pl25">
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">{{financePayInfo.createTime | complexHumanTime() }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" :title="financePayInfo.no">{{financePayInfo.no}}</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-min-height"><span>{{financePayInfo.payStartTime | simpleDate }} - {{financePayInfo.payEndTime | simpleDate }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" :title="financePayInfo.contractNo">{{financePayInfo.contractNo}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">
              <span v-if="financePayInfo.protocolSpace.mainType === '公司'">{{financePayInfo.protocolSpace.companyName}}</span>
              <span v-else>{{financePayInfo.protocolSpace.personName}}</span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" align="center"><span :style="'color:'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span></div>
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
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import {Notification as NotificationBox} from 'element-ui'
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(FinancePayInfo),
        financePayInfo: new FinancePayInfo(),
        selectTime: null,
        pickerOptions0 : {
          disabledDate(time) {
          // 之前
          time.setDate(1);
          time.setMonth(time.getMonth());
          let day1 = (time.getTime() < Date.now() - 8.64e7);
          // 之后
          time.setDate(1);
          time.setMonth(time.getMonth() - 1);
          let day = (time.getTime() > Date.now() - 8.64e7);
          return day - day1;
          }
        },
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
      NbLoadingButton,
      NbSelectionFilter
    },
    computed: {},
    watch: {

    },
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      },
      batch(){
        let that = this;
         this.financePayInfo.httpBatch(this.selectTime,this.pager.getFilter('spaceRegionalUuid').value,function () {
           NotificationBox.success({
             message: "创建成功"
           });
           that.refresh();
         });
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
  .pay-cell {
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
    .date-picker{
      width: 150px;
      height: 37px;
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

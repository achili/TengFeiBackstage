<template>
  <div class="animated fadeIn reminder-list">

    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left title">
          <span>付款信息列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
              <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                     v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-xs-12">
       <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt20">

      <div class="col-md-12 col-sm-12 col-xs-12 mt10 ml45 mb10">
        <button class="btn btn-info" @click.stop.prevent="reminder" v-show="!financePayInfo.loading">
          一键群催款
        </button>
        <button class="btn btn-info" disabled v-show="financePayInfo.loading">
          正在发送中...
        </button>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12">
        <div v-for="financePayInfo in pager.data" style="height: 100px;"  class="bg-white pt30 pl30 br4 mt10 cursor" :key="financePayInfo.uuid"
             @click.stop.prevent="$router.push({path:'/by/finance/pay/info/detail',query:{uuid:financePayInfo.uuid}})" >
          <div class="media">
            <div class="media-body" style="border: 0;">
              <div class="cell-title">
                <!--<NbCheckbox :val="financePayInfo.uuid" v-model="uuIds"  />-->
                <div class="col-md-8 col-sm-8 col-xs-8 font-height ">{{financePayInfo.name}}</div>
                <div class="col-md-4 col-sm-4 col-xs-4 font-height" :style="'color:'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</div>
              </div>
            </div>
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
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";
  import NbCheckbox from "../../../../components/NbCheckbox";
  import {Notification as NotificationBox,MessageBox} from 'element-ui'
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        uuIds: [],
        pager: new Pager(FinancePayInfo),
        financePayInfo: new FinancePayInfo(),
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
      NbCheckbox,
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
      },
      delReminder(financePayInfo){
        let that = this;
        MessageBox.confirm('确定移除此项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {

          that.del(financePayInfo)

        }, function () {
        });

      },
      del(financePayInfo){
        let index = this.uuIds.indexOf(financePayInfo);
        this.uuIds.splice(index, 1);
        this.pager.data.splice(index, 1);
        this.pager.enableHistory();
      },
      reminder(){
       let that = this;
       //let uuIds = [];
        this.pager.data.forEach(financePayInfo =>{
          this.uuIds.push(financePayInfo.uuid)
        });
        this.financePayInfo.httpReminder(this.uuIds, function () {
          NotificationBox.success({
            message: "群催款成功"
          });
        });
      }
    },
    mounted(){
      let that = this;
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      if(this.pager.getFilter("status")){
        this.pager.setFilterValue("status", "PAYING");
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
  .reminder-list {
    padding: 20px 120px 0 30px;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .table-title{
      color: #888888;
      font-size: 18px;
    }
    .description{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
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

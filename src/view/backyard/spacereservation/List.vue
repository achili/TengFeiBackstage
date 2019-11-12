<template>
  <div class="animated fadeIn reservation-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>会议室预定列表</span>
        </div>
        <div class="pull-right">
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

    <div class="row mt25">

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left" >
        <div class="col-md-1 col-sm-1 col-xs-1 description">创建者</div>
        <div class="col-md-2 col-sm-2 col-xs-2 description">
          <NbTableFilter name="编号" :filter="pager.getFilter('orderNo')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1 description">名称</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description">电话</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="right">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 description" align="center">
          <NbTableFilter name="开始时间" :filter="pager.getFilter('orderStartTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
          </div>
        <div class="col-md-2 col-sm-2 col-xs-2 description" align="center">
          <NbTableFilter name="结束时间" :filter="pager.getFilter('orderEndTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1 description">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 description" align="center">是否付款</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20" align="left">
        <div v-for="spaceReservation in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="spaceReservation.uuid" :class="spaceReservation.deleted === true ? 'bg-change':''"
             @click.stop.prevent="spaceReservation.deleted||$router.push({path:'/by/spacereservation/detail',query:{uuid:spaceReservation.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" style="white-space:nowrap;"><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:spaceReservation.creator.uuid}})"><NbEntityLink :entity="spaceReservation.creator"></NbEntityLink></div></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" :title="spaceReservation.no">{{spaceReservation.no}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" >{{spaceReservation.name}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" >{{spaceReservation.creator.phone}}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">{{spaceReservation.createTime | simpleDate }}</div>
            <div class="col-md-2 col-sm-1 col-xs-2 font-min-height  pl55">{{spaceReservation.startTime | simpleDateMinute }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height  pl60">{{spaceReservation.endTime | simpleDateMinute }}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">
              <span class="f14 " :style="'color:'+ spaceReservation.getStatusStyle()" >{{spaceReservation.getStatusName()}}</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" style="white-space:nowrap;" v-if="spaceReservation.status === 'NOT_RECEIVE' && !spaceReservation.deleted" align="center">
              <a title="已接待" href="javascript:void(0)" v-show="spaceReservation.status === 'NOT_RECEIVE'" @click.stop.prevent="reception(spaceReservation)">
                <i class="fa fa-check-circle f25 cell-normal" ></i>
              </a>
            </div>
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
  import Pager from "../../../common/model/_base/Pager";
  import SpaceReservation from "../../../common/model/spacereservation/SpaceReservation";
  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";
  import {humanTime} from "../../../common/filter/time";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbMultiFilter from "../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
		data () {
			return {
        user: this.$store.state.user,
        pager: new Pager(SpaceReservation),
        spaceReservation: new SpaceReservation(),
        FeatureType,
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
      received(spaceReservation){
        MessageBox.confirm('此操作后用户可修改订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          spaceReservation.httpStatus(spaceReservation.Status.NOT_RECEIVE, function () {
            spaceReservation.status = spaceReservation.Status.NOT_RECEIVE;
          });
        },function () {})
      },
      reception(spaceReservation){
        MessageBox.confirm('此操作将发短信给用户（无法撤回）, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          spaceReservation.httpStatus(spaceReservation.Status.RECEIVE, function () {
            spaceReservation.status = spaceReservation.Status.RECEIVE;
          });
        },function () {})
      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){

        this.pager.httpFastPage();
      },
      goEdit(e){
        this.$router.push({path:'/by/spaceReservation/create',query:{uuid:e}});
      },
      goDel(spaceReservation){
        let that = this;
        spaceReservation.confirmDel(function () {
          that.refresh();
        });
      }
    },
		mounted(){
		  let that = this;
      // this.pager.setFilterValue('deleted', false);
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      // if(this.pager.getFilter("status")){
      //   this.pager.setFilterValue("status", "NOT_RECEIVE");
      // }
      this.pager.setFilterValue('isTwo', true);
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
  .reservation-list{
    padding: 20px 30px 0 30px;
    .description{
      min-height: 16px;
      font-size: 16px;
     // white-space:nowrap;
      overflow: hidden;
      color: #888888;
      //line-height: 20px;
      max-height: 40px;
      margin-top: 10px;
    }
    .table-title{
      color: #888888;
      font-size: 18px;
    }
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

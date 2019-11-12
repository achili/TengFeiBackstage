<template>
  <div class="animated fadeIn siteReservation-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>活动场地订单</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/siteReservation/create')">
            <span>活动场地申请</span>
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

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left" >
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">创建者</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">地点</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">电话</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">
          <NbTableFilter name="使用日期" :filter="pager.getFilter('orderStartTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" align="left">
        <div v-for="siteReservation in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="siteReservation.uuid" :class="siteReservation.deleted === true ? 'bg-change':''"
             @click.stop.prevent="siteReservation.deleted||$router.push({path:'/by/siteReservation/detail',query:{uuid:siteReservation.uuid}})" >
          <div class="media pl25"  >
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" ><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:siteReservation.creator.uuid}})"><NbEntityLink :entity="siteReservation.creator"></NbEntityLink></div></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" >{{siteReservation.address}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">
              <span>{{siteReservation.creator.phone}}</span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">{{siteReservation.createTime | complexHumanTime()}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">
              {{siteReservation.startTime | simpleDateMinute }}
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-max-height">
              <span :style="'color:'+siteReservation.getStatusStyle()">{{siteReservation.getStatusName()}}</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-max-height">
              <span class="f16 cell-deleted"  v-if="siteReservation.status === 'NOT_RECEIVE'">
                <a title="已处理" href="javascript:void(0)" v-show="siteReservation.status === 'NOT_RECEIVE'" @click.stop.prevent="reception(siteReservation)">
                  <i class="fa fa-check-circle f25 cell-normal" ></i>
                </a>
              </span>
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
  import SiteReservation from "../../../common/model/sitereservation/SiteReservation";
  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";
  import {humanTime,simpleDateMinute} from "../../../common/filter/time"
  import {Notification as NotificationBox,MessageBox} from 'element-ui'
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbMultiFilter from "../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
		data () {
			return {
        pager: new Pager(SiteReservation),
        siteReservation: new SiteReservation(),
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
      received(bookTour){
        bookTour.httpStatus(bookTour.Status.NOT_RECEIVE, function () {
          bookTour.status = bookTour.Status.NOT_RECEIVE;
        });
      },
      reception(bookTour){
        let that = this;
        MessageBox.confirm('确定要修改此项吗?修改后不可撤回！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {

          bookTour.httpStatus(bookTour.Status.RECEIVE, function () {
            bookTour.status = bookTour.Status.RECEIVE;
          });

        }, function () {
        });

      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      },
      goEdit(e){
        this.$router.push({path:'/by/siteReservation/create',query:{uuid:e}});
      },
      goDel(siteReservation){
        let that = this;
        siteReservation.confirmDel(function () {
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
  .siteReservation-list{
    padding: 20px 30px 0 30px;
    .description{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
    }
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

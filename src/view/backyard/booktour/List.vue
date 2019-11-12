<template>
  <div class="animated fadeIn bookTour-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>预约参观列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
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

    <div class="row mt30">

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left">
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">创建者</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">地点</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">感兴趣</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">备注</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">电话</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-min">
          <NbTableFilter name="预约日期" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-min">是否接待</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20" align="left">
        <div v-for="bookTour in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="bookTour.uuid" :class="bookTour.deleted === true ? 'bg-change':''"
             @click.stop.prevent="bookTour.deleted||$router.push({path:'/by/book/tour/detail',query:{uuid:bookTour.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" style="white-space:nowrap;"><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:bookTour.creator.uuid}})"><NbEntityLink :entity="bookTour.creator"></NbEntityLink></div></div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" >{{bookTour.address}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height" ><span class="mr5" v-for="( c, index) in bookTour.characteristic" :key="index">{{c}}</span></div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">
              <span v-show="bookTour.remarks">{{bookTour.remarks}}</span>
              <span v-show="!bookTour.remarks"><span class="f14 cell-danger">未填写！</span></span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" >{{bookTour.phone}}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{bookTour.createTime | simpleDate }}</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-min-height">{{bookTour.startTime | simpleDateMinute }}</div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height">
              <span class="f14 cell-danger" v-if="bookTour.status === 'NOT_RECEIVE'">未接待</span>
              <span v-else class="f14 cell-normal" >已接待</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-min-height" align="center" v-if="bookTour.status === 'NOT_RECEIVE'">
              <a title="已接待" href="javascript:void(0)" v-show="bookTour.status === 'NOT_RECEIVE'" @click.stop.prevent="reception(bookTour)">
                <i class="fa fa-check-circle f25 cell-normal"></i>
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
  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";
  import BookTour from "../../../common/model/booktour/BookTour";
  import { Message, MessageBox, Notification } from 'element-ui'
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbMultiFilter from "../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(BookTour),
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
      }
    },
    mounted(){
      let that = this;
      this.pager.setFilterValue('deleted', false);
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      // if(this.pager.getFilter("status")){
      //   this.pager.setFilterValue("status", "NOT_RECEIVE");
      // }
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .bookTour-list{
    padding: 20px 30px 0 30px;
    .description{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      max-height: 100px;
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

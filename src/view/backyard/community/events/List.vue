<template>
  <div class="animated fadeIn events-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left ">
          <span class="title">一起玩列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 120px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/community/events/create')">
            <span>发布一起玩</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                 v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr12 f20">
            <NbCheckFilter :filter="pager.getFilter('all')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>

            <NbCheckFilter :filter="pager.getFilter('overdue')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>

            <NbCheckFilter :filter="pager.getFilter('deleted')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>
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
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">创建者</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">标题</div>
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">描述</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" >
        <div v-for="communityEvents in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="communityEvents.uuid" :class="communityEvents.deleted === true ? 'bg-change':''"
             @click.stop.prevent="communityEvents.deleted||$router.push({path:'/by/community/events/detail',query:{uuid:communityEvents.uuid}})" >
          <div class="media pl25">
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height"><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:communityEvents.creator.uuid}})"><NbEntityLink :entity="communityEvents.creator"></NbEntityLink></div></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">
              <span :class="communityEvents.deleted === true ? 'cell-time':''">{{communityEvents.title}}</span></div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-max-height">
              <span v-show="communityEvents.description" :class="communityEvents.deleted === true ? 'cell-time':''">{{communityEvents.description}}</span>
              <span v-show="!communityEvents.description"><span class="f16 cell-danger">未填写！</span></span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span :class="communityEvents.deleted === true ? 'cell-time':''">{{communityEvents.createTime | simpleDate }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span class="f16 cell-deleted" v-if="communityEvents.deleted === true">已删除</span>
              <span class="f16 cell-danger" v-else-if="overdue(communityEvents.endTime)">已过期</span>
              <span class="f16 cell-normal" v-else>正常</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-max-height" v-if="communityEvents.deleted === false">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="communityEvents.confirmDel(refresh)">
                <img class="logo" style="width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
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
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import CommunityEvents from "../../../../common/model/community/CommunityEvents";
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import NbCheckFilter from "../../../../components/filter/NbCheckFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";


  export default {
    data () {
      return {
        newTime: new Date(),
        pager: new Pager(CommunityEvents),
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
      NbCheckFilter,
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
      overdue(e){
        if(e.getTime() > this.newTime.getTime()){
          return false;
        }else {
          return true;
        }
      }
    },
    mounted(){
      let that = this;
      // this.pager.setFilterValue('deleted', false);
      // this.pager.setFilterValue("overdue", false);
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
  .events-list{
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

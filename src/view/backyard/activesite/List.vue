<template>
  <div class="animated fadeIn activeSite-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>活动场地列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/activeSite/create')">
            <span>创建活动场地</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr12 f20">
            <NbCheckFilter :filter="pager.getFilter('all')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>

            <NbCheckFilter :filter="pager.getFilter('normal')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>

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

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left">
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">创建者</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">名称</div>
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">介绍</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15">
        <div v-for="activeSite in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="activeSite.uuid" :class="activeSite.deleted === true ? 'bg-change':''"
             @click.stop.prevent="activeSite.deleted||$router.push({path:'/by/activeSite/detail',query:{uuid:activeSite.uuid}})" >
          <div class="media pl25">
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height"><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:activeSite.creator.uuid}})"><NbEntityLink :entity="activeSite.creator"></NbEntityLink></div></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" >
              <span :class="activeSite.deleted === true ? 'cell-time':''">{{activeSite.name}}</span></div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-max-height">
              <span v-show="activeSite.introduce" :class="activeSite.deleted === true ? 'cell-time':''">{{activeSite.introduce}}</span>
              <span v-show="!activeSite.introduce"><span class="f16 cell-danger">未填写！</span></span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span :class="activeSite.deleted === true ? 'cell-time':''">{{activeSite.createTime | simpleDate }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span class="f16 cell-deleted"  v-if="activeSite.deleted === true">已删除</span>
              <span v-else class="f16 cell-normal" >正常</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-max-height" v-if="activeSite.deleted === false">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="activeSite.confirmDel(refresh)">
                <img class="logo" style="width: 20px;height: 24px;" src="../../../assets/img/del.png"/>
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
  import ActiveSite from "../../../common/model/activesite/ActiveSite";
  import NbPager from "../../../components/NbPagerNew";
  import NbFilter from "../../../components/filter/NbFilter";
  import NbEntityLink from "../../../components/NbEntityLink";
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbCheckFilter from "../../../components/filter/NbCheckFilter";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

	export default {
		data () {
			return {
        pager: new Pager(ActiveSite),
        activeSite: new ActiveSite(),
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
      goEdit(e){
        this.$router.push({path:'/by/activeSite/create',query:{uuid:e}});
      },
      goDel(activeSite){
        let that = this;
        activeSite.confirmDel(function () {
          that.refresh();
        });
      }
    },
		mounted(){
      // this.pager.setFilterValue('deleted', false);
      let that = this;
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      this.pager.enableHistory();
      this.pager.setFilterValue("orderCreateTime", "DESC");
      this.refresh();
    }
	}
</script>
<style lang="less" rel="stylesheet/less">
  .activeSite-list{
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

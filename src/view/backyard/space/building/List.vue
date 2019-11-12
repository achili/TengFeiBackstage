<template>
  <div class="animated fadeIn spaceBuilding-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left f24">
          <span class="title">楼栋列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/space/building/create')">
            <span>创建楼栋</span>
            </button>
          </span>
          <span class="pull-right mr20">
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

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" align="left">
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">空间名</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">面积</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">所属城市</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">地点</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">房产权编号</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" align="left">
        <div v-for="spaceBuilding in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="spaceBuilding.uuid" :class="spaceBuilding.deleted === true ? 'bg-change':''"
             @click.stop.prevent="spaceBuilding.deleted||$router.push({path:'/by/space/building/detail',query:{uuid:spaceBuilding.uuid}})" >
          <div class="media pl25">
            <div class="col-md-2 col-sm-2 col-xs-2 description">
              <span :class="spaceBuilding.deleted === true ? 'cell-time':''">{{spaceBuilding.name}}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 description" >
              <span :class="spaceBuilding.deleted === true ? 'cell-time':''">{{spaceBuilding.area}}m²</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 description">
              <span :class="spaceBuilding.deleted === true ? 'cell-time':''">{{spaceBuilding.city}}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 description">
              <span :class="spaceBuilding.deleted === true ? 'cell-time':''">{{spaceBuilding.address }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 description">
              <span :class="spaceBuilding.deleted === true ? 'cell-time':''">{{spaceBuilding.certificateNo }}</span></div>
            <div class="col-md-1 col-sm-1 col-xs-1 description">
              <span class="f14 cell-deleted" v-if="spaceBuilding.deleted === true">已删除</span>
              <span v-else class="f14 cell-normal">正常</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 description" v-if="spaceBuilding.deleted === false">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="spaceBuilding.confirmDel(refresh)">
                <img style="width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
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
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import SpaceBuilding from "../../../../common/model/space/SpaceBuilding";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(SpaceBuilding),
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
  .spaceBuilding-list{
    padding: 20px 30px 0 30px;
    .description{
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
      font-size: 14px;
      color: #666666;
      margin-top: 30px;
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

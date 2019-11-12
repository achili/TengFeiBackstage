<template>
  <div class="animated fadeIn office-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left">
          <span class="title">办公室列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/space/office/create')">
            <span>创建办公室</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr20">
            <NbFilterHttpSelection :filter="pager.getFilter('spaceBuildingUuid')" :callback="search"/>
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

      <div class="col-md-12 col-xs-12 table-title pl40" align="left">
        <div class="col-md-1 col-xs-1 font-cell-min">空间名</div>
        <div class="col-md-1 col-xs-1 font-cell-min">面积</div>
        <div class="col-md-2 col-xs-2 font-cell-min">所属大楼</div>
        <div class="col-md-1 col-xs-1 font-cell-min">工位数量</div>
        <div class="col-md-4 col-xs-4 font-cell-min">地址</div>
        <div class="col-md-1 col-xs-1 font-cell-min">状态</div>
        <div class="col-md-2 col-xs-2 font-cell-min" align="center">操作</div>
      </div>

      <div class="col-md-12 col-xs-12 mt15" align="left">
        <div v-for="spaceOffice in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="spaceOffice.uuid" :class="spaceOffice.deleted === true ? 'bg-change':''"
             @click.stop.prevent="spaceOffice.deleted||$router.push({path:'/by/space/office/detail',query:{uuid:spaceOffice.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-1 col-xs-1 font-min-height">
              <span :class="spaceOffice.deleted === true ? 'cell-time':''">{{spaceOffice.name}}</span></div>
            <div class="col-md-1 col-xs-1 font-min-height" >
              <span :class="spaceOffice.deleted === true ? 'cell-time':''">{{spaceOffice.area}}m²</span></div>
            <div class="col-md-2 col-xs-2 font-min-height">
              <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/building/detail',query:{uuid:spaceOffice.spaceBuilding.uuid}})">{{spaceOffice.spaceBuilding.name}}</a>
              </div>
            <div class="col-md-1 col-xs-1 font-min-height">
              <span :class="spaceOffice.deleted === true ? 'cell-time':''">{{spaceOffice.seatNum }}</span></div>
            <div class="col-md-4 col-xs-4 font-min-height">
              <span :class="spaceOffice.deleted === true ? 'cell-time':''">{{spaceOffice.address }}</span></div>
            <div class="col-md-1 col-xs-1 font-min-height" >
              <span v-if="spaceOffice.deleted === false" :style="'color:'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>
              <span v-else class="f14 cell-deleted">已删除</span>
            </div>
            <div class="col-md-2 col-xs-2 font-min-height" v-if="spaceOffice.deleted === false" align="center">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="spaceOffice.confirmDel(refresh)">
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
  import SpaceOffice from "../../../../common/model/space/SpaceOffice";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import NbFilterHttpSelection from "../../../../components/filter/NbFilterHttpSelection";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(SpaceOffice),
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
      NbFilterHttpSelection,
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
  .office-list{
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

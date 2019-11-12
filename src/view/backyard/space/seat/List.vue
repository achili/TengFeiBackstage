<template>
  <div class="animated fadeIn seat-list">
    <div class="row">
      <div class="col-md-12 col-xs-12 col-xs-12">
        <div class="pull-left">
          <span class="title">办公桌列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/space/seat/create')">
            <span>创建办公桌</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr20">
            <NbFilterHttpSelection :filter="pager.getFilter('spaceOfficeUuid')" :callback="search"/>
          </span>
          <span class="pull-right mr12 f20">
            <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
          </span>
        </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12 col-xs-12 col-xs-12">
        <div class="segmenting-line"></div>
      </div>
    </div>

    <div class="row mt35">

      <div class="col-md-12 col-xs-12 col-xs-12 table-title pl40">
        <div class="col-md-1 col-xs-1 col-xs-1 font-cell-min">空间名</div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-min">价格</div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-min">所属房间</div>
        <div class="col-md-2 col-xs-2 col-xs-2 font-cell-min">属性</div>
        <div class="col-md-3 col-xs-3 col-xs-3 font-cell-min">地址</div>
        <div class="col-md-1 col-xs-1 col-xs-1 font-cell-min">状态</div>
        <div class="col-md-1 col-xs-1 col-xs-1 font-cell-min">操作</div>
      </div>

      <div class="col-md-12 col-xs-12 col-xs-12 mt15" >
        <div v-for="spaceSeat in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="spaceSeat.uuid" :class="spaceSeat.deleted === true ? 'bg-change':''"
             @click.stop.prevent="spaceSeat.deleted||$router.push({path:'/by/space/seat/detail',query:{uuid:spaceSeat.uuid}})" >
          <div class="media pl25">
            <div class="col-md-1 col-xs-1 col-xs-1  font-min-height">{{spaceSeat.name}}</div>
            <div class="col-md-2 col-xs-2 col-xs-2  font-min-height" >{{spaceSeat.day}}元/天  {{spaceSeat.month}}元/月</div>
            <div class="col-md-2 col-xs-2 col-xs-2  font-min-height">
              <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/office/detail',query:{uuid:spaceSeat.spaceOffice.uuid}})">{{spaceSeat.spaceOffice.name}}</a>
              </div>
            <div class="col-md-2 col-xs-2 col-xs-2  font-min-height">
               <span v-for="(a,index) in AttributeMap" :key="index">
                  <span v-for="(c,index) in spaceSeat.attribute" :key="index">
                    <span class="mr10" v-if="c === a.val">{{a.name}}</span>
                  </span>
                </span>
            </div>
            <div class="col-md-3 col-xs-3 col-xs-3  font-min-height">{{spaceSeat.address }}</div>
            <div class="col-md-1 col-xs-1 col-xs-1  font-min-height">
              <span v-if="spaceSeat.deleted === false" :style="'color:'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span>
              <span v-else class="f14 cell-deleted">已删除</span>
            </div>
            <div class="col-md-1 col-xs-1 col-xs-1  font-min-height" v-if="spaceSeat.deleted === false">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="spaceSeat.confirmDel(refresh)">
                <img class="logo" style="width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-xs-12 col-xs-12 mt20">
        <div>
          <NbPager :pager="pager" :callback="refresh"></NbPager>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Pager from "../../../../common/model/_base/Pager";
  import NbPager from "../../../../components/NbPagerNew";
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbEntityLink from "../../../../components/NbEntityLink";
  import NbFilterHttpSelection from "../../../../components/filter/NbFilterHttpSelection";
  import NbMultiFilter from "../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import SpaceSeat from "../../../../common/model/space/SpaceSeat";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        AttributeMap:SpaceSeat.prototype.AttributeMap,
        pager: new Pager(SpaceSeat),
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
  .seat-list{
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

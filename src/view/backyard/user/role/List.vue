<template>
  <div class="animated fadeIn userRole-list">
    <div class="row">
      <div class="col-md-12">
        <div class="pull-left ">
          <span class="title">角色列表</span>
        </div>
        <div class="pull-right f24">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/user/role/create')">
            <span>新建角色</span>
            </button>
          </span>
          <span class="pull-right  mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('name').value" @keyup.enter="search"  @blur="search" >
          </span>
        </div>
      </div>
    </div>

    <div class="row mt20 ">

      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="segmenting-line"></div>

        <div class="row mt35">
          <div class="col-md-12 col-sm-12 col-xs-12 pl40 cell-subtitle" >
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid"  >角色名称</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid"  >详情</div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid"  >简介</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid"  >
              <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
          </div>
        </div>

        <div class="row mt5">
          <div class="col-md-12 col-sm-12 col-xs-12" align="left">
            <div v-for="userRole in pager.data"  class="bg-white pt30 br4 mt18 cursor" style="height: 100px;" :key="userRole.uuid" :class="userRole.deleted === true ? 'bg-change':''"
                 @click.stop.prevent="userRole.deleted||$router.push({path:'/by/user/role/detail',query:{uuid:userRole.uuid}})">
              <div class="media pl25" >
                <div class="col-md-3 col-sm-3 col-xs-3 font-height">
                  <span :class="userRole.deleted === true ? 'cell-time':''">{{userRole.name}}</span></div>
                <div class="col-md-3 col-sm-3 col-xs-3 font-height">
                  <span :class="userRole.deleted === true ? 'cell-time':''">{{userRole.description}}</span></div>
                <div class="col-md-2 col-sm-2 col-xs-2 font-height">
                  <span :class="userRole.deleted === true ? 'cell-time':''">{{userRole.special ? "系统内置角色" : "自定义角色"}}</span></div>
                <div class="col-md-3 col-sm-3 col-xs-3 font-height">
                  <span :class="userRole.deleted === true ? 'cell-time':''">{{userRole.createTime | simpleDateMinute }}</span></div>
                <div class="col-md-1 col-sm-1 col-xs-1 font-height">
                  <a v-if="userRole.deleted === false" href="javascript:void(0)" title="删除" @click.stop.prevent="userRole.confirmDel(refresh)">
                    <img class="logo" style="min-width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-md-12 mt20">
        <div >
          <NbPager :pager="pager" :callback="refresh"></NbPager>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import NbFilter from "../../../../components/filter/NbFilter";
  import NbPager from "../../../../components/NbPagerNew";
  import {MessageBox, Notification} from 'element-ui'
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";

  import Pager from "../../../../common/model/_base/Pager";
  import UserRole from  "../../../../common/model/user/role/UserRole"
  import NbTableFilter from "../../../../components/filter/NbTableFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default{
    data(){
      return {
        pager: new Pager(UserRole),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"

      }
    },
    components: {
      NbFilter,
      NbPager,
      NbTableFilter,
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
  .userRole-list {
    padding: 20px 30px 0 30px;
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

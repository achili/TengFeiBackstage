<template>
  <div class="animated fadeIn invite">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left cell-max-title">
          <span>邀请访客列表</span>
        </div>
        <div class="pull-right f24">
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr12">
            <NbCheckFilter :filter="pager.getFilter('all')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>
            <NbCheckFilter :filter="pager.getFilter('isOverdue')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>
            <NbCheckFilter :filter="pager.getFilter('deleted')" :filters="pager.FILTERS" :callback="refresh"></NbCheckFilter>
          </span>
        </div>
      </div>
    </div>

    <div class="row mt20 ">

      <div class="col-md-12 col-sm-12 col-xs-12 invite-list">
        <div class="segmenting-line"></div>

        <div class="row mt35">
          <div class="col-md-12 col-sm-12 col-xs-12 pl40 cell-subtitle" align="left">
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">邀请人用户名</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">访客</div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">
              <NbTableFilter name="到访时间" :filter="pager.getFilter('orderInvitingTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">
              <NbTableFilter name="离开时间" :filter="pager.getFilter('orderAccessTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">状态</div>
          </div>
        </div>

        <div class="row mt5">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div v-for="inviteVisitor in pager.data"  class="bg-white p10 br4 mt18 cursor" style="height: 100px;" :key="inviteVisitor.uuid" :class="inviteVisitor.deleted === true ? 'bg-change':''"
                 @click.stop.prevent="inviteVisitor.deleted||$router.push({path:'/by/invite/visitor/detail',query:{uuid:inviteVisitor.uuid}})">
              <div class="media" >
                <div class="media-body pl25" >
                  <div class="col-md-3 col-sm-3 col-xs-3 font-max-height" >
                    <a class="cell-blue f16" @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:inviteVisitor.creator.uuid}})">{{inviteVisitor.inviteName}}</a>
                  </div>
                  <div class="col-md-3 col-sm-3 col-xs-3 font-max-height">
                    <span :class="inviteVisitor.deleted === true ? 'cell-time':''">{{inviteVisitor.name}}</span>
                  </div>
                  <div class="col-md-3 col-sm-3 col-xs-3 font-max-height">
                    <span :class="inviteVisitor.deleted === true ? 'cell-time':''">{{inviteVisitor.invitingTime | simpleDateMinute }}</span></div>
                  <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">
                    <span :class="inviteVisitor.deleted === true ? 'cell-time':''">{{inviteVisitor.accessTime | simpleDateMinute }}</span></div>
                  <div class="col-md-1 col-sm-1 col-xs-1 font-max-height">
                    <span class="cell-deleted f16" v-if="inviteVisitor.deleted === true">已删除</span>
                    <span class="cell-danger f16" v-else-if="inviteVisitor.accessTime.getTime() < new Date().getTime()">已过期</span>
                    <span class="cell-normal f16" v-else>正常</span>
                  </div>
                </div>
              </div>
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
  import InviteVisitor from "../../../common/model/invite/InviteVisitor";
  import NbRadio from "../../../components/NbRadio";
  import NbTableFilter from "../../../components/filter/NbTableFilter";
  import NbFilterCheck from "../../../components/filter/NbFilterCheck";
  import NbCheckFilter from "../../../components/filter/NbCheckFilter";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";


  export default {
    data () {
      return {
        pager: new Pager(InviteVisitor),
        del:false,
        FeatureType,
        spaceRegional: new SpaceRegional(),
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        spaceUserIdKey: "the_bridge_space_"
      }
    },
    components: {
      NbPager,
      NbFilter,
      NbEntityLink,
      NbRadio,
      NbTableFilter,
      NbFilterCheck,
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
      }
    },
    mounted(){
      let that = this;
      //this.pager.setFilterValue('deleted', null);
      this.pager.setFilterValue("orderAccessTime", "ASC");
      //this.pager.setFilterValue("isOverdue", null);
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
  .invite {
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
  }
</style>

<template>
  <div class="animated fadeIn conferenceRoom-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>会议室列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/conferenceRoom/create')">
            <span>创建会议室</span>
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

      <div class="col-md-12 col-sm-12 col-xs-12 table-title pl40" >
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">创建者</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid">名称</div>
        <div class="col-md-3 col-sm-3 col-xs-3 font-cell-mid">简介</div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">
          <NbTableFilter name="创建时间" :filter="pager.getFilter('orderCreateTime')" :filters="pager.FILTERS" :callback="refresh"></NbTableFilter>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-2 font-cell-mid" align="center">状态</div>
        <div class="col-md-1 col-sm-1 col-xs-1 font-cell-mid">操作</div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt15" align="left">
        <div v-for="conferenceRoom in pager.data"  style="height: 90px;line-height: 90px;" class="bg-white mt10 cursor" :key="conferenceRoom.uuid" :class="conferenceRoom.deleted === true ? 'bg-change':''"
             @click.stop.prevent="conferenceRoom.deleted||$router.push({path:'/by/conferenceRoom/detail',query:{uuid:conferenceRoom.uuid}})" >
          <div class="media pl25" >
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" style="white-space:nowrap;"><div @click.stop.prevent="$router.push({path:'/by/user/edit',query:{uuid:conferenceRoom.creator.uuid}})"><NbEntityLink :entity="conferenceRoom.creator"></NbEntityLink></div></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height">
              <span :class="conferenceRoom.deleted === true ? 'cell-time':''">{{conferenceRoom.name}}</span></div>
            <div class="col-md-3 col-sm-3 col-xs-3 font-max-height">
              <span v-show="conferenceRoom.introduce" :class="conferenceRoom.deleted === true ? 'cell-time':''">{{conferenceRoom.introduce}}</span>
              <span v-show="!conferenceRoom.introduce"><span class="f16 cell-danger">未填写！</span></span>
            </div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span :class="conferenceRoom.deleted === true ? 'cell-time':''">{{conferenceRoom.createTime | simpleDate }}</span></div>
            <div class="col-md-2 col-sm-2 col-xs-2 font-max-height" align="center">
              <span class="f16 cell-deleted" v-if="conferenceRoom.deleted === true">已删除</span>
              <span class="f16 cell-normal" v-else>正常</span>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-1 font-max-height" v-if="conferenceRoom.deleted === false">
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="conferenceRoom.confirmDel(refresh)">
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
  import ConferenceRoom from "../../../common/model/conferenceroom/ConferenceRoom";
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
        pager: new Pager(ConferenceRoom),
        conferenceRoom: new ConferenceRoom(),
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
        this.$router.push({path:'/by/conferenceRoom/create',query:{uuid:e}});
      },
      goDel(conferenceRoom){
        let that = this;
        conferenceRoom.confirmDel(function () {
          that.refresh();
        });
      }
    },
		mounted(){
		  let that = this;
      this.pager.setFilterValue("orderCreateTime", "DESC");
      // this.pager.setFilterValue('deleted', false);
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
  .conferenceRoom-list{
    padding: 20px 30px 0 30px;
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

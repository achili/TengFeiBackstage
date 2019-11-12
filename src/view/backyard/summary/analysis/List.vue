<template>
  <div class="animated fadeIn news-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left title">
          <span>图表分析列表</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button style="width: 128px;height: 37px;" class="btn btn-theme" @click.stop.prevent="$router.push('/by/summary/analysis/create')">
            <span>创建图表分析</span>
            </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt10">

      <div class="col-md-12 col-sm-12 col-xs-12 mt10" align="center">
        <div v-for="(summaryAnalysis,index) in pager.data"  style="height: 100px;font-size: 16px;color: #666666;line-height: 100px;" class="bg-white mt10 cursor" :key="summaryAnalysis.uuid" :class="summaryAnalysis.deleted === true ? 'bg-change':''"
             @click.stop.prevent="summaryAnalysis.deleted||$router.push({path:'/by/summary/analysis/edit',query:{uuid:summaryAnalysis.uuid}})" >
          <div class="media" >
            <div class="pull-left" style="padding-left: 40px;" >{{index + 1}}.{{summaryAnalysis.title}}</div>
            <div class="pull-right" style="padding-right: 40px;"  >
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="summaryAnalysis.confirmDel(refresh)">
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
  import SummaryAnalysis from "../../../../common/model/summary/analysis/SummaryAnalysis";
  import NbSelectionFilter from "../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../../common/util/Utils";

  export default {
    data () {
      return {
        newTime: new Date(),
        pager: new Pager(SummaryAnalysis),
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
      this.pager.setFilterValue('deleted', false);
      if(this.pager.getFilter("orderCreateTime")){
        this.pager.setFilterValue("orderCreateTime", "DESC");
      }
      this.spaces.forEach(space=>{
        if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
          that.pager.setFilterValue("spaceRegionalUuid",readLocalStorage(that.spaceUserIdKey + that.user.uuid))
        }
      });
      // this.pager.setFilterValue("overdue", false);
      this.pager.enableHistory();
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .news-list{
    padding: 20px 30px 0 30px;
    color: #666666;
    font-size: 16px;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .news-title{
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

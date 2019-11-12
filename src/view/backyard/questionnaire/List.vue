<template>
  <div class="animated fadeIn questionnaire-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left">
          <span class="title">问卷系统</span>
        </div>
        <div class="pull-right">
          <span class="pull-right">
            <button class="btn btn-info" @click.stop.prevent="$router.push('/by/questionnaire/system/create')">
              <span>创建问卷</span>
            </button>
          </span>
          <span class="pull-right mr10">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <!--<span class="pull-right mr10">-->
            <!--<NbSelectionFilter  :filter="pager.getFilter('spaceRegionalUuid')" :callback="search"/>-->
          <!--</span>-->
        </div>
      </div>
    </div>

    <div class="row mt30">

      <div class="col-md-12 col-sm-12 col-xs-12">
        <div style="border-bottom: 1px #e2e2e2 solid;"></div>
      </div>

      <div class="col-md-12 col-sm-12 col-xs-12 mt20">
        <div v-for="(questionnaireSystem,index) in pager.data"  style="height: 100px;" class="bg-white p10 br4 mt10 cursor" :key="questionnaireSystem.uuid"
             @click.stop.prevent="$router.push({path:'/by/questionnaire/system/detail',query:{uuid:questionnaireSystem.uuid}})">
          <div class="media">
            <div class="pull-right description">
              <!--<a title="编辑" @click.stop.prevent="$router.push({path:'/by/questionnaire/system/edit',query:{uuid:questionnaireSystem.uuid}})">-->
                <!--<i class="fa fa-pencil text-info f20"></i>-->
              <a title="下载XLS" class="mr10" @click.stop.prevent="questionnaireSystem.downloadXls()">
                <i class="fa fa-file-excel-o text-success f20"></i>
              </a>
              <a title="删除" href="javascript:void(0)" @click.stop.prevent="questionnaireSystem.confirmDel(refresh)">
                <img class="logo mr20" style="width: 20px;height: 24px;" src="../../../assets/img/del.png"/>
              </a>
            </div>
            <div class="media-body" style="font-size: 16px;color: #666666;">
              <div class="col-md-2 col-sm-2 col-xs-2 description">{{index + 1 }} .{{questionnaireSystem.title}}</div>
              <div class="col-md-2 col-sm-2 col-xs-2 description">{{questionnaireSystem.description}}</div>
              <div class="col-md-2 col-sm-2 col-xs-2 description">{{questionnaireSystem.createTime | humanTime }}</div>
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
  import QuestionnaireSystem from "../../../common/model/questionnaire/QuestionnaireSystem";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(QuestionnaireSystem),
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
  .questionnaire-list {
    padding: 20px 30px 0 30px;
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
    .description{
      line-height: 20px;
      max-height: 40px;
      overflow: hidden;
      font-size: 16px;
      color: #666666;
      margin-top:25px;
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

<template>
  <div class="animated fadeIn privilege-list">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="pull-left f24">
          <span>福利列表</span>
        </div>
        <div class="pull-right f24">
          <span class="pull-right">
              <button class="btn btn-theme" @click.stop.prevent="$router.push('/by/privilege/create')">
            <span>创建专享福利</span>
          </button>
          </span>
          <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>

        </div>
      </div>
    </div>

    <div class="row mt20 ">

      <div class="col-md-12 col-sm-12 col-xs-12 invite-list">
        <div class="segmenting-line"></div>

        <div class="row mt35">
          <div class="col-md-12 col-sm-12 col-xs-12 pl40">
            <div class="col-md-3 col-sm-3  col-xs-3  cell-subtitle font-cell-mid"  >名称</div>
            <div class="col-md-4 col-sm-4  col-xs-4  cell-subtitle font-cell-mid"  >内容</div>
            <div class="col-md-3 col-sm-3  col-xs-3  cell-subtitle font-cell-mid" >合作伙伴</div>
            <div class="col-md-2 col-sm-2 col-xs-2  cell-subtitle font-cell-mid" align="center" >操作</div>
          </div>
        </div>

        <div class="row mt5">
          <div class="col-md-12 col-sm-12 col-xs-12" align="left">
            <div v-for="privilege in pager.data"  class="bg-white p10 br4 mt18" style="height: 100px;" :key="privilege.uuid"
                >
              <div class="media">
                <div class="media-body pl25">
                  <div class="col-md-3 col-sm-3 col-xs-3 description">
                    <span><img class=" " width="65" height="43" :src="privilege.poster.getUrlBySize(100,150)"></span>
                    <span class="mr16 cell-title">{{privilege.title}}</span>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4 description">
                    <span class="cursor" :title="privilege.description" >{{privilege.description}}</span>
                  </div>
                  <div class="col-md-3 col-sm-3 col-xs-3 description" >
                    <span v-if="privilege.type === 'INDIVIDUAL'">{{privilege.validTime | date("yyyy年MM月dd日")}}前有效</span>
                    <div v-if="privilege.type === 'CORPORATE'">
                  <span v-for="(c,index) in privilege.cooperativePartner" :key="index">
                    |<img style="border-radius:50%; overflow:hidden;" :src="c.picture.getUrlBySize(30,30)" />
                    {{c.name}}
                    <i class="fa fa-info text-navy"></i> {{c.subtitle}}
                  </span>
                    </div>
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-2 description" align="center">
                    <a title="编辑" @click.stop.prevent="$router.push({path:'/by/privilege/edit',query:{uuid:privilege.uuid}})">
                      <img class="logo mr10" style="width: 20px;height: 20px;" src="../../../assets/img/edit.png"/>
                    </a>
                    <a title="删除" href="javascript:void(0)" @click.stop.prevent="privilege.confirmDel(refresh)">
                      <img class="logo" style="width: 20px;height: 24px;" src="../../../assets/img/del.png"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-12 mt20">
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
  import Privilege from "../../../common/model/privilege/Privilege";
  import NbSelectionFilter from "../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../common/model/core/feature/FeatureType";
  import {readLocalStorage} from "../../../common/util/Utils";

  export default {
    data () {
      return {
        pager: new Pager(Privilege),
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
    mounted() {
      let that = this;
      if (this.pager.getFilter("orderCreateTime")) {
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
  .privilege-list {
    padding: 20px 30px 0 30px;
    font-size: 16px;
    color: #666666;
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
    .bg-change{
      background-color: #f6f6f6 !important;
    }
    .description{
      line-height: 20px;
      max-height: 40px;
      overflow: hidden;
      font-size: 16px;
      color: #666666;
      margin-top:20px;
    }

  }
</style>

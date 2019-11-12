<template>
  <div class="by-spaceBuilding-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left f26">
          <span class="ml15 cell-max-title" >楼栋详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <div class="col-md-3">楼栋名称</div>
              <div class="col-md-9">{{spaceBuilding.name}}</div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">面积</div>
              <div class="col-md-9">
                {{spaceBuilding.area}}m²
              </div>
            </div>

            <div class="row pt15">
              <div class="col-md-3 mt5">所属城市</div>
              <div class="col-md-9">
                {{spaceBuilding.city}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">房产权编号</div>
              <div class="col-md-9">
                {{spaceBuilding.certificateNo}}
              </div>
            </div>

            <div class="row pt20" >
              <div class="col-md-3">地点</div>
              <div class="col-md-9">
                {{spaceBuilding.address}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">描述</div>
              <div class="col-md-9">
                {{spaceBuilding.depict}}
              </div>
            </div>

            <div class="row pt20">
              <div class="col-md-3">所属空间</div>
              <div class="col-md-9">
                {{spaceBuilding.spaceRegional.name}}
              </div>
            </div>

            <div class="row pr35 pb10">
              <button title="编辑" class="btn btn-theme pull-right" style="width: 122px;height: 46px;"
                      @click.stop.prevent="$router.push({path:'/by/space/building/edit',query:{uuid:spaceBuilding.uuid}})">
                编辑
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <span class="cell-subtitle pl15">房间列表</span>
            </div>

            <div class="row">
              <div class="col-md-12 pt30" v-for="spaceOffice in officePager.data" :key="spaceOffice.uuid" >
                <div>
                   <span class="pr30">
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/space/office/detail',query:{uuid:spaceOffice.uuid}})">
                         {{spaceOffice.name}}
                    </a></span>
                  <span class="mr27" :style="'color:'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>
                </div>
              </div>
              <div class="col-md-12 mt20">
                <NbPager :pager="officePager" :callback="refresh"></NbPager>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../../components/NbLoadingFrame";
  import SpaceBuilding from "../../../../common/model/space/SpaceBuilding";
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceOffice from "../../../../common/model/space/SpaceOffice";
  import NbPager from "../../../../components/NbPager";

  export default {
    data () {
      return {
        spaceBuilding: new SpaceBuilding(),
        officePager: new Pager(SpaceOffice)
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbPager
    },
    methods: {
      refresh() {
        this.officePager.httpFastPage();
      }
    },
    mounted(){
      this.spaceBuilding.uuid = this.$route.query.uuid;

      this.spaceBuilding.httpDetail();
      this.officePager.setFilterValue("spaceBuildingUuid", this.spaceBuilding.uuid);
      this.officePager.httpFastPage();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-spaceBuilding-detail {
    padding: 20px 100px 0 30px;
    .mail-body {
      font-size: 14px;
      color: #9c9c9c;
    }
  }
</style>

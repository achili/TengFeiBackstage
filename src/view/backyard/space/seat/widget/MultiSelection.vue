<template>
  <div class="row space-room-multi-selection">

    <div class="col-md-12">
      <!--<NbFilter :pager="pager" :callback="search"></NbFilter>-->
      <div class=" f24">
          <span class="pull-left mr12" >
            <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
          </span>
          <span class="pull-right">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
          </span>
          <span class="pull-right mr20">
             <NbSelectionFilter  :filter="pager.getFilter('spaceRegionalUuid')" :callback="search"/>
         </span>
      </div>
    </div>


    <div v-for="spaceSeat in pager.data" :key="spaceSeat.key" style="height: 105px;max-height: 105px;margin: 10px 0;"
         class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
      <div class="p10 mt10 cursor border br4"
           :class="{'bg-white':!isActive(spaceSeat),'bg-azure':isActive(spaceSeat)}"
           @click.stop.prevent="clickItem(spaceSeat)">
        <div class="media">

          <div class="pull-right" v-if="isActive(spaceSeat)">
            <i class="fa fa-check-circle text-success f30 mt15 olive"></i>
          </div>

          <div class="media-body">
            <SpaceSeatCell :spaceSeat="spaceSeat"/>
          </div>

        </div>
      </div>
    </div>


    <div class="col-xs-12 mt20">
      <NbPager :pager="pager" :callback="refresh"></NbPager>
    </div>

  </div>
</template>
<script>
  import NbPager from "../../../../../components/NbPager";
  import NbFilter from "../../../../../components/filter/NbFilter";
  import SpaceSeatCell from "./SpaceSeatCell";
  import Pager from "../../../../../common/model/_base/Pager";
  import SpaceSeat from "../../../../../common/model/space/SpaceSeat";
  import NbMultiFilter from "../../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../../common/model/core/feature/FeatureType";
  import SpaceOrder from "../../../../../common/model/spaceOrder/SpaceOrder";

  export default{
    data(){
      return {
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces,
        pager: new Pager(SpaceSeat, 21)
      }
    },
    props: {
      spaceSeats: {
        type: Array,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      },
      spaceOrder:{
        type: SpaceOrder,
        required: true
      }
    },
    watch: {},
    methods: {
      spaceUpdate(){
        let that = this;
        // 杭州
        if(this.pager.getFilter('spaceRegionalUuid').value === 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af'){
          this.pager.setFilterValue("spaceOfficeUuid", "58fa71e7-0f81-4db7-843a-4a1553bd5326");
        }else if(this.pager.getFilter('spaceRegionalUuid').value === '10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c'){ // 苏州
          this.pager.setFilterValue("spaceOfficeUuid", "67403909-2b64-472a-ba11-97b8b983e39c");
        }else if(this.pager.getFilter('spaceRegionalUuid').value === 'cbfe0f31-284f-4eff-b66c-a3e68c41cf03'){ // 大连
          this.pager.setFilterValue("spaceOfficeUuid", "0db10774-e782-44d7-935c-853f5314e09f");
        }else{
          if(this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[0].uuid) && this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[1].uuid) && this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[2].uuid)){
            this.pager.setFilterValue('spaceRegionalUuid',this.spaceOrder.spaceRegional.uuid);
          }else{
            this.spaces.forEach(space=>{
              if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
                that.pager.setFilterValue("spaceRegionalUuid",space.uuid)
              }
            });
          }
        }
      },
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        let that = this;
        // this.pager.setFilter("status", SpaceRoom.prototype.Status.FREE);

        this.spaceUpdate();

        this.pager.httpFastPage(function () {
        });
      },
      indexOfArray(spaceSeat){
        for (let i = 0; i < this.spaceSeats.length; i++) {
          let activeSpaceSeat = this.spaceSeats[i];
          if (spaceSeat.uuid === activeSpaceSeat.uuid) {
            return i;
          }
        }
        return -1;
      },
      isActive(spaceSeat){
        return this.indexOfArray(spaceSeat) !== -1;
      },
      clickItem(spaceSeat){
        let index = this.indexOfArray(spaceSeat);
        if (index === -1) {
          this.spaceSeats.push(spaceSeat);
        } else {
          this.spaceSeats.splice(index, 1);
        }
      }
    },
    components: {
      NbPager,
      NbFilter,
      SpaceSeatCell,
      NbMultiFilter,
      NbSelectionFilter
    },
    mounted(){
      this.inputsList = [];
      this.inputsList.push("FREE");
      this.inputsList.push("PRE_ALLOCATION");
      this.inputsList.push("OCCUPIED");
      this.pager.setFilterValue("orderCreateTime", "DESC");
      this.pager.setFilterValue("statuses", this.inputsList);
      this.spaceUpdate();
      this.refresh();
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .space-room-multi-selection {
    .input-sm{
      width: 180px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 19px;
      border: solid 1px #e9e9e9;
    }
  }
</style>

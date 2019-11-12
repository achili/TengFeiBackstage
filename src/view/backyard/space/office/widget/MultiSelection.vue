<template>
  <div class=" space-room-multi-selection">
    <div class="row">
      <div class="col-md-12 mt10">
        <!--<NbFilter :pager="pager" :callback="search"></NbFilter>-->
        <span class="pull-left" >
            <NbMultiFilter :filter="pager.getFilter('status')" :filters="pager.FILTERS" :callback="refresh"/>
      </span>
      <span class="pull-right mr20">
            <input type="text" class="form-control input-sm" name="search" placeholder="搜索"
                   v-model="pager.getFilter('keyword').value" @keyup.enter="search"  @blur="search" >
      </span>
       <span class="pull-right mr20">
           <NbSelectionFilter  :filter="pager.getFilter('spaceRegionalUuid')" :callback="search"/>
       </span>
      </div>
    </div>

    <div class="row">

    <div class="col-md-12">
      <div v-for="spaceOffice in pager.data" :key="spaceOffice.key" style="height: 105px;max-height: 105px;margin: 10px 0;"
           class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div class="p10 mt10 cursor border br4"
             :class="{'bg-white':!isActive(spaceOffice),'bg-azure':isActive(spaceOffice)}"
             @click.stop.prevent="clickItem(spaceOffice)">
          <div class="media">

            <div class="pull-right" v-if="isActive(spaceOffice)">
              <i class="fa fa-check-circle text-success f30 mt15 olive"></i>
            </div>

            <div class="media-body">
              <SpaceOfficeCell :spaceOffice="spaceOffice"/>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-xs-12 mt20">
      <NbPager :pager="pager" :callback="refresh"></NbPager>
    </div>

    </div>
  </div>
</template>
<script>
  import NbPager from "../../../../../components/NbPager";
  import NbFilter from "../../../../../components/filter/NbFilter";
  import SpaceOfficeCell from "./SpaceOfficeCell";
  import Pager from "../../../../../common/model/_base/Pager";
  import SpaceOffice from "../../../../../common/model/space/SpaceOffice";
  import NbMultiFilter from "../../../../../components/filter/NbMultiFilter";
  import NbSelectionFilter from "../../../../../components/filter/NbSelectionFilter";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../../common/model/core/feature/FeatureType";
  import SpaceOrder from "../../../../../common/model/spaceOrder/SpaceOrder";

  export default{
    data(){
      return {
        pager: new Pager(SpaceOffice, 21),
        FeatureType,
        user: this.$store.state.user,
        spaces: this.$store.state.spaces
      }
    },
    props: {
      spaceOffices: {
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
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        let that = this;

        this.pager.httpFastPage(function () {
        });
      },
      indexOfArray(spaceOffice){
        for (let i = 0; i < this.spaceOffices.length; i++) {
          let activeSpaceOffice = this.spaceOffices[i];
          if (spaceOffice.uuid === activeSpaceOffice.uuid) {
            return i;
          }
        }
        return -1;
      },
      isActive(spaceOffice){
        return this.indexOfArray(spaceOffice) !== -1;
      },
      clickItem(spaceOffice){

        let index = this.indexOfArray(spaceOffice);
        if (index === -1) {
          this.spaceOffices.push(spaceOffice);
        } else {
          this.spaceOffices.splice(index, 1);
        }
      }
    },
    components: {
      NbPager,
      NbFilter,
      SpaceOfficeCell,
      NbMultiFilter,
      NbSelectionFilter
    },
    mounted(){
      let that = this;
      this.inputsList = [];
      this.inputsList.push("FREE");
      this.inputsList.push("PRE_ALLOCATION");
      this.inputsList.push("OCCUPIED");
      this.pager.setFilterValue("orderCreateTime", "DESC");
      this.pager.setFilterValue("statuses", this.inputsList);

      if(this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[0].uuid) && this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[1].uuid) && this.user.hasPermissionSpace(FeatureType.ADMIN,this.spaces[2].uuid)){
          this.pager.setFilterValue('spaceRegionalUuid',this.spaceOrder.spaceRegional.uuid);
      }else{
        this.spaces.forEach(space=>{
          if(that.user.hasPermissionSpace(FeatureType.ADMIN,space.uuid)){
            that.pager.setFilterValue("spaceRegionalUuid",space.uuid)
          }
        });
      }
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

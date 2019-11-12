<template>
  <div class="space-room-list-cell">

    <div class="cell-title">
      <span>{{spaceOffice.name}} </span>
      <span :style="'color:'+spaceOffice.getTypeStyle()">{{spaceOffice.getTypeName()}}</span>
      <span :style="'color:'+spaceOffice.getStatusStyle()">{{spaceOffice.getStatusName()}}</span>
      <span >{{spaceOffice.spaceRegional.name}}</span>
    </div>
    <div class="cell-description">
      {{spaceOffice.description}}
    </div>
    <div class="mt10 one-line">
      <span class="mr10">地址:{{spaceOffice.address}}</span>

    </div>
    <div class="cell-content one-line">
      <span class="mr10">
              工位数量: {{spaceOffice.seatNum}}</span>
      <span class="mr10">面积:{{spaceOffice.area}}</span>
      <span class="mr10">
              所属大楼: {{spaceOffice.spaceBuilding.name}} </span>
    </div>

  </div>
</template>

<script>

  import SpaceOffice from "../../../../../common/model/space/SpaceOffice";

  export default {
    data () {
      return {}
    },
    components: {},
    props: {
      spaceOffice: {
        type: SpaceOffice,
        required: true
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .space-room-list-cell {
    .one-line {
      max-height: 34px;
      overflow: hidden;
    }
  }


</style>



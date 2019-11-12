<template>
  <div class="space-seat-list-cell">

    <div class="cell-title">
      <span>{{spaceSeat.name}} </span>
      <span :style="'color:'+spaceSeat.getTypeStyle()">{{spaceSeat.getTypeName()}}</span>
      <span :style="'color:'+spaceSeat.getStatusStyle()">{{spaceSeat.getStatusName()}}</span>
      <span >{{spaceSeat.spaceRegional.name}}</span>
    </div>
    <div class="mt10 cell-content one-line">
      <span>价格：{{spaceSeat.day}}元/天</span>
      <span>{{spaceSeat.month}}元/月</span>
      <span class="mr10">
              所属空间：{{spaceSeat.spaceOffice.name}}</span>
    </div>
    <div class="mt10 one-line">
      <span>
        属性：
        <span v-for="(a,index) in AttributeMap" :key="index">
           <span v-for="(c,index) in spaceSeat.attribute" :key="index">
              <span class="mr10" v-if="c === a.val">{{a.name}}</span>
           </span>
        </span>
      </span>
      <span>地址：{{spaceSeat.address}}</span>
    </div>


  </div>
</template>

<script>
  import SpaceSeat from "../../../../../common/model/space/SpaceSeat";

  export default {
    data () {
      return {
        AttributeMap:SpaceSeat.prototype.AttributeMap
      }
    },
    components: {},
    props: {
      spaceSeat: {
        type: SpaceSeat,
        required: true
      }
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  .space-seat-list-cell {
    .one-line {
      max-height: 34px;
      overflow: hidden;
    }
  }


</style>



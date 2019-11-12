<template>
  <div class="map-demo">
    <div class="alert alert-info">
      <h3>地图</h3>
      <p>文档：<a href="https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install">https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install</a></p>
      <p>vue-amap文档：<a href="https://www.npmjs.com/package/vue-amap">https://www.npmjs.com/package/vue-amap</a></p>
      <p>高德地图api文档：<a href="http://lbs.amap.com/api/javascript-api/guide/map-data/introduction">http://lbs.amap.com/api/javascript-api/guide/map-data/introduction</a></p>
    </div>

    <div>
      <NbMap height="700" width="700" :position="position"></NbMap>
    </div>
    <div>
      {{position.lng}},{{position.lat}},{{position.address}}
    </div>

  </div>
</template>

<script>
  import NbMap from "../../../components/map/NbMap";

  export default {
    data(){
      return{
        position: {
          lng: 121.672994,
          lat: 31.225835,
          address: "带填写！"
        }
      }
    },
    components:{
      NbMap
    },
    computed:{},
    methods:{

    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .map-demo {

  }
</style>

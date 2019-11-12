<template>
  <div class="nb-map" :style="'height:'+height+'px;width:'+width+'px'">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" ></el-amap-search-box>
    <el-amap class="el-map-box" vid="el-map" :style="'height:'+boxHeight+'px;width:'+boxWidth+'px'" :events="events" :center="mapCenter" >
      <el-amap-marker :bubble="false" v-for="marker in markers" :position="marker" :key="marker.index" :events="markerEvents" ></el-amap-marker>
      <el-amap-marker :zIndex="101" :icon="require('../../assets/img/mark_bs.png')" v-if="marker" :position="marker" ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>

  export default {
    data(){
      let self = this;
      return{
        address: "",
        lng: 1,
        lat: 1,
        markers: [],
        mapCenter: [121.491719, 31.197646],
        marker: null,
        searchOption: {
          city: '上海',
          citylimit: false
        },
        events: {
          'click': (e) => {
            let { lng, lat } = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            self.fixPlace();
          }
        },
        markerEvents: {
          'click': (e) => {
            self.lng = e.target.Uh.position.lng;
            self.lat = e.target.Uh.position.lat;
            self.fixPlace();
          }
        }
      }
    },
    props:{
      height: {
        required: false,
        "default": 300
      },
      width: {
        required: false,
        "default": 900
      },
      //位置信息
      position: {
        required: false
      }
    },
    components:{

    },
    computed:{
      boxHeight() {
        return ((Number)(this.height)) + 300;
      },
      boxWidth() {
        return ((Number)(this.width)) + 300;
      }
    },
    methods: {
      fixPlace() {
        let self = this;
        // 这里通过高德 SDK 解析经纬度完成。
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress([self.lng ,self.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.address = result.regeocode.formattedAddress;
              self.position.address = self.address;
            }
          }
        });
        self.marker = [self.lng, self.lat];
        this.position.lng = self.lng;
        this.position.lat = self.lat;
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        //console.log(pois[0]);
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            //this.markers.push([poi.lng, poi.lat]);
            this.markers.push([lngSum, latSum]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.mapCenter = [center.lng, center.lat];
        }
      }
    },
    mounted() {
      if(this.position) {
        if(this.position.lng && this.position.lat) {
          this.lng = this.position.lng;
          this.lat = this.position.lat;
          this.marker = [this.lng, this.lat];
          this.mapCenter = [this.position.lng, this.position.lat];
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    .nb-map {
      position: relative;
      overflow: hidden;
      max-width: 100%;
      .el-map-box {
        position: absolute;
        top: -150px;
        left: -150px;
        max-width: calc(100% + 300px);
      }
      #el-map {
        height: 100%;
        width: 100%;
        cursor: pointer!important;
      }
      .search-box {
        position: absolute;
        top: 25px;
        left: 20px;
        height: 25px;
        width: 300px;
        .search-tips {
          li {
            height: 25px;
            line-height: 25px;
          }
        }
      }
    }
</style>

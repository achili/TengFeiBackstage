<template>
  <div class="events-detail animated fadeIn">
    <div class="body col-md-12">

      <div class="row title" >
        <span >{{communityEvents.title}}</span>
      </div>
      <div class="row " >
        <span style="color:#20bc97;padding-left: 20px;">{{communityEvents.startTime | date("MM月dd日")}}，{{communityEvents.startTime | date("hh")}}AM - {{communityEvents.endTime | date("hh")}}PM </span>
      </div>
      <div class="row mt25">
        <img style="width: 100%;height: 281px;" v-if="communityEvents.poster && communityEvents.poster.url" :src="communityEvents.poster.url">
      </div>
      <div class="row mt25">
        <span style="font-size: 20px;color: #000000;padding: 25px 0 0 20px;">时间</span>
      </div>
      <div class="row mt25">
        <span style="font-size: 16px;color: #666666;padding-left: 20px;">{{communityEvents.startTime | newsTime}}</span>
      </div>
      <div class="row">
        <span style="font-size: 16px;color: #666666;padding: 25px 0 0 20px;">{{communityEvents.startTime | date("hh")}}AM - {{communityEvents.endTime | date("hh")}}PM</span>
      </div>
      <div class="row mt25" style="padding-left: 20px;padding-right: 20px;">
        <div style="border-bottom: #d7dcdd solid 1px;width: 100%;"></div>
      </div>
      <div class="row mt25">
        <span style="font-size: 20px;color: #000000;padding: 25px 0 0 20px;">地址</span>
      </div>
      <div class="row mt25" style="padding-left: 20px;padding-right: 20px;">
        <span style="font-size: 16px;color: #666666;">{{communityEvents.address.address }}</span>
      </div>
      <div class="row mt25" style="padding-left: 20px;padding-right: 20px;">
        <div style="border-bottom: #d7dcdd solid 1px;width: 100%;"></div>
      </div>
      <div class="row mt25" style="padding-left: 20px;padding-right: 20px;">
        <span style="font-size: 16px;color: #666666;">{{communityEvents.description}}</span>
      </div>
      <div class="row mt50" style="padding-left: 20px;padding-right: 20px;">
        <div class="img" :style="'background: url(\''+ communityEvents.getStaticImage()+'\') center'"></div>
      </div>
      <div class="row mt40">
        <button class="btn btn-sm btn-file" style="width: 100%;height: 65px;color: white;background: #23B7E5;font-size: 16px;" @click="addUsers(communityEvents)">报名</button>
      </div>
    </div>
  </div>
</template>
<script>
  import CommunityEvents from "../../common/model/community/CommunityEvents";
  import BottomNavigation from "../_layout/BottomNavigation";

  export default {
    data () {
      return {
        communityEvents: new CommunityEvents()
      }
    },
    components: {
      BottomNavigation

    },
    props:{

    },
    computed:{

    },
    watch:{

    },
    methods: {
      addUsers(communityEvents){
        window.location = "https://itunes.apple.com/cn/app/id477927812";
      }
    },
    mounted(){
      let that = this;
      this.communityEvents.uuid = this.$route.query.uuid;
      if (this.communityEvents.uuid) {
        this.communityEvents.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .events-detail {
    .body{
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      .title{
        padding: 20px 0 0 20px;
        font-size: 22px;
        font-weight: bolder;
      }
      .img{
        border-radius: 2%;
        height: 300px;
        background-size: cover!important;
      }
    }
  }
</style>

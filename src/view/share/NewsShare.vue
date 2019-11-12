<template>
  <div class="news-detail animated fadeIn">
   <div class="body col-md-12">
      <div class="row" style="font-size: 20px;font-weight: bold;padding: 20px 20px 0 20px;">
        <span>{{communityNews.title}}</span>
      </div>
      <div class="row" style="padding-left: 20px;right: 20px;">
        <span style="color:#20bc97">{{communityNews.createTime | date("MM月dd日")}}</span>
      </div>
      <div class="row mt25">
        <img style="width: 100%;height: 195px;" :src="communityNews.posterUrl">
      </div>
      <div class="row mt25">
        <div v-html="communityNews.content"></div>
      </div>
   </div>
  </div>
</template>
<script>
  import CommunityNews from "../../common/model/community/CommunityNews";

  export default {
    data () {
      return {
        communityNews: new CommunityNews()
      }
    },
    components: {},
    methods: {},
    mounted(){
      let that = this;
      this.communityNews.uuid = this.$route.query.uuid;
      if (this.communityNews.uuid) {
        this.communityNews.httpDetail();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .news-detail {
    .body{
      height: 100%;
      width: 100%;
      overflow-y: scroll;
    }
  }
</style>

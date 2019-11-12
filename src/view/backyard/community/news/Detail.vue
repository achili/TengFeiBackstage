<template>
  <div class="by-article-detail animated fadeIn">

    <div class="row">
      <div class="col-md-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img  width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left">
          <span class="ml15 cell-max-title" >新鲜事详情</span>
        </div>
      </div>
    </div>

    <div class="row pt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <div class="col-md-12">
                <span class="f18 cell-title-color">{{communityNews.title}}</span>
              </div>
            </div>
            <div class="row mt5">
              <div class="col-md-12">
                <span class="f14 cell-title-color">所属空间：{{communityNews.spaceRegional.name}}</span>
              </div>
            </div>
            <!--<div class="row mt5" style="font-size: 14px;color: #555555;" >-->
              <!--<div class="col-md-12">-->
                <!--&lt;!&ndash;描述：<span>{{communityNews.description}}</span>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
            <div class="row mt20">
              <div class="col-md-12">
                <img class="img-rounded" width="122" height="122" v-if="communityNews.poster && communityNews.poster.url" :src="communityNews.poster.url">
              </div>
            </div>
            <div class="row mt20">
              <div class="col-md-12">
                <span class="f14 cell-time">{{communityNews.createTime | simpleDate }}</span>
              </div>
            </div>
            <div class="row"  >
              <div class="pull-right pr35 pb10">
                <button title="编辑" class="btn btn-success" style="width: 122px;height: 46px;background-color: #00b5e2;border: solid 1px #e2e2e2;"
                        @click.stop.prevent="$router.push({path:'/by/community/news/edit',query:{uuid:communityNews.uuid}})">
                  编辑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="mail-box"  style="border: 0;">
          <div class="mail-body" style="border: 0;">
            <div v-html="communityNews.content"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {Notification} from 'element-ui';
  import CommunityNews from "../../../../common/model/community/CommunityNews";

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
  .by-article-detail {
   padding: 20px 100px 0 30px;
  }
</style>

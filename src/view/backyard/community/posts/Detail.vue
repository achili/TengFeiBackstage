<template>
  <div class="by-posts-detail animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
            <span><img  width="30" height="30" src="../../../../assets/img/return.png"/></span>
          </div>
          <div class="pull-left">
            <span class="ml15 cell-max-title">朋友圈详情</span>
          </div>
        </div>

        <div class="row mt35" >
          <div class="mail-box" style="padding-left: 21px;border: 0;">
            <div class="mail-body ml15" style="border: 0;">
              <div class="row">
                <span class="f18 cell-title-color">{{communityPosts.creator.name}}</span>
              </div>
              <div class="row mt15 f14 cell-title-color">
                {{communityPosts.content}}
              </div>
              <div class="row mt20">
                <div class="image">
                  <span class="mr18" v-for="url in communityPosts.posters" :key="url.uuid">
                      <img class="posters-image" :src="url.getUrlBySize(122,122)"/>
                  </span>
                </div>
              </div>
              <div class="row mt20">
                <span class="mr20">{{communityPosts.createTime | simpleDate}}</span>
                <span class="pl27">
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <span class="ml2">{{communityPosts.likes}}</span>
                </span>
              </div>
              <!--<div class="row" style="text-align: right;padding: 35px 35px 10px 0;">-->
                <!--<button title="编辑" class="btn btn-success"-->
                        <!--@click.stop.prevent="$router.push({path:'/by/community/posts/edit',query:{uuid:communityPosts.uuid}})">-->
                  <!--&lt;!&ndash;<i class="fa fa-pencil"></i>&ndash;&gt;-->
                  <!--编辑-->
                <!--</button>-->
              <!--</div>-->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="mail-box pl21" style="border: 0;">
            <div class="mail-body ml20" style="border: 0;">
              <div class="row">
                <div class="col-md-12 pr35">
                  <input type="text" class="input-release" placeholder="我来说一句" v-model="reviewContent"/>
                </div>
              </div>
              <div class="row  pt17 pr35 pb10" >
                <button style="width: 88px;height: 40px;" class="btn btn-theme pull-right" @click="save(communityPosts)">发布</button>
              </div>
              <div class="row">
                <div class="comment-item mt18 ml20" v-for="comment in communityPosts.commentaries" :key="comment.uuid">
                  <span>
                     <span class="content">
                        <img style="width: 40px;height: 40px;" :src="comment.creator.avatarUrl"/>
                        <span class="name f14 cell-title-color">{{comment.creator.name}}:</span>
                    </span>
                    <span class="content f14">{{comment.content}}</span>
                  </span>
                  <span class="pull-right pr35" >
                    <span class="f14 cell-time" >{{comment.createTime | simpleDateMinute}}</span>
                    <a title="删除" href="javascript:void(0)" @click.stop.prevent="comment.confirmDel(search)">
                       <img class="logo" style="width: 20px;height: 24px;" src="../../../../assets/img/del.png"/>
                    </a>
                  </span>
                </div>

                <div class="col-md-12 mt20">
                  <NbPager :pager="commentaryPager" :callback="search"></NbPager>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {Notification,MessageBox} from 'element-ui';
  import CommunityPosts from "../../../../common/model/community/CommunityPosts";
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbPager from "../../../../components/NbPager";
  import Pager from "../../../../common/model/_base/Pager";
  import Commentary from "../../../../common/model/community/commentary/Commentary";


  export default {
    data () {
      return {
        communityPosts: new CommunityPosts(),
        reviewContent:null,
        commentaryPager: new Pager(Commentary),
        user: this.$store.state.user

      }
    },
    components: {
      NbSlidePanel,
      NbPager
    },
    methods: {
      save(communityPosts){
        let that = this;
        communityPosts.httpComment(this.reviewContent,function (response) {
          Notification.success({
            message: '评论成功！'
          });
          that.search();
        });
        this.reviewContent = null;
      },
      refresh(){
        let that = this;
        this.communityPosts.uuid = this.$route.query.uuid;
        if (this.communityPosts.uuid) {
          this.communityPosts.httpDetail();
        }
      },
      search(){
        let that = this;
        this.commentaryPager.setFilterValue("orderCreateTime", "DESC");
        this.commentaryPager.setFilterValue("communityPosts", this.communityPosts.uuid);

        this.commentaryPager.httpFastPage(function () {
          that.communityPosts.commentaries = that.commentaryPager.getList();
        });
      }
    },
    mounted(){
      let that = this;
      this.communityPosts.uuid = this.$route.query.uuid;
      if (this.communityPosts.uuid) {
        this.communityPosts.httpDetail(function () {

          that.commentaryPager.setFilterValue("orderCreateTime", "DESC");
          that.commentaryPager.setFilterValue("communityPosts", that.communityPosts.uuid);

          that.commentaryPager.httpFastPage(function () {
            that.communityPosts.commentaries = that.commentaryPager.getList();
          });
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-posts-detail {
    padding: 20px 130px 40px 40px;
    .input-release{
      background-color: #FFFFFF;
      border-radius: 1px;
      color: #9c9c9c;
      display: block;
      padding: 6px 12px;
      //transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
      width: 100%;
      font-size: 14px;
      resize: none;
      border: 0;
      outline: none;
      border-bottom: 1px solid #b6b6b6;
    }
    .content{
    color: #555555
    }
  }
</style>

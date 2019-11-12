<template>
  <div class="animated fadeIn posts-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!communityPosts.editMode">发布朋友圈</span>
          <span v-show="communityPosts.editMode">编辑</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line"> </div>
      </div>
    </div>

    <div class="row mt35 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">基本内容 </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <NbForm :httpForm="httpCreate" :successCallback="successCallback" ></NbForm>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import NbTanks from "../../../../components/NbTanks";
  import {Notification} from 'element-ui'
  import CommunityPosts from "../../../../common/model/community/CommunityPosts";


  export default {
    data () {
      return {
        communityPosts: new CommunityPosts(),
        httpCreate: new CommunityPosts().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      NbTanks
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/community/posts/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.communityPosts.uuid = this.$route.query.uuid;
      if (this.communityPosts.uuid) {
        this.httpCreate.editMode = true;
        this.communityPosts.httpDetail(function (){
          that.httpCreate.backFill({communityPosts: that.communityPosts});
        });
      }
      this.httpCreate.backFill({communityPosts: this.communityPosts});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .posts-create {
    padding: 20px 100px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }

  }
</style>

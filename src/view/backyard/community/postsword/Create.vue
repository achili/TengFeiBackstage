<template>
  <div class="animated fadeIn posts-word-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr10" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!communityPostsWord.editMode">创建屏蔽词</span>
          <span v-show="communityPostsWord.editMode">编辑屏蔽词</span>
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
  import CommunityPostsWord from "../../../../common/model/community/CommunityPostsWord";


  export default {
    data () {
      return {
        communityPostsWord: new CommunityPostsWord(),
        httpCreate: new CommunityPostsWord().getHttpCreate()
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
        that.$router.push("/by/community/posts/word/list");

      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.communityPostsWord.uuid = this.$route.query.uuid;
      if (this.communityPostsWord.uuid) {
        this.httpCreate.editMode = true;
        this.communityPostsWord.httpDetail(function (){
          that.httpCreate.backFill({communityPostsWord: that.communityPostsWord});
        });
      }
      this.httpCreate.backFill({communityPostsWord: this.communityPostsWord});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .posts-word-create {
    padding: 20px 120px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }

  }
</style>

<template>
  <div class="animated fadeIn news-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class=" mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left cell-max-title">
          <span v-show="!communityNews.editMode">发布新鲜事</span>
          <span v-show="communityNews.editMode">编辑新鲜事</span>
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
  import CommunityNews from "../../../../common/model/community/CommunityNews";


  export default {
    data () {
      return {
        communityNews: new CommunityNews(),
        httpCreate: new CommunityNews().getHttpCreate()
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
        that.$router.push("/by/community/news/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });
      }
    },
    mounted(){
      let that = this;
      this.communityNews.uuid = this.$route.query.uuid;
      if (this.communityNews.uuid) {
        this.httpCreate.editMode = true;
        this.communityNews.httpDetail(function (){
          that.httpCreate.backFill({communityNews: that.communityNews});
        });
      }
      this.httpCreate.backFill({communityNews: this.communityNews});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .news-create {
    padding: 20px 120px 0 30px;
  }
</style>

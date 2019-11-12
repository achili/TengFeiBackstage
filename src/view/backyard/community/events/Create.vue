<template>
  <div class="animated fadeIn events-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!communityEvents.editMode">发布一起玩</span>
          <span v-show="communityEvents.editMode">编辑一起玩</span>
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
  import CommunityEvents from "../../../../common/model/community/CommunityEvents";


  export default {
    data () {
      return {
        communityEvents: new CommunityEvents(),
        httpCreate: new CommunityEvents().getHttpCreate()
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
        that.$router.push("/by/community/events/list");

      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.communityEvents.uuid = this.$route.query.uuid;
      if (this.communityEvents.uuid) {
        this.httpCreate.editMode = true;
        this.communityEvents.httpDetail(function (){
          that.httpCreate.backFill({communityEvents: that.communityEvents});
        });
      }
      this.httpCreate.backFill({communityEvents: this.communityEvents});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .events-create {
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

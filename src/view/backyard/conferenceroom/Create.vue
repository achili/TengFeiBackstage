<template>
  <div class="animated fadeIn conference-room-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class="mr15" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!conferenceRoom.editMode">创建会议室</span>
          <span v-show="conferenceRoom.editMode">编辑会议室</span>
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
            <NbForm :httpForm="httpCreate" :successCallback="successCallback" :saveClass="conference" ></NbForm>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbForm from "../../../components/NbForm";
  import ConferenceRoom from "../../../common/model/conferenceroom/ConferenceRoom";
  import {Notification} from 'element-ui'


  export default {
    data () {
      return {
        conferenceRoom: new ConferenceRoom(),
        httpCreate: new ConferenceRoom().getHttpCreate(),
        conference: "pull-right "
      }
    },
    components: {
      NbSlidePanel,
      NbForm
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/ConferenceRoom/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      }
    },
    mounted(){
      let that = this;
      this.conferenceRoom.uuid = this.$route.query.uuid;
      if(this.$route.query.uuid) {
        this.httpCreate.editMode = true;
        this.httpCreate.getFormItem('spaceRegional').rule.disabled = true;
        this.conferenceRoom.httpDetail(function () {
          that.httpCreate.backFill({conferenceRoom: that.conferenceRoom});
        });
      }
      this.httpCreate.backFill({conferenceRoom: this.conferenceRoom});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .conference-room-create {
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

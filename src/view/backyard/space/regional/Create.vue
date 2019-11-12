<template>
  <div class="animated fadeIn space_regional-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr10" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!spaceRegional.editMode">创建空间区域</span>
          <span v-show="spaceRegional.editMode">编辑空间区域</span>
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
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";


  export default {
    data () {
      return {
        spaceRegional: new SpaceRegional(),
        httpCreate: new SpaceRegional().getHttpCreate()
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
        that.$router.push("/by/space/regional/list");

      }
    },
    mounted(){
      let that = this;
      this.spaceRegional.uuid = this.$route.query.uuid;
      if (this.spaceRegional.uuid) {
        this.httpCreate.editMode = true;
        this.spaceRegional.httpDetail(function (){
          that.httpCreate.backFill({spaceRegional: that.spaceRegional});
        });
      }
      this.httpCreate.backFill({spaceRegional: this.spaceRegional});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .space_regional-create {
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

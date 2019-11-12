<template>
  <div class="animated fadeIn office-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left f26 title">
          <span v-show="!spaceOffice.editMode">创建办公室</span>
          <span v-show="spaceOffice.editMode">编辑办公室</span>
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
  import {Notification} from 'element-ui'
  import SpaceOffice from "../../../../common/model/space/SpaceOffice";
  import SpaceBuildingSelection from "../../../../components/selection/SpaceBuildingSelection"
  import NbCheckbox from "../../../../components/NbCheckbox";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import NbDateRange from "../../../../components/NbDateRange";

  export default {
    data () {
      return {
        spaceOffice: new SpaceOffice(),
        httpCreate: new SpaceOffice().getHttpCreate()
      }
    },
    components: {
      SpaceBuildingSelection,
      NbSlidePanel,
      NbForm,
      NbCheckbox,
      NbLoadingButton,
      NbDateRange

    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        this.$router.push("/by/space/office/detail?uuid=" + res.data.data.uuid);
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });
      },
      refresh(){
        let that = this;
        this.spaceOffice.uuid = this.$route.query.uuid;
        if (this.spaceOffice.uuid) {
          this.httpCreate.editMode = true;
          this.httpCreate.spaceBuilding = true;
          this.spaceOffice.httpDetail(function (){
            that.httpCreate.backFill({spaceOffice: that.spaceOffice});
          });
        }
      }
    },
    mounted(){
      let that = this;
      this.refresh();
      this.httpCreate.backFill({spaceOffice: this.spaceOffice});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .office-create {
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

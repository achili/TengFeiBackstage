<template>
  <div class="animated fadeIn seat-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class="logo mr10" width="30" height="30" src="../../../../assets/img/return.png"/></span>
         </div>
        <div class="pull-left title">
          <span v-show="!spaceSeat.editMode">创建办公桌</span>
          <span v-show="spaceSeat.editMode">编辑办公桌</span>
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

    <div class="row mt25">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <!--<div class="row">-->
            <!--&lt;!&ndash;<div class="col-md-12">&ndash;&gt;-->
            <!--&lt;!&ndash;<NbForm :httpForm="httpCreate" :successCallback="successCallback" :errorCallback="errorCallback"></NbForm>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->

            <div class="row">
              <label class="col-md-2 control-label mt5 compulsory">所属房间;</label>
              <div class="col-md-10">
                <SpaceOfficeSelection :activeSpaceOffice="spaceSeat.spaceOffice" :initFilter="{orderCreateTime:'DESC'}"></SpaceOfficeSelection>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-2 control-label mt5 compulsory">工位名称/编号：</label>
              <div class="col-md-10 pr35">
                <input type="text" class="form-control" v-model="spaceSeat.name">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">地址：</label>
              <div class="col-md-10 pr35">
                <input type="text" class="form-control" v-model="spaceSeat.address">
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-2 control-label mt5 compulsory">价格：</label>
              <div class="col-md-10">
                <div class="col-md-2" style="margin-left: -15px;"><input type="text" class="form-control" v-model="spaceSeat.day"></div>
                <div class="col-md-1" style="margin-left: -15px;line-height: 34px;text-align: left">天/元</div>
                <div class="col-md-2"><input type="text" class="form-control" v-model="spaceSeat.month"></div>
                <div class="col-md-1" style="margin-left: -15px;line-height: 34px;text-align: left">月/元</div>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-2 control-label mt5 compulsory">属性：</label>
              <div class="col-md-10" >
            <span class="mr30" v-for="(item,index) in AttributeMap" :key="index">
              <NbCheckbox  v-model="spaceSeat.attribute" :val="item.val" />
              <span class="f16 "> {{item.name}} </span>
            </span>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-12">
                <div class="mr20">
                  <NbLoadingButton :entity="spaceSeat" :callback="save"/>
                </div>
              </div>
            </div>

            <div class="alert alert-danger mt20" v-show="spaceSeat.errorMessage">
              {{spaceSeat.errorMessage}}
            </div>

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
  import SpaceSeat from "../../../../common/model/space/SpaceSeat";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import NbCheckbox from "../../../../components/NbCheckbox";
  import SpaceOfficeSelection from "../office/Selection";


  export default {
    data () {
      return {
        AttributeMap: SpaceSeat.prototype.AttributeMap,
        spaceSeat: new SpaceSeat()
        //httpCreate: new SpaceSeat().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      NbLoadingButton,
      NbCheckbox,
      SpaceOfficeSelection
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/space/building/list");
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });
      },
      save(){
        let that = this;
        this.spaceSeat.httpSave(function (response) {
          Notification.success({
            message: that.spaceSeat.editMode ? '修改成功！' : '创建成功！'
          });
          that.$router.push("/by/space/seat/detail?uuid=" + that.spaceSeat.uuid);
          //that.$router.push("/by/space/seat/list");
        });
      }
    },
    mounted(){
      let that = this;
      this.spaceSeat.uuid = this.$route.query.uuid;
      if (this.spaceSeat.uuid) {
        //this.httpCreate.editMode = true;
        this.spaceSeat.editMode = true;
        this.spaceSeat.httpDetail(function (){
          //that.httpCreate.backFill({spaceSeat: that.spaceSeat});
        });
      }
      //this.httpCreate.backFill({spaceSeat: this.spaceSeat});
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .seat-create {
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

<template>
  <div class="animated fadeIn setting-detail">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
          <span><img class=" mr15" width="30" height="30" src="../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!appSettings.editMode">创建系统设置</span>
          <span v-show="appSettings.editMode">编辑系统设置</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div style="border-bottom: 1px #e2e2e2 solid;"> </div>
      </div>
    </div>

    <div class="row mt40 ml40">
      <div class="col-md-12">
        <div style="font-size: 18px;color: #888888;">合同字段设置 </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12" style="margin-top: -30px;">
        <NbLoadingButton :entity="appSettings" :callback="save"/>
      </div>
    </div>

    <div class="row mt10">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">

            <div class="row">
              <label class="col-md-3 control-label mt5 compulsory">所属空间：</label>
              <div class="col-md-9">
                <SpaceRegionalSelecton :spaceRegional="appSettings.spaceRegional" :editMode="appSettings.editMode" :disabled="true"></SpaceRegionalSelecton>
              </div>
            </div>

            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">甲方：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.contractParty">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">法人或授权人：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.legalPerson">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">法人或授权人电话：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.legalPhone">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开户银行：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.accountBank">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">银行户名：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.accountBankName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开户银行账户：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.openAccountBank">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开票信息-甲方纳税人识别号：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.partNumber">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开票信息-甲方地址：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.partAddress">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">开票信息-甲方电话：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.partPhone">
              </div>
            </div>

            <!--<div class="row mt10">-->
              <!--<label class="col-md-3 control-label mt5 compulsory">签约地点：</label>-->
              <!--<div class="col-md-9">-->
                <!--<input type="text" class="form-control" v-model="appSettings.signArea">-->
              <!--</div>-->
            <!--</div>-->

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">联系人：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.financeContact">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">联系电话：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.financeContactPhone">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">地址：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appSettings.financeArea">
              </div>
            </div>

            <div class="alert alert-danger mt20" v-show="appSettings.errorMessage">
              {{appSettings.errorMessage}}
            </div>

          </div>
        </div>

        <div class="row mt40 ml40">
          <div class="col-md-12">
            <div style="font-size: 18px;color: #888888;">APP前台空间价格设置 </div>
          </div>
        </div>

        <div class="row mt20">
          <div class="col-md-12">
            <div class="mail-box" style="border: 0;">
              <div class="mail-body ml15" style="border: 0;">
                <div class="row mt10" >
                  <label class="col-md-3 control-label mt5 compulsory">移动办公桌价格(单位: 元/月)：</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="appSettings.stationPrice">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">独立办公室价格(单位: 元/月)：</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="appSettings.spacePrice">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">快速入驻办公桌价格(单位: 元/天)：</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="appSettings.onePrice">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt40 ml40">
          <div class="col-md-12">
            <div style="font-size: 18px;color: #888888;">设置小桥联系人 </div>
          </div>
        </div>

        <div class="row mt20">
          <div class="col-md-12">
            <div class="mail-box" style="border: 0;">
              <div class="mail-body ml15" style="border: 0;">
                <div class="row mt10" >
                  <label class="col-md-3 control-label mt5 compulsory">小桥联系人：</label>
                  <div class="col-md-9">
                    <Selection class="mr5" :activeUser="user"/>
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">小桥联系人电话：</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="user.phone">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="row mt10">
      <div class="col-md-12">
        <NbLoadingButton :entity="appSettings" :callback="save"/>
      </div>
    </div>


    <div class="row mt40 ml40">
      <div class="col-md-12">
        <div style="font-size: 18px;color: #888888;">设置APP版本更新 </div>
      </div>
    </div>

    <div class="row mt20">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row mt10" >
              <label class="col-md-3 control-label mt5 compulsory">版本号：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appDownloadSetting.versionNumber"/>
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">内核版本号：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appDownloadSetting.kernelVersion">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">Android版本文件：</label>
              <div class="col-md-9">
                <NbTank :tank="appDownloadSetting.androidFile"/>
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-3 control-label mt5 compulsory">IOS版本URL：</label>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="appDownloadSetting.iosUrl">
              </div>
            </div>

          </div>


        </div>
        <div class="row mt10">
          <div class="col-md-12">
            <NbLoadingButton :entity="appDownloadSetting" saveText="保存" :callback="saveApp"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../components/NbSlidePanel";
  import NbForm from "../../../components/NbForm";
  import {Notification} from 'element-ui'
  import NbLoadingButton from "../../../components/NbLoadingButton";
  import AppSetting from "../../../common/model/spacesetting/SpaceSetting"
  import Selection from "../../../view/backyard/user/Selection";
  import SpaceRegionalSelecton from "../../../view/backyard/space/regional/Selection";
  import NbTank from "../../../components/NbTank";

  export default {
    data () {
      return {
        appSettings: new AppSetting(),
        appDownloadSetting: new AppSetting(),
        httpEdit: new AppSetting().getHttpEdit(),
        user: this.$store.state.user
      }
    },
    components: {
      NbSlidePanel,
      NbLoadingButton,
      NbForm,
      Selection,
      SpaceRegionalSelecton,
      NbTank
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        })
      },
      saveApp(){
        let that = this;
        let form = {
          androidFile: this.appDownloadSetting.androidFile.uuid,
          iosUrl: this.appDownloadSetting.iosUrl,
          versionNumber: this.appDownloadSetting.versionNumber,
          kernelVersion: this.appDownloadSetting.kernelVersion
        };
        if (this.appDownloadSetting.uuid === "dfde87bb-5b9b-4497-9c26-2c8165f830df") {
          form.uuid = this.appDownloadSetting.uuid;
        }
        this.appDownloadSetting.edgeMode = true;
        this.appDownloadSetting.httpSave( form, function (response) {
          Notification.success({
            message: '保存APP版本成功！'
          });
          that.$router.push("/by/spaceSetting/detail?uuid=" + that.appSettings.uuid);
        });
      },
      save(){
        let that = this;
        if (!this.appSettings.contractParty || !this.appSettings.legalPerson || !this.appSettings.legalPhone || !this.appSettings.accountBank ||
          !this.appSettings.accountBankName || !this.appSettings.openAccountBank || !this.appSettings.partNumber || !this.appSettings.partAddress ||
          !this.appSettings.partPhone || !this.appSettings.financeContact || !this.appSettings.financeContactPhone || !this.appSettings.financeArea) {
          Notification.error({
            message: "请填写完整合同字段!"
          });
          return false;
        }
        let form = {
          contractParty:this.appSettings.contractParty,
          legalPerson:this.appSettings.legalPerson,
          legalPhone:this.appSettings.legalPhone,
          accountBank:this.appSettings.accountBank,
          accountBankName:this.appSettings.accountBankName,
          openAccountBank:this.appSettings.openAccountBank,
          partNumber:this.appSettings.partNumber,
          partAddress:this.appSettings.partAddress,
          partPhone:this.appSettings.partPhone,
          signArea:this.appSettings.signArea,
          financeContact:this.appSettings.financeContact,
          financeContactPhone:this.appSettings.financeContactPhone,
          financeArea:this.appSettings.financeArea,
          stationPrice:this.appSettings.stationPrice,
          spacePrice:this.appSettings.spacePrice,
          onePrice:this.appSettings.onePrice,
          xiaoQiaoUser: this.user.uuid,
          xiaoQiaoPhone: this.user.phone,
          spaceRegional:this.appSettings.spaceRegional.uuid
        };
        if (this.appSettings.uuid) {
          form.uuid = this.appSettings.uuid;
        }
        this.appSettings.httpSave( form, function (response) {
          Notification.success({
            message: that.appSettings.editMode ? '修改成功！' : '创建成功！'
          });
          that.$router.push("/by/spaceSetting/detail?uuid=" + that.appSettings.uuid);
        });
      }
    },
    mounted(){
      let that = this;
      this.appSettings.uuid = this.$route.query.uuid;

      if(this.appSettings.uuid){
        this.appSettings.editMode = true;
        this.appSettings.httpDetail(function () {
            that.user = that.appSettings.xiaoQiaoUser;
            that.user.phone = that.appSettings.xiaoQiaoPhone;
            that.httpEdit.backFill({SpaceSetting: that.appSettings});
          }
        );
      }

      this.appDownloadSetting.uuid = "dfde87bb-5b9b-4497-9c26-2c8165f830df";
      this.appDownloadSetting.httpDetail();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .setting-detail {
    padding: 20px 30px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }

  }
</style>


<template>
  <div class="row control">
    <div class="col-md-12">

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <div class="col-md-2">
              <nobr><label class="form-label compulsory">通知名称</label></nobr>
            </div>
            <div class="col-md-10">
              <span v-if="typess === 'PAY_NOTIFY'">
                <input type="text" class="form-control" v-model="payment" />
              </span>
              <span v-else>
                <input type="text" class="form-control" v-model="press"/>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt10">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <NbSwitcher size="sm" v-model="notify.mailEnable"/>
              <label class="ml10">
                邮件通知
              </label>
            </div>
            <NbExpanding>
              <div class="panel-body" v-show="notify.mailEnable">
                <div class="row form-group">
                  <div class="col-md-2">
                    <nobr><label class="form-label compulsory">发件人</label></nobr>
                  </div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" readonly v-model="notify.mailFromAddress"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-2">
                    <nobr><label class="form-label compulsory">收件人</label></nobr>
                    <nobr>(可群发，用;分隔)</nobr>
                  </div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="notify.mailToAddress"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-2">
                    <nobr> <label class="form-label compulsory">主题</label></nobr>
                  </div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="notify.mailSubject"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-2">
                    <nobr><label class="form-label compulsory">内容</label></nobr>
                  </div>
                  <div class="col-md-10">
                    <NbEditor ref="insert" style="border: #dfdfdf;" v-model="notify.mailContent" :isAdvanced="true" height="600px"/>
                  </div>
                </div>
              </div>
            </NbExpanding>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <NbSwitcher size="sm" v-model="notify.messageEnable"/>
              <label class="ml10">
                APP信息通知
              </label>
            </div>
            <NbExpanding>
              <div class="panel-body" v-show="notify.messageEnable">
                <div class="row form-group">
                  <div class="col-md-2">
                    <label class="form-label compulsory">主题</label>
                  </div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="notify.messageSubject"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-2">
                    <label class="form-label compulsory">内容</label>
                  </div>
                  <div class="col-md-10">
                    <textarea style="width: 100%;border: 1px solid #dfdfdf;"  rows="3" readonly v-model="notify.messageContent"
                              placeholder="APP信息内容"></textarea>
                    <!--<NbEditor v-model="messageContent" :isAdvanced="true" height="600px"/>-->
                  </div>
                </div>
              </div>
            </NbExpanding>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <NbSwitcher size="sm" v-model="notify.smsEnable"/>
              <label class="ml10">
                短信通知
              </label>
            </div>
            <NbExpanding>
              <div class="panel-body" v-show="notify.smsEnable">
                <div class="row form-group">
                  <div class="col-md-2">
                    <label class="form-label compulsory">手机</label>
                  </div>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="notify.smsPhone"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-2">
                    <label class="form-label compulsory">内容</label>
                  </div>
                  <div class="col-md-10">
                     <textarea rows="3" style="width: 100%;border: 1px solid #dfdfdf;" readonly v-model="notify.smsContent"
                               placeholder="短信内容"></textarea>
                  </div>
                </div>
              </div>
            </NbExpanding>
          </div>

          <!--<div v-show="financeOfficePay.errorMessage" class="alert alert-danger">-->
          <!--{{financeOfficePay.errorMessage}}-->
          <!--</div>-->

          <!--<StatusReport :notify="notify" :showEmail="showEmail" :showMessage="showMessage" :showSMS="showSMS"/>-->

          <div class="text-right">
            <button style="width: 100px;height: 37px;" class="btn f16 mr20 mb10 btn-info"
                    @click.stop.prevent="send()" v-show="!notify.loading">
              发送通知
            </button>
            <button style="width: 100px;height: 37px;" class="btn f16 mr20 mb10 btn-info" disabled v-show="notify.loading">
              正在发送中...
            </button>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbSwitcher from "../../../../components/NbSwitcher.vue";
  import NbExpanding from "../../../../components/NbExpanding.vue";
  import NbEditor from "../../../../components/NbEditor.vue";
  import StatusReport from "./StatusReport";
  import {Notification as NotificationBox} from 'element-ui'
  import Notify from "../../../../common/model/finance/Notify";
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";

  export default {
    data () {
      return {
        showEmail: false,
        showMessage:false,
        showSMS:false,
        payment:"会议室付款通知",
        press:"会议室催款通知"

      }
    },
    props: {
      notify:{
        type: Notify,
        required: true
      },
      financeOfficePay:{
        type: FinanceOfficePay,
        required: true
      },
      typess:{
        type: String,
        required: false
      },
      // //发送之前的前置方法
      beforeSendCallback: {
        type: Function,
        required: false
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      }
    },
    computed: {},
    components: {
      NbSwitcher,
      NbEditor,
      NbSlidePanel,
      NbExpanding,
      StatusReport
    },
    watch:{

    },
    methods: {
      sendNotification(){
        let that = this;
        if (typeof this.beforeSendCallback === "function") {
          this.notify.loading = true;
          this.beforeSendCallback(function () {
            that.notify.loading = false;
            that.send();
          })
        } else {
          that.send();
        }
      },
      send(){
         let that = this;
        // this.notify.httpSend(this.notify,function () {
        //   NotificationBox.success({
        //     message: '发送通知成功！'
        //   });
        //   that.showSend = true;
        //   if (typeof that.successCallback === "function") {
        //     that.successCallback();
        //   }
        // }, that.errorCallback);

        // this.financeOfficePay.httpSendMessage(this.notify,function () {
        //     NotificationBox.success({
        //       message: '发送通知成功！'
        //     });
        //     that.showSend = true;
        //     if (typeof that.successCallback === "function") {
        //       that.successCallback();
        //     }
        //   }, that.errorCallback);
          this.financeOfficePay.httpSend(this.notify.name,this.notify.mailEnable,this.notify.mailFromAddress,
            this.notify.mailToAddress,this.notify.mailSubject,this.notify.mailContent,this.notify.messageEnable,
            this.notify.messageSubject,this.notify.messageContent,this.notify.smsEnable,this.notify.smsPhone,this.notify.smsContent,this.typess,function () {
              that.show(that.notify);
              // if (typeof that.successCallback === "function") {
              //   that.successCallback();
              // }
              NotificationBox.success({
                message: '发送通知成功！'
              });
            }, that.errorCallback);


      },
      show(notify){
        if(notify.mailEnable){
         this.showEmail = true;
        }
        if(notify.messageEnable){
          this.showMessage = true;
        }
        if(notify.smsEnable){
          this.showSMS = true;
        }
      }

    },
    mounted(){
      let that = this;
      this.$refs.insert.insert(this.notify.mailContent);
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .control{
    .panel{
      border: 0;
      .panel-heading{
        border: 0;
        background-color: #ffffff;
      }

    }
    .form-control{
      background-color: #ffffff;
      height: 40px;
      border: solid 1px #dfdfdf;
    }
    button{
      width: 100px;
      height: 37px;
    }
  }

</style>

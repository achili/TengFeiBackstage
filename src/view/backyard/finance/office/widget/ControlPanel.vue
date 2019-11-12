<template>
  <div>
    <div class="form-group">
      <label class="form-label compulsory">通知名称</label>
      <input type="text" class="form-control" v-model="name"/>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <NbSwitcher size="sm" v-model="mailEnable"/>
        <label class="ml10">
          邮件通知
        </label>
      </div>
      <NbExpanding>
        <div class="panel-body" v-show="mailEnable">
          <div class="form-group">
            <label class="form-label compulsory">发件人</label>
            <input type="text" class="form-control" readonly v-model="mailFromAddress"/>
          </div>
          <div class="form-group">
            <label class="form-label compulsory">收件人</label>(可群发，用;分隔)
            <input type="text" class="form-control" v-model="mailToAddress"/>
          </div>
          <div class="form-group">
            <label class="form-label compulsory">主题</label>
            <input type="text" class="form-control" v-model="mailSubject"/>
          </div>
          <div class="form-group">
            <label class="form-label compulsory">内容</label>
            <NbEditor v-model="mailContent" :isAdvanced="true" height="600px"/>
          </div>
        </div>
      </NbExpanding>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <NbSwitcher size="sm" v-model="messageEnable"/>
        <label class="ml10">
          APP信息通知
        </label>
      </div>
      <NbExpanding>
        <div class="panel-body" v-show="messageEnable">
          <div class="form-group">
            <label class="form-label compulsory">主题</label>
            <input type="text" class="form-control" v-model="messageSubject"/>
          </div>
          <div class="form-group">
            <label class="form-label compulsory">内容</label>
            <textarea class="form-control" rows="3" readonly v-model="messageContent"
                      placeholder="APP信息内容"></textarea>
            <!--<NbEditor v-model="messageContent" :isAdvanced="true" height="600px"/>-->
          </div>
        </div>
      </NbExpanding>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <NbSwitcher size="sm" v-model="smsEnable"/>
        <label class="ml10">
          短信通知
        </label>
      </div>
      <NbExpanding>
        <div class="panel-body" v-show="smsEnable">
          <div class="form-group">
            <label class="form-label compulsory">手机</label>
            <input type="text" class="form-control" v-model="smsPhone"/>
          </div>
          <div class="form-group">
            <label class="form-label compulsory">内容</label>
            <textarea class="form-control" rows="3" readonly v-model="smsContent"
                      placeholder="短信内容"></textarea>
          </div>
        </div>
      </NbExpanding>
    </div>

    <!--<div v-show="financeOfficePay.errorMessage" class="alert alert-danger">-->
    <!--{{financeOfficePay.errorMessage}}-->
    <!--</div>-->

    <!--<StatusReport :mailEnable="mailEnable" :messageEnable="messageEnable" :smsEnable="smsEnable" :showSend="showSend"/>-->

    <div class="text-right">
      <button class="btn btn-primary" @click.stop.prevent="sendNotification" v-show="!financeOfficePay.loading">
        <i class="fa fa-send"></i>
        发送通知

      </button>
      <button class="btn btn-primary" disabled v-show="financeOfficePay.loading">
        <i class="fa fa-spinner fa-spin"></i>
        正在发送中...

      </button>

    </div>

  </div>
</template>

<script>
  import NbSlidePanel from "../../../../../components/NbSlidePanel.vue";
  import NbSwitcher from "../../../../../components/NbSwitcher.vue";
  import NbExpanding from "../../../../../components/NbExpanding.vue";
  import NbEditor from "../../../../../components/NbEditor.vue";
  import StatusReport from "../../notification/StatusReport";
  import {Notification as NotificationBox} from 'element-ui'
  import FinanceOfficePay from "../../../../../common/model/finance/FinanceOfficePay";

  export default {
    data () {
      return {
        name:null,
        mailEnable:false,
        mailFromAddress:null,
        mailToAddress:null,
        mailSubject:null,
        mailContent:null,
        messageEnable:false,
        messageSubject:null,
        messageContent:null,
        smsEnable:false,
        smsPhone:null,
        smsContent:null,
        showSend:false
      }
    },
    props: {
      financeOfficePay:{
        type:FinanceOfficePay,
        required: true
      },
      //发送之前的前置方法
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
          this.financeOfficePay.loading = true;
          this.beforeSendCallback(function () {
            that.financeOfficePay.loading = false;
            that.send();
          })
        } else {
          that.send();
        }
      },
      send(){
        let that = this;
        this.financeOfficePay.httpSend(this.name,
          this.mailEnable,
          this.mailFromAddress,
          this.mailToAddress,
          this.mailSubject,
          this.mailContent,
          this.messageEnable,
          this.messageSubject,
          this.messageContent,
          this.smsEnable,
          this.smsPhone,
          this.smsContent,
          function () {
            NotificationBox.success({
              message: '发送通知成功！'
            });
            that.showSend = true;
            if (typeof that.successCallback === "function") {
              that.successCallback();
            }
          }, that.errorCallback);
      },
      control() {
        let that = this;
        this.name = "会议室付款通知";
        //邮件
        this.mailFromAddress = "snowflyingLUFFA@163.com";
        this.mailToAddress = this.financeOfficePay.spaceReservation.creator.email;
        this.mailSubject = "会议室付款通知单-" + this.financeOfficePay.companyPrincipal + this.financeOfficePay.spaceReservation.name;
        this.mailContent = "";
        //APP
        this.messageSubject = "会议室付款通知单-" + this.financeOfficePay.companyPrincipal + this.financeOfficePay.spaceReservation.name;
        this.messageContent =  "亲爱的" + this.financeOfficePay.companyPrincipal + ",您签署的会议室付款信息已生成，请您登录您个人邮箱进行查询。";
        //SMS
        this.smsPhone = this.financeOfficePay.financePhone;
        this.smsContent = "亲爱的" + this.financeOfficePay.companyPrincipal + ",您签署的会议室付款信息已生成，请您登录您个人邮箱进行查询。";
      }
    },
    mounted(){
      //this.control();
      FinanceOfficePay.fillByFinanceOfficePayMessage(this.name,this.mailFromAddress,this.mailToAddress,this.mailSubject,this.mailContent,
        this.messageSubject,this.messageContent,this.smsPhone,this.smsContent,this.financeOfficePay)

    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>

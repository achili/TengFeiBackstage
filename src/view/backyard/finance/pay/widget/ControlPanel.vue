<template>
  <div class="row control">
    <div class="col-md-12">

     <div class="row">
       <div class="col-md-12">
         <div class="form-group">
           <div class="col-md-1">
             <label class="form-label compulsory">通知名称</label>
           </div>
           <div class="col-md-11">
              <span v-if="mode === 'PAY_NOTIFY'">
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
                  <div class="col-md-1">
                    <label class="form-label compulsory">发件人</label>
                  </div>
                  <div class="col-md-11">
                    <input type="text" class="form-control" readonly v-model="notify.mailFromAddress"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-1">
                    <label class="form-label compulsory">收件人</label>(可群发，用;分隔)
                  </div>
                  <div class="col-md-11">
                    <input type="text" class="form-control" v-model="notify.mailToAddress"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-1">
                    <label class="form-label compulsory">主题</label>
                  </div>
                  <div class="col-md-11">
                    <input type="text" class="form-control" v-model="notify.mailSubject"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-1">
                    <label class="form-label compulsory">内容</label>
                  </div>
                  <div class="col-md-11">
                    <div v-show="mode === 'PAY_NOTIFY'">
                      <NbEditor ref="insert" v-model="notify.mailContent" :isAdvanced="true" height="600px"/>
                    </div>
                    <div v-show="mode === 'PAY_REMINDER'">
                      <NbEditor ref="insert" v-model="notify.mailPressContent" :isAdvanced="true" height="600px"/>
                    </div>
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
                  <div class="col-md-1">
                    <label class="form-label compulsory">主题</label>
                  </div>
                  <div class="col-md-11">
                    <input type="text" class="form-control" v-model="notify.messageSubject"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-1">
                    <label class="form-label compulsory">内容</label>
                  </div>
                  <div class="col-md-11">
                    <textarea class="form-control" rows="3" readonly v-model="notify.messageContent"
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
                  <div class="col-md-1">
                    <label class="form-label compulsory">手机</label>
                  </div>
                  <div class="col-md-11">
                    <input type="text" class="form-control" v-model="notify.smsPhone"/>
                  </div>
                </div>
                <div class="row mt10 form-group">
                  <div class="col-md-1">
                    <label class="form-label compulsory">内容</label>
                  </div>
                  <div class="col-md-11">
                     <textarea class="form-control" rows="3" readonly v-model="notify.smsContent"
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
            <button style="width: 100px;height: 37px;" class="btn f14 mr20 mb10 btn-theme"
                    @click.stop.prevent="send()" v-show="!financePayInfo.loading">
              发送通知
            </button>
            <button style="width: 100px;height: 37px;" class="btn f14 mr20 mb10 btn-theme" disabled v-show="financePayInfo.loading">
              正在发送中...
            </button>
          </div>


        </div>
      </div>

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
  import Notify from "../../../../../common/model/finance/Notify";
  import FinanceOfficePay from "../../../../../common/model/finance/FinanceOfficePay";
  import FinancePayInfo from "../../../../../common/model/finance/FinancePayInfo";

  export default {
    data () {
      return {
        showEmail: false,
        showMessage:false,
        showSMS:false,
        payment:"付款通知",
        press:"催款通知"
      }
    },
    props: {
      notify:{
        type: Notify,
        required: true
      },
      financePayInfo:{
        type: FinancePayInfo,
        required: true
      },
      mode:{
        type:String,
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

          this.financePayInfo.httpSend(this.notify.name,this.notify.mailEnable,this.notify.mailFromAddress,
            this.notify.mailToAddress,this.notify.mailSubject,this.notify.mailContent,this.notify.mailPressContent,this.notify.messageEnable,
            this.notify.messageSubject,this.notify.messageContent,this.notify.smsEnable,this.notify.smsPhone,this.notify.smsContent,this.mode,function () {
              NotificationBox.success({
                message: '发送通知成功！'
              });
              that.show(that.notify);
              if (typeof that.successCallback === "function") {
                that.successCallback();
              }
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
      this.$refs.insert.insert(this.notify.mailPressContent);
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

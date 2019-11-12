<template>
  <div class="finance-office-pay">
    <div class="mail-box" style="border: 0;">
      <div class="mail-body ml15" style="border: 0;">
        <el-tabs v-model="tabStatus" type="card" @tab-click="handleClick">
          <el-tab-pane label="发送付款通知" name="PAY_NOTIFY">
            <ControlPanel :notify="notify"
                          :financeOfficePay = "financeOfficePay"
                          :typess = "PAY_NOTIFY"
                          :beforeSendCallback="payingBeforeSendCallback"
                          :successCallback="sendNotifySuccessCallback"/>
          </el-tab-pane>
          <el-tab-pane label="发送催款通知" name="PAY_REMINDER">
            <ControlPanel :notify="notify"
                          :financeOfficePay = "financeOfficePay"
                          :typess = "PAY_REMINDER"
                          :beforeSendCallback="reminderBeforeSendCallback"
                          :successCallback="sendReminderSuccessCallback"/>
          </el-tab-pane>
          <el-tab-pane label="已收账款录入" name="PAYING">
            <FinanceBillReceiptCreateView :financeBillReceipt="financeBillReceipt"
                                          :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
          <!--<el-tab-pane label="发送付款通知" name="PAY_MESSAGE">-->
          <!--<MessageControlPanel :financeOfficePay = "financeOfficePay"-->
          <!--:successCallback="sendNotifySuccessCallback"/>-->
          <!--</el-tab-pane>-->
          <el-tab-pane label="在线支付" name="POS">
            <!--哪里用了自己定义的组建，就需要传过来-->
            <OfficePosCreateView :financePos="financePos"
                           :financeOfficePay="financeOfficePay"
                           :financeBillReceipt="financeBillReceipt"
                           :mode="PAY_POS"
                           :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
          <el-tab-pane label="POS退款" name="POS_REFUND">
            <!--哪里用了自己定义的组建，就需要传过来-->
            <OfficePosRefundCreateView :financePos="financePos"
                           :financeOfficePay="financeOfficePay"
                           :financeBillReceipt="financeBillReceipt"
                           :mode="POS_REFUND"
                           :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

  import ControlPanel from "../../notification/ControlPanel.vue";
  import NbSlidePanel from  "../../../../../components/NbSlidePanel.vue";
  import FinanceBillReceiptCreateView from "../../bill/widget/CreateView.vue";
  import Archive from  "./Archive.vue"
  import FinanceOfficePay from "../../../../../common/model/finance/FinanceOfficePay";
  import FinanceBillReceipt from "../../../../../common/model/finance/FinanceBillReceipt";
  import Notify from "../../../../../common/model/finance/Notify";
  import MessageControlPanel from "./ControlPanel.vue";
  import FinancePos from "../../../../../common/model/finance/FinancePos";
  import OfficePosCreateView from "../../bill/widget/OfficePosCreateView.vue";
  import OfficePosRefundCreateView from "../../bill/widget/OfficePosRefundCreateView.vue";


  export default {
    data(){
      return {
        tabStatus: "PAY_NOTIFY",
        PAY_REMINDER: "PAY_REMINDER",
        PAY_NOTIFY:"PAY_NOTIFY",
        PAY_POS:"PAY_POS",
        POS_REFUND:"POS_REFUND"
      }
    },
    computed:{},
    props:{
      financeOfficePay:{
        type: FinanceOfficePay,
        required: true,
        validator: function (entity) {
          return true;
        }
      },
      financeBillReceipt:{
        type: FinanceBillReceipt,
        required: true
      },
      financePos:{
        type: FinancePos,
        required: true
      },
      notify:{
        type: Notify,
        required: true
      },
      sendNotifySuccessCallback: {
        type: Function,
        required: false
      },
      sendReminderSuccessCallback: {
        type: Function,
        required: false
      },
      sendReceiptSuccessCallback: {
        type: Function,
        required: false
      }
    },
    watch:{

    },
    components:{
      ControlPanel,
      FinanceBillReceiptCreateView,
      NbSlidePanel,
      MessageControlPanel,
      Archive,
      OfficePosCreateView,
      OfficePosRefundCreateView
    },
    methods:{
      handleClick(arg){

      },
      sendReceiptFinish(){
        let that = this;
        //将该对象uuid置为null。否则下面只会更新。
        this.financeBillReceipt.uuid = null;
        if (typeof this.sendReceiptSuccessCallback === "function") {
          this.sendReceiptSuccessCallback();
        }
      },
      payingBeforeSendCallback(callback){
        let that = this;
        //this.notify.name = null;
       // this.financeOfficePay.uuid = null;
        if (typeof this.sendReceiptSuccessCallback === "function") {
          this.sendReceiptSuccessCallback();
        }
        // this.financePayInfo.httpNotify( function (response) {
        //
        //   that.notify.render(response.data.data);
        //
        //   if (typeof callback === "function") {
        //     callback();
        //   }
        // });
      },
      reminderBeforeSendCallback(callback){
        let that = this;
        // this.notify.name = null;
        if (typeof this.sendReceiptSuccessCallback === "function") {
          this.sendReceiptSuccessCallback();
        }
        // this.financeElectricPay.httpNotify(Action.FINANCE_PAY_INFO_NOTIFY, function (response) {
        //
        //   that.payingNotification.messageNotify.render(response.data.messageNotify);
        //
        //   if (typeof callback === "function") {
        //     callback();
        //   }
        // });
      }
    },
    mounted(){
      let that = this;



    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>

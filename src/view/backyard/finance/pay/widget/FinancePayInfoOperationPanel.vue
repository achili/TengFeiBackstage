<template>
  <div class="info">
    <div class="mail-box" style="border: 0;">
      <div class="mail-body " style="border: 0;">
        <el-tabs v-model="tabStatus" type="card" @tab-click="handleClick"  >
          <el-tab-pane label="发送付款通知" name="PAY_NOTIFY">
            <ControlPanel :notify="notify"
                          :financePayInfo = "financePayInfo"
                          :mode="PAY_NOTIFY"
                          :successCallback="payingBeforeSendCallback"/>
          </el-tab-pane>
          <el-tab-pane label="发送催款通知" name="PAY_REMINDER">
            <ControlPanel :notify="notify"
                          :financePayInfo = "financePayInfo"
                          :mode="PAY_REMINDER"
                          :successCallback="reminderBeforeSendCallback"/>
          </el-tab-pane>
          <el-tab-pane label="已收账款录入" name="PAYING">
            <FinanceBillReceiptCreateView :financeBillReceipt="financeBillReceipt"
                                          :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
          <el-tab-pane label="在线支付" name="POS">
            <!--哪里用了自己定义的组建，就需要传过来-->
            <PosCreateView :financePos="financePos"
                           :financePayInfo="financePayInfo"
                           :financeBillReceipt="financeBillReceipt"
                           :mode="PAY_POS"
                           :successCallback="sendReceiptFinish"/>
          </el-tab-pane>
          <el-tab-pane label="POS退款" name="POS_REFUND">
            <!--哪里用了自己定义的组建，就需要传过来-->
            <PosRefundCreateView :financePos="financePos"
                                       :financePayInfo="financePayInfo"
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

  import ControlPanel from "./ControlPanel.vue";
  import NbSlidePanel from "../../../../../components/NbSlidePanel.vue";
  import FinanceBillReceiptCreateView from "../../bill/widget/CreateView.vue";
  import PosCreateView from "../../bill/widget/PosCreateView.vue";
  import FinanceBillReceipt from "../../../../../common/model/finance/FinanceBillReceipt";
  import FinancePos from "../../../../../common/model/finance/FinancePos";
  import Notify from "../../../../../common/model/finance/Notify";
  import FinancePayInfo from "../../../../../common/model/finance/FinancePayInfo";
  import PosRefundCreateView from "../../bill/widget/PosRefundCreateView.vue";

  export default {
    data(){
      return {
        tabStatus: "PAY_NOTIFY",
        PAY_REMINDER:"PAY_REMINDER",
        PAY_NOTIFY:"PAY_NOTIFY",
        PAY_POS:"PAY_POS",
        POS_REFUND:"POS_REFUND"
      }
    },
    computed:{},
    props:{
      financePayInfo:{
        type: FinancePayInfo,
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
      PosCreateView,
      PosRefundCreateView,
      NbSlidePanel
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
        if (typeof this.sendReceiptSuccessCallback === "function") {
          this.sendReceiptSuccessCallback();
        }
      },
      reminderBeforeSendCallback(callback){
        let that = this;
        this.notify.name = null;
        if (typeof this.sendReceiptSuccessCallback === "function") {
          this.sendReceiptSuccessCallback();
        }
      }

    },
    mounted(){
      let that = this;



    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .info{
    el-tab-pane{
      background-color: #00b5e2;
    }
  }
</style>

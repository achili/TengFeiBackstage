<template>
  <div class="row">
    <div class="col-xs-12" v-if="isC">
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">凭证号：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" size="12" maxlength="12" v-model="financeBillReceipt.paymentNo" disabled>
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">退款金额：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" size="12" maxlength="12" v-model="financePayInfo.rentalPaid" disabled>
        </div>
      </div>
      <div class="row mt10" v-show="financePos.errorMessage">
        <div class="col-xs-12">
          <div class="alert alert-danger">
            {{financePos.errorMessage}}
          </div>
        </div>
      </div>
      <div class="row mt10">
        <div class="col-md-12 text-right">
          <PosRefundNbLoadingButton :entity="financePos" :callback="confirm"/>
        </div>
      </div>

    </div>
    <div v-if="!isC">
      <div style="height: 100vh;width: 100vw;background: rgba(0,0,0,.3);position: fixed;top: 0;left: 0;padding-top: 0;z-index: 88">
        <div style="background: white;border: 1px solid #E5E6E7;width: 420px;height:380px;margin: 20% auto">
          <div style="text-align: right;margin-top:3px;margin-right:3px">
            <i class="fa fa-times fa-2x" aria-hidden="true" @click="change()"></i>
          </div>
          <div style="text-align: center;margin-top:13px">{{successOrFail}}</div>
          <div style="text-align: center;margin-top:13px" v-if="!successOrFailImg" class="text-danger">
            <span>原因：</span>{{failMsg}}
          </div>
          <div style="text-align: center;margin-top:20px">
            <div v-if="successOrFailImg">
              <img src="../../../../../assets/img/success.png"/>
            </div>
            <div v-if="!successOrFailImg">
              <img src="../../../../../assets/img/fail.png"/>
            </div>
          </div>
          <div style="text-align: center;margin-top:20px">订单号：{{orderNumber}}</div>
          <div style="text-align: center;margin-top:18px">
            <span>退款金额：</span>
            <span class="text-info">{{payMoney}}￥</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isWait">
      <div style="height: 100vh;width: 100vw;background: rgba(0,0,0,.3);position: fixed;top: 0;left: 0;padding-top: 0;z-index: 88">
        <div style="background: white;border: 1px solid #E5E6E7;width: 420px;height:380px;margin: 20% auto">
          <div style="text-align: right;margin-top:5px;margin-right:5px">
            <i class="fa fa-times fa-2x" aria-hidden="true" @click="change()"></i>
          </div>
          <div style="text-align: center;margin-top:13px">{{successOrFail}}</div>
          <div style="text-align: center;margin-top:20px">
            <div v-if="waitImg">
              <img src="../../../../../assets/img/wait.png"/>
            </div>
          </div>
          <div style="text-align: center;margin-top:20px">订单号：</div>
          <div style="text-align: center;margin-top:10px">
            <span>退款金额：</span>
            <span class="text-info">{{payMoney}}￥</span>
          </div>
          <div v-if="waitImg" style="margin-top:20px">
            <div style="margin-top:8px; text-align: center" class="text-primary">若取消退款，请及时在pos机上操作</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import FinancePos from "../../../../../common/model/finance/FinancePos";
  import PosRefundNbLoadingButton from "../widget/PosRefundNbLoadingButton.vue";
  import FinancePayInfo from "../../../../../common/model/finance/FinancePayInfo";
  import NbTank from "../../../../../components/NbTank.vue";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceBillReceipt from "../../../../../common/model/finance/FinanceBillReceipt";
  import NbSlidePanel from "../../../../../components/NbSlidePanel.vue";
  import FinanceOfficePay from "../../../../../common/model/finance/FinanceOfficePay";
  export default{
    data(){
      return {
        refresh: true,
        Category: FinancePos.prototype.Category,
        isC: true,
        isWait: false,
        successOrFailImg: true,
        waitImg: false,
        payMoney: 0,
        successOrFail: null,
        failMsg:null,
        ws:null,
        orderNumber: null,
        numerical :0
      }
    },
    props: {
      financePos: {
        type: FinancePos,
          required: true
      },
      financePayInfo:{
        type:FinancePayInfo,
        required: true
      },
      financeBillReceipt: {
        type: FinanceBillReceipt,
        required: true
      },
      mode:{
        type:String,
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
    components: {
      PosRefundNbLoadingButton,
      NbTank,
      NbSlidePanel
    },
    computed: {},
    watch: {
      'financeBillReceipt.category'(newVal, oldVal){
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.DEPOSIT ){
          this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.depositPaid).toFixed(2);
        }
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.RENTAL){
          this.financeBillReceipt.amount = Math.round((this.financeBillReceipt.financePayInfo.total - this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.rentalPaid) * 100) / 100;

          //this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.total - this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.rentalPaid).toFixed(2);
        }
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.LATE_FEE) {
          this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.lateFee).toFixed(2);
        }
      },
      'financePayInfo.rentalPaid'() {
        if(this.financePayInfo.rentalPaid > 0){
          this.refreshes();
        }
      }
    },
    methods: {
      change(){
        this.isC = true;
        this.isWait = false;
      },
      confirm() {
        this.PosTest();
      },
      PosTest(successCallback, errorCallback){
        let that = this;
        let financeBillReceipt = new FinanceBillReceipt();
        financeBillReceipt.httpPosTest(function (response) {
          let msg = response.bodyText;
          if(msg === "success"){
            that.ToggleConnectionClicked();
          }
          successCallback && successCallback();
        }, errorCallback);
      },
      ToggleConnectionClicked() {
        let that = this;
        let flag = 0;
        that.numerical = that.financePayInfo.rentalPaid;
        let xx = (that.numerical * 100).toFixed(0).toString();
        if(xx.length < 12){     //这儿的小数问题还需要处理一下
          xx = (Array(12).join('0') + xx).slice(-12);
        }
        that.financePos.field_apptype = "0001";
        that.financePos.field_org_date = "20110000";
        that.financePos.field_org_ref = "000000000000";
        that.financePos.field_org_transno = that.financeBillReceipt.paymentNo;
        let DUmsocx1 = that.financePos.field_apptype + xx + that.financePos.field_org_date + that.financePos.field_org_ref + that.financePos.field_org_transno;
          try {
            that.ws = new WebSocket("ws://127.0.0.1:1818");//连接服务器
            that.ws.onopen = function(event){
              //alert("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
              flag = 0;

              //等待支付
              that.payMoney = that.financePayInfo.rentalPaid;
              that.successOrFail = "正在等待退款";
              that.waitImg = true;
              that.isWait = true;
              that.orderNumber = null;
              that.ws.send(DUmsocx1);
            };
            that.ws.onmessage = function(event){
              that.isWait = false;
              if(event.data.slice(0,2) === "00"){  //支付成功
                if(that.financePayInfo.rentalPaid > 0){
                  that.PosRefund(that.successCallback, that.errorCallback);
                }
                that.payMoney = that.financePayInfo.rentalPaid;
                that.successOrFail = "退款成功！";
                that.successOrFailImg = true;
              }
              if(event.data.slice(0,2) === "FK"){  //用户取消支付
                that.payMoney = that.financePayInfo.rentalPaid;
                that.successOrFail = "退款失败！";
                that.failMsg = "用户取消退款！";
                that.successOrFailImg = false;
                that.isC = false;
              }
              if(event.data.slice(0,2) === "FL"){  //连接超时
                that.payMoney = that.financePayInfo.rentalPaid;
                that.successOrFail = "退款失败！";
                that.failMsg = "已退款，禁止重复退款！";
                that.successOrFailImg = false;
                that.isC = false;
              }
            };
            flag = 1;
            that.ws.onclose = function(event){
              //alert("已经与服务器断开连接\r\n当前连接状态：" + this.readyState);
            };
            that.ws.onerror = function(event){
              /*if(flag !== 1) alert("WebSocket异常！");*/
              if(flag !== 1){
                MessageBox.confirm("WebSocket异常!", '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              }
            };
          } catch (ex) {
            alert(ex.message);
          }
      },
      PosRefund(successCallback, errorCallback){
        let financeBillReceipt = new FinanceBillReceipt();
        financeBillReceipt.render(this.financeBillReceipt);
        financeBillReceipt.errorMessage = "";
        this.refresh = false;
        let that = this;

        financeBillReceipt.uuid = null;
        financeBillReceipt.type = that.financePos.pos_field_apptypes;
        financeBillReceipt.category = "RENTAL";
        financeBillReceipt.amount = -this.financePayInfo.rentalPaid;
        financeBillReceipt.remark = "退款操作！";
        financeBillReceipt.httpReceivableSave(function (response) {
          that.orderNumber = response.body.data.no;
          that.refresh = true;
          that.isC = false;  //显示支付成功页面
          successCallback && successCallback();
        }, errorCallback);
      },
      refreshes(successCallback, errorCallback){
        let that = this;
        let uuid = this.$store.state.route.query.uuid;
        if(uuid){
          that.financeBillReceipt.httpPosRefundDetail(uuid, function (response) {
            if(response.body.length > 0){
              that.financeBillReceipt.paymentNo = response.body[0].paymentNo;
            }
            successCallback && successCallback();
          }, errorCallback);
        }
      }
    },
    mounted() {
      let that = this;
      that.refreshes();
    }
  }
</script>


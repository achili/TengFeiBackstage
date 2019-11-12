<template>
  <div class="row">
    <div class="col-xs-12" v-if="isC">
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">订单号：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" size="12" maxlength="12" v-model="financePayInfo.no" disabled>
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付金额：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" size="12" maxlength="12" v-model="financePayInfo.remainTotal" disabled>
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">付款方公司或负责人：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" size="12" maxlength="12" placeholder="合同公司名称"
                 v-model="financeBillReceipt.companyName">
        </div>
      </div>
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 no-compulsory">备注：</label>
        <div class="col-md-10">
          <textarea class="form-control" placeholder="请输入" rows="3"  maxlength="50" v-model="financePos.field_memo"></textarea>
        </div>
      </div>
      <!--<div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付方式：</label>
        <div class="col-md-10">
          <select class="form-control" v-model="financePos.field_apptype">
            <option v-for="(field_apptype,index) in financePos.getTypeList()" :value="field_apptype.value" :key="index">
              {{field_apptype.name}}
            </option>
          </select>
        </div>
      </div>-->
      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付方式：</label>
        <div class="col-md-10">
          <div style="border: 1px solid #eaebec; padding-left: 15px">
            <div style="text-align: left;margin-top:20px;">
              <div style="">
                <div>
                  支付平台
                  <span style="color: #888888;margin-left:70px">请支付宝/微信用户选择一下方式付款：</span>
                </div>
                <div style="margin-top:30px">
                    <div style="border: 1px solid #eaebec; width: 150px;height: 50px;position: inherit;text-align: center;margin-left:128px; float: left">
                      <div style="margin: 0 auto;width: 128px;text-align: center;line-height: 46px">
                        <label>
                          <input name="onlinePay" type="radio" value="WEB_ALIPAY" v-model="financePos.pos_field_apptypes" checked/>
                          <img src="../../../../../assets/img/alipay.png"/>
                        </label>
                      </div>
                    </div>
                    <div style="border: 1px solid #eaebec; width: 150px;height: 50px;text-align: center;margin-left:45px;float: left">
                      <div style="margin: 0 auto;width: 128px;text-align: center;line-height: 46px">
                        <label>
                          <input name="onlinePay" type="radio" value="WEB_WECHAT" v-model="financePos.pos_field_apptypes"/>
                          <img src="../../../../../assets/img/weChat.png"/>
                        </label>
                      </div>
                    </div>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div style="margin-top: 90px;">
                  借记卡/储蓄卡
                  <span style="color: #888888;margin-left:36px">请银行卡用户选择一下方式付款：POS机刷卡</span>
                </div>
                <div style="margin-top:30px">
                  <span>
                    <div style="border: 1px solid #eaebec; width: 150px;height: 50px;text-align: center;margin-left:128px;">
                      <div style="margin: 0 auto;width: 128px;height: 80px;text-align: center;line-height: 46px">
                        <label>
                        <input name="onlinePay" type="radio" value="WEB_BANK" v-model="financePos.pos_field_apptypes"/>
                        <img src="../../../../../assets/img/bankCard.png"/>
                      </label>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
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
          <PosNbLoadingButton :entity="financePos" :callback="confirm"/>
        </div>
      </div>
      <div class="row mt10" style="margin-top: 30px">
        <label class="col-md-2 control-label mt5 compulsory">文件下载：</label>
        <div class="col-md-10">
          <a target="_blank" href='https://tank.allready.cc/api/alien/download/d5f54279-2440-4ac9-7c05-66c19c42dae9/gmc.zip'>
            <i class="fa fa-file-pdf-o"></i>
            点击下载gmc文件 (若pos通收款，必须下载gmc文件并且按照以下说明操作)
          </a>
        </div>
        <div class="col-md-10">
          <div style="margin-top:5px">
            使用说明：点击下载后，双击gmc文件解压，然后按照解压后文件里《websocket使用说明.txt》和《银联pos连接手册》 说明进行操作
          </div>
        </div>
      </div>

      <!--<NbSlidePanel class="mt10" type="info">
        <span slot="heading">
          <i class="fa fa-file" aria-hidden="true"></i>
          文件的上传和下载
        </span>
        <div slot="body">
          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">文件上传：</label>
            <div class="col-md-10">
              <NbTank :tank="financePos.fileUpload"/>
            </div>
          </div>
          <div class="row mt10">
            <label class="col-md-2 control-label mt5 compulsory">文件下载：</label>
            <div class="col-md-10">
              <a target="_blank" href='https://tank.allready.cc/api/alien/download/0b10abf8-1b0e-4181-4216-8bc53c854054/gmc.zip'>
                <i class="fa fa-file-pdf-o"></i>
                点击下载gmc文件
              </a>
            </div>
          </div>
        </div>
      </NbSlidePanel>-->

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
            <span>支付金额：</span>
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
            <span>支付金额：</span>
            <span class="text-info">{{payMoney}}￥</span>
          </div>
          <div v-if="waitImg" style="margin-top:20px">
            <div style="margin-top:8px; text-align: center" class="text-primary">若取消支付，请在pos机上操作</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import FinancePos from "../../../../../common/model/finance/FinancePos";
  import PosNbLoadingButton from "../widget/PosNbLoadingButton.vue";
  import FinancePayInfo from "../../../../../common/model/finance/FinancePayInfo";
  import NbTank from "../../../../../components/NbTank.vue";
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import FinanceBillReceipt from "../../../../../common/model/finance/FinanceBillReceipt";
  import NbSlidePanel from "../../../../../components/NbSlidePanel.vue";
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
        numerical :0,
        voucherNo:null //支付凭证号
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
      PosNbLoadingButton,
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
        that.numerical = that.financePayInfo.remainTotal;
        let xx = (that.numerical * 100).toFixed(0).toString();
        if(xx.length < 12){     //这儿的小数问题还需要处理一下
          xx = (Array(12).join('0') + xx).slice(-12);
        }
        if(this.financePos.pos_field_apptypes === "WEB_ALIPAY" || this.financePos.pos_field_apptypes === "WEB_WECHAT"){
          this.financePos.field_apptype = "0200";
        }else {
          this.financePos.field_apptype = "0100";
        }
        let DUmsocx1 = this.financePos.field_apptype + xx + this.financePos.field_memo;
          try {
            that.ws = new WebSocket("ws://127.0.0.1:1818");//连接服务器
            that.ws.onopen = function(event){
              //alert("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
              flag = 0;
              //等待支付
              that.payMoney = that.financePayInfo.remainTotal;
              that.successOrFail = "正在等待用户出示二维码";
              that.waitImg = true;
              that.isWait = true;
              that.orderNumber = null;
              that.ws.send(DUmsocx1);
            };
            that.ws.onmessage = function(event){
              //alert("接收到服务器发送的数据：\r\n" + event.data);
              that.isWait = false;
              if(event.data.slice(0,2) === "Y5"){  //连接失败
                that.payMoney = that.financePayInfo.remainTotal;
                that.successOrFail = "连接失败！";
                that.failMsg = "请稍后再试";
                that.successOrFailImg = false;
                that.isC = false;
                return;
              }
              if(event.data.slice(0,2) === "00"){  //支付成功
                that.voucherNo = event.data.slice(30,36);
                if(that.financePayInfo.notDeposit > 0 && that.financePayInfo.notRental > 0){
                  that.notDepositReceivable(function () {
                    that.notRentalReceivable(that.successCallback, that.errorCallback);
                  }, that.errorCallback);
                }else {
                  if(that.financePayInfo.notDeposit > 0){
                    that.notDepositReceivable(that.successCallback, that.errorCallback);
                  }
                  if(that.financePayInfo.notRental > 0){
                    that.notRentalReceivable(that.successCallback, that.errorCallback);
                  }
                }
                that.payMoney = that.financePayInfo.remainTotal;
                that.successOrFail = "支付成功！";
                that.successOrFailImg = true;
              }
              if(event.data.slice(0,2) === "FK"){  //用户取消支付
                that.payMoney = that.financePayInfo.remainTotal;
                that.successOrFail = "支付失败！";
                that.failMsg = "用户取消支付！";
                that.successOrFailImg = false;
                that.isC = false;
              }
              if(event.data.slice(0,2) === "E5"){  //连接超时
                that.payMoney = that.financePayInfo.remainTotal;
                that.successOrFail = "支付失败！";
                that.failMsg = "连接超时,请稍后再试！";
                that.successOrFailImg = false;
                that.isC = false;
              }
            };
            flag = 1;
            that.ws.onclose = function(event){
              //alert("已经与服务器断开连接\r\n当前连接状态：" + this.readyState);
            };
            that.ws.onerror = function(event){
              that.payMoney = that.financePayInfo.remainTotal;
              that.successOrFail = "连接失败！";
              that.failMsg = "未下载或正确安装gmc程序！请按下方文件下载提示操作";
              that.successOrFailImg = false;
              that.isC = false;
              //alert("连接异常\r\n当前连接状态：" + this.readyState);
              /*if(flag !== 1) alert("WebSocket异常！");*/
              /*if(flag !== 1){
                MessageBox.confirm("WebSocket异常!", '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              }*/
            };
          } catch (ex) {
            console.log("999")
            alert(ex.message);
          }
      },
      /*notRentalReceivable(paymentNo, successCallback, errorCallback){*/
      notRentalReceivable(successCallback, errorCallback){
        let financeBillReceipt = new FinanceBillReceipt();
        financeBillReceipt.render(this.financeBillReceipt);
        /*financeBillReceipt.paymentNo(paymentNo);*/
        financeBillReceipt.errorMessage = "";
        this.refresh = false;
        let that = this;

        financeBillReceipt.category = "RENTAL";
        financeBillReceipt.type = that.financePos.pos_field_apptypes;
        financeBillReceipt.amount = this.financePayInfo.notRental;
        financeBillReceipt.companyName = this.financeBillReceipt.companyName;
        financeBillReceipt.remark = this.financePos.field_memo;
        financeBillReceipt.paymentNo = that.voucherNo;  //支付凭证号
        financeBillReceipt.httpReceivableSave(function (response) {
          that.orderNumber = response.body.data.no;
          that.refresh = true;
          that.isC = false;  //显示支付成功页面
          successCallback && successCallback();
        }, errorCallback);
      },
      notDepositReceivable(successCallback, errorCallback){
        let financeBillReceipt = new FinanceBillReceipt();
        financeBillReceipt.render(this.financeBillReceipt);
        financeBillReceipt.errorMessage = "";
        this.refresh = false;
        let that = this;

        financeBillReceipt.category = "DEPOSIT";
        financeBillReceipt.type = that.financePos.pos_field_apptypes;
        financeBillReceipt.amount = this.financePayInfo.notDeposit;
        financeBillReceipt.companyName = this.financeBillReceipt.companyName;
        financeBillReceipt.remark = this.financePos.field_memo;
        financeBillReceipt.httpReceivableSave(function (response) {
          that.orderNumber = response.body.data.no;
          that.refresh = true;
          that.isC = false;  //显示支付成功页面
          successCallback && successCallback();
        }, errorCallback);
      }
    },
    mounted() {
      let that = this;
    }
  }
</script>


<template>
  <div class="row">

    <div class="col-xs-12">

       <div class="row">
         <label class="col-md-2 control-label mt5 compulsory">关联付款信息单</label>
          <div class="col-md-10" v-if="refresh">
            <input type="text" class="form-control" v-model="financeBillReceipt.name" disabled style="border: 0;">
         </div>
       </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">付款方公司或负责人：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financeBillReceipt.companyName">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">收款类别：</label>
        <div class="col-md-10">
          <select class="form-control" v-model="financeBillReceipt.category">
            <option v-for="(category,index) in financeBillReceipt.getCategoryList()" :value="category.value" :key="index">
              {{category.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">金额：</label>
        <div class="col-md-10">
          <input type="number" class="form-control" @input="oninput" v-model="financeBillReceipt.amount">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">收款时间：</label>
        <div class="col-md-10">
          <el-date-picker
            v-model="financeBillReceipt.receiveTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付方式：</label>
        <div class="col-md-10">
          <select class="form-control" v-model="financeBillReceipt.type">
            <option v-for="(type,index) in financeBillReceipt.getTypeList()" :value="type.value" :key="index">
              {{type.name}}
            </option>
          </select>
        </div>
      </div>

      <div v-if="financeBillReceipt.type !== financeBillReceipt.Type.ALIPAY_WECHAT">

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">付款银行：</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="financeBillReceipt.partyBBank">
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">付款银行户名：</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="financeBillReceipt.partyBBankAccount">
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">付款银行账号：</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="financeBillReceipt.partyBBankNo">
          </div>
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付单号：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financeBillReceipt.paymentNo">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 no-compulsory">备注：</label>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="financeBillReceipt.remark">
        </div>
      </div>

      <div class="row mt10">
        <label class="col-md-2 control-label mt5 compulsory">支付凭证上传：</label>
        <div class="col-md-10">
          <NbTank :tank="financeBillReceipt.poster"/>
        </div>
      </div>

      <div class="row mt10" v-show="financeBillReceipt.errorMessage">
        <div class="col-xs-12">
          <div class="alert alert-danger">
            {{financeBillReceipt.errorMessage}}
          </div>
        </div>
      </div>

      <div class="row mt10">
        <div class="col-md-12 text-right">
          <NbLoadingButton :entity="financeBillReceipt" :callback="save"/>
        </div>

      </div>

    </div>
  </div>
</template>
<script>

  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import {simpleDateTime, str2Date} from "../../../../../common/filter/time";
  import FinanceBillReceipt from "../../../../../common/model/finance/FinanceBillReceipt";
  import NbLoadingButton from  "../../../../../components/NbLoadingButton.vue";
  import FinancePayInfoSelection from "../../pay/Selection";
  import FinanceOfficePaySelection from "../../../../../view/backyard/finance/office/Selection";
  import NbTank from  "../../../../../components/NbTank.vue";


  export default{
    data(){
      return {
        refresh: true,
        Category: FinanceBillReceipt.prototype.Category
      }
    },
    props: {
      financeBillReceipt: {
        type: FinanceBillReceipt,
        required: true
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
      NbLoadingButton,
      FinancePayInfoSelection,
      FinanceOfficePaySelection,
      NbTank
    },
    computed: {
    },
    watch: {
      'financeBillReceipt.category'(newVal, oldVal){
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.DEPOSIT ){
          let money = (this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.depositPaid).toFixed(2);
          if(money !== 0){
            this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.depositPaid).toFixed(2);
          }
        }
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.RENTAL){
          let money = Math.round((this.financeBillReceipt.financePayInfo.total - this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.rentalPaid) * 100) / 100;
          if(money !== 0){
            this.financeBillReceipt.amount = Math.round((this.financeBillReceipt.financePayInfo.total - this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.rentalPaid) * 100) / 100;
          }
          //this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.total - this.financeBillReceipt.financePayInfo.performanceBond - this.financeBillReceipt.financePayInfo.rentalPaid).toFixed(2);
        }
        if(this.financeBillReceipt.category === FinanceBillReceipt.prototype.Category.LATE_FEE) {
          this.financeBillReceipt.amount = (this.financeBillReceipt.financePayInfo.lateFee).toFixed(2);
        }
      }
    },
    methods: {
      save(){
        this.financeBillReceipt.errorMessage = "";

        this.refresh = false;
        let that = this;
        //此处我们只新建 不修改？what?
        //this.financeBillReceipt.uuid = null;
        this.financeBillReceipt.httpSave(function (response) {
          NotificationBox.success({
            message: that.financeBillReceipt.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
          });
          that.refresh = true;
          if (typeof that.successCallback === "function") {
            that.successCallback();
          }
        }, that.errorCallback);
      },
      oninput(e){
        this.financeBillReceipt.amount = (this.financeBillReceipt.amount).match(/^-?\d*(\.?\d{0,2})/g,'')[0];
      }
    },
    mounted() {
      let that = this;
    }
  }
</script>


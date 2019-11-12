<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left f24">
          <span v-show="!financeBillReceipt.editMode">创建已收账款信息</span>
          <span v-show="financeBillReceipt.editMode">编辑已收账款信息</span>
        </div>
      </div>
    </div>

    <NbSlidePanel slot="back">
      <span slot="heading">
        <i class="fa fa-moon-o"></i>
        基本内容
      </span>
      <div slot="body">
        <!--<div class="row">-->
          <!--<div class="col-md-12">-->
            <!--&lt;!&ndash;<NbForm :httpForm="httpCreate" :successCallback="successCallback" :errorCallback="errorCallback"></NbForm>&ndash;&gt;-->

          <!--</div>-->
        <!--</div>-->

        <div class="row">

          <div class="col-xs-12">


              <NbTabs :borderStyle="true" :triggerHover="true">
                <NbTabPanel label="由付款信息创建">
                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">付款项目</label>
                    <div class="col-md-10">
                      <FinancePayInfoSelection :activeFinancePayInfo="financeBillReceipt.financePayInfo" :initFilter="{status:'PAYING','orderId':'DESC'}"/>
                    </div>
                  </div>
                </NbTabPanel>
                <NbTabPanel label="由会议室付款信息创建">
                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">付款项目</label>
                    <div class="col-md-10">
                      <FinanceOfficePaySelection :activeFinanceOfficePay="financeBillReceipt.financeOfficePay"
                                                 :initFilter="{status:'PAYING','orderId':'DESC'}"/>
                    </div>
                  </div>
                </NbTabPanel>
              </NbTabs>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">付款方公司或负责人：</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="financeBillReceipt.companyName">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">金额：</label>
              <div class="col-md-10">
                <input type="number" class="form-control" v-model="financeBillReceipt.amount">
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
              <label class="col-md-2 control-label mt5">备注：</label>
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

      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import {Notification,NotificationBox} from 'element-ui'
  import FinanceBillReceipt from "../../../../common/model/finance/FinanceBillReceipt";
  import FinanceOfficePaySelection from "../../../../view/backyard/finance/office/Selection";
  import NbLoadingButton from  "../../../../components/NbLoadingButton.vue";
  import FinancePayInfoSelection from "../pay/Selection";
  import NbTank from  "../../../../components/NbTank.vue";
  import NbTabs from '../../../../components/NbTabs.vue'
  import NbTabPanel from '../../../../components/NbTabPanel.vue'

  export default {
    data () {
      return {
        financeBillReceipt: new FinanceBillReceipt()
       // httpCreate: new FinanceBillReceipt().getHttpCreate()
      }
    },
    components: {
      NbTabs,
      NbTabPanel,
      NbSlidePanel,
      NbForm,
      NbTank,
      NbLoadingButton,
      FinancePayInfoSelection,
      FinanceOfficePaySelection
    },
    computed: {},
    watch: {},
    methods: {
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        //that.$router.push("/by/finance/bill/receipt/list");
        that.$router.push({path:'/by/finance/bill/receipt/detail/',query:{ uuid: that.financeBillReceipt.uuid }});
      },
      errorCallback(){
        Notification.error({
          message: '提交失败!'
        });

      },
      save(){
        let that = this;
        this.financeBillReceipt.httpSave(function (response) {
          Notification.success({
            message: that.financeBillReceipt.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
          });
          that.$router.push({path:'/by/finance/bill/receipt/detail',query:{ uuid: that.financeBillReceipt.uuid }});
        });
      }
    },
    mounted(){
      let that = this;
      this.financeBillReceipt.uuid = this.$route.query.uuid;
      if (this.financeBillReceipt.uuid) {
        this.financeBillReceipt.editMode = true;
        this.financeBillReceipt.httpDetail(function (){
          //that.httpCreate.backFill({financeBillReceipt: that.financeBillReceipt});
        });
      }
      //.httpCreate.backFill({financeBillReceipt: this.financeBillReceipt});
    }
  }
</script>

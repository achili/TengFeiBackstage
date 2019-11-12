<template>
  <div class="animated fadeIn hedging-create">

    <LoadingFrame :loading="financeHedgingPay.detailLoading">
      <div class="row">

        <div class="col-md-12 col-xs-12">
          <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
            <span><img class=" mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
          </div>
          <div class="pull-left title">
            <span v-show="!financeHedgingPay.editMode">创建对冲付款信息</span>
            <span v-show="financeHedgingPay.editMode">修改对冲付款信息</span>
          </div>
        </div>

        <div class="mt30 col-md-12">
          <div class="segmenting-line"> </div>
        </div>

        <div class="mt35 ml40 col-md-12">
          <div class="cell-subtitle">基本内容 </div>
        </div>

        <div class="mt30 col-md-12">
          <div class="mail-box" style="border: 0;">
            <div class="mail-body ml15" style="border: 0;">
              <div class="row mt10" v-show="financeHedgingPay.editMode">
                <label class="col-md-2 control-label mt5 compulsory">付款单名称</label>
                <div class="col-md-10">
                  <input v-model="financeHedgingPay.name" type="text" class="form-control">
                </div>
              </div>

              <NbTabs :blueTheme="true" :triggerHover="true">
                <NbTabPanel label="由付款信息创建">
                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">付款项目</label>
                    <div class="col-md-10">
                      <FinancePayInfoSelection :activeFinancePayInfo="financeHedgingPay.financePayInfo" :initFilter="{'orderCreateTime':'DESC'}"/>
                    </div>
                  </div>
                </NbTabPanel>
                <NbTabPanel label="由会议室付款信息创建">
                  <div class="row mt10">
                    <label class="col-md-2 control-label mt5 compulsory">付款项目</label>
                    <div class="col-md-10">
                      <FinanceOfficePaySelection :activeFinanceOfficePay="financeHedgingPay.financeOfficePay"
                                                 :initFilter="{'orderCreateTime':'DESC'}"/>
                    </div>
                  </div>
                </NbTabPanel>
              </NbTabs>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">公司或负责人</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="financeHedgingPay.companyName">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 mt20 ml40">
          <div class="cell-subtitle">付款信息</div>
        </div>

        <div class="col-md-12 col-xs-12 mt30">

          <div class="mail-box" style="border: 0;">
            <div class="mail-body ml15" style="border: 0;">
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">付款项</label>
                <div class="col-md-10">
                  对冲付款单
                  <!--<input type="text" class="form-control" v-model="financeHedgingPay.beneficiaryName">-->
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">应付总额</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="financeHedgingPay.payTotal" readonly>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">付款时间</label>
                <div class="col-md-10">
                  <el-date-picker
                    v-model="financeHedgingPay.payTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">备注</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" v-model="financeHedgingPay.remarks">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mt20 ml40">
            <div class="cell-subtitle">银行信息及联系人信息</div>
          </div>

          <div class="mt30 col-xs-12 pl30 pr30">
            <div class="mail-box" style="border: 0;">
              <div class="mail-body ml20" style="border: 0;">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">开户银行</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.bank">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">银行户名</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.bankName">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">银行账号</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.bankAccount">
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">联系人</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.contacts">
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">联系电话</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.phone">
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">地址</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="financeHedgingPay.address">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="col-md-12 col-xs-12 mt20">-->
          <!--<div class="col-md-12 ">-->
            <!--<div class="btn btn-success mt20" @click="refreshTemplate">刷新付款通知书模板</div>-->
          <!--</div>-->

          <!--<div class="mt10 col-md-12">-->
            <!--<div class="mail-box" style="border: 0;margin-right: -20px;">-->
              <!--<div class="mail-body ml15" style="border: 0;">-->
                <!--<div v-html="templateMap"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <div class="col-md-12 col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="financeHedgingPay.errorMessage">
            {{financeHedgingPay.errorMessage}}
          </div>
            <NbLoadingButton :entity="financeHedgingPay" :callback="save"/>
        </div>

      </div>

    </LoadingFrame>

  </div>
</template>
<script>
  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import LoadingFrame from "../../../../components/NbLoadingFrame";
  import NbTabs from '../../../../components/NbTabs.vue'
  import NbTabPanel from '../../../../components/NbTabPanel.vue'
  import FinanceHedgingPay from "../../../../common/model/finance/FinanceHedgingPay";
  import FinancePayInfoSelection from "../pay/Selection";
  import FinanceOfficePaySelection from "../../../../view/backyard/finance/office/Selection";
  import NbLoadingButton from '../../../../components/NbLoadingButton.vue'
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";



  export default{
    data(){
      return {
        financeHedgingPay: new FinanceHedgingPay(),
        templateMap:""
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      NbTabs,
      FinancePayInfoSelection,
      FinanceOfficePaySelection,
      NbLoadingButton,
      NbTabPanel
    },
    computed: {},
    watch: {
      "financeHedgingPay.financePayInfo.uuid"(newVal, oldVal) {
        if(newVal) {
          if(this.financeHedgingPay.financePayInfo.companyPrincipal) {
            this.financeHedgingPay.companyName = this.financeHedgingPay.financePayInfo.companyPrincipal;
          } else {
            this.financeHedgingPay.companyName = this.financeHedgingPay.financePayInfo.financeContact;
          }
          this.financeHedgingPay.payTotal = 0 - this.financeHedgingPay.financePayInfo.remainTotal;

          this.financeHedgingPay.bank = this.financeHedgingPay.financePayInfo.bank;
          this.financeHedgingPay.bankName = this.financeHedgingPay.financePayInfo.bankName;
          this.financeHedgingPay.bankAccount = this.financeHedgingPay.financePayInfo.bankAccount;
          this.financeHedgingPay.contacts = this.financeHedgingPay.financePayInfo.financeContact;
          this.financeHedgingPay.phone = this.financeHedgingPay.financePayInfo.financePhone;
          this.financeHedgingPay.address = this.financeHedgingPay.financePayInfo.financeAddress;

          this.financeHedgingPay.financeOfficePay = new FinanceOfficePay()
        }
      },
      "financeHedgingPay.financeOfficePay.uuid"(newVal, oldVal) {
        if(newVal) {
          this.financeHedgingPay.companyName = this.financeHedgingPay.financeOfficePay.companyPrincipal;
          this.financeHedgingPay.payTotal = 0 - this.financeHedgingPay.financeOfficePay.amountPayable;

          this.financeHedgingPay.bank = this.financeHedgingPay.financeOfficePay.bank;
          this.financeHedgingPay.bankName = this.financeHedgingPay.financeOfficePay.bankName;
          this.financeHedgingPay.bankAccount = this.financeHedgingPay.financeOfficePay.bankAccount;
          this.financeHedgingPay.contacts = this.financeHedgingPay.financeOfficePay.financeContact;
          this.financeHedgingPay.phone = this.financeHedgingPay.financeOfficePay.financePhone;
          this.financeHedgingPay.address = this.financeHedgingPay.financeOfficePay.financeAddress;

          this.financeHedgingPay.financePayInfo = new FinancePayInfo();
        }
      }
    },
    methods: {
      save(){
        let that = this;

        this.financeHedgingPay.httpSave(function (response) {
          NotificationBox.success({
            message: that.financeHedgingPay.editMode ? '修改付款信息成功！' : '创建付款信息成功！'
          });
          that.$router.push("/by/finance/hedging/pay/list");
        });
      },
      refreshTemplate(){
        let that = this;
        this.financeHedgingPay.fetchTemplate(function (response) {
          that.templateMap = response.data.data.templateMap;
        })
      }
    },
    mounted(){
      let that = this;
      this.financeHedgingPay.uuid = this.$route.query.uuid;
      if (this.financeHedgingPay.uuid) {
        this.financeHedgingPay.editMode = true;
        this.financeHedgingPay.httpDetail(function () {
          that.financeHedgingPay.fetchTemplate(function (response) {
            that.templateMap = response.data.data.templateMap;
          });
        });
      }


    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .hedging-create {
    padding: 20px 120px 0 30px;
    .title{
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }

  }
</style>

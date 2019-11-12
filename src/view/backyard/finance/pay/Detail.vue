<template>
  <div class="animated fadeIn pay-detail">
    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="financePayInfo.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
                <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
              </div>
              <div class="pull-left ">
                <span class="ml15 f26 cell-max-title">付款信息详情</span>
              </div>
            </div>
          </div>

          <div class="row mt20">
            <div class="col-md-12">
              <div class="segmenting-line"></div>
            </div>
          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">基本内容 </div>
            </div>
          </div>

          <div class="row mt20">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row mt10">
                    <label class="col-md-3">关联的租赁合同</label>
                    <div class="col-md-9">
                      <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/protocol/space/detail',query:{uuid:financePayInfo.protocolSpace.uuid}})" >
                        <span v-if="financePayInfo.protocolSpace.mainType === '公司'">
                          {{financePayInfo.protocolSpace.companyName}}
                        </span>
                        <span v-else>
                          {{financePayInfo.protocolSpace.personName}}
                        </span>
                        -{{financePayInfo.protocolSpace.no}}
                      </a>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">付款信息单编号</label>
                    <div class="col-md-9">{{financePayInfo.no }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">租赁合同编号</label>
                    <div class="col-md-9">{{financePayInfo.contractNo }}</div>
                  </div>

                  <div class="row mt10" v-if="financePayInfo.protocolSpace.mainType === '公司'">
                    <label class="col-md-3">付款公司名称</label>
                    <div class="col-md-9">{{financePayInfo.companyPrincipal}}</div>
                  </div>

                  <div class="row mt10" v-else>
                    <label class="col-md-3">付款个人</label>
                    <div class="col-md-9">{{financePayInfo.protocolSpace.personName}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">租金收款所属月数</label>
                    <div class="col-md-9">{{financePayInfo.reportingTime | simpleYearAndMonth }}</div>
                  </div>

                  <div class="row mt10" v-if="financePayInfo.payStartTime.getTime() === financePayInfo.protocolSpace.startTime.getTime()">
                    <label class="col-md-3">首期/首月会员费</label>
                    <div class="col-md-9">{{financePayInfo.memberFirstFee }} 元</div>
                  </div>

                  <div class="row mt10" v-if="(financePayInfo.protocolSpace.memberFeePayStyle === '大于一个月' || financePayInfo.protocolSpace.memberFeePayStyle === null || financePayInfo.protocolSpace.memberFeePayStyle ==='' ) && financePayInfo.payStartTime.getTime() !== financePayInfo.protocolSpace.startTime.getTime()">
                    <label class="col-md-3">每月会员费</label>
                    <div class="col-md-9">{{financePayInfo.membershipFee }} 元/月</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">履约保证金</label>
                    <div class="col-md-9">{{financePayInfo.performanceBond }}元</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">履约保证金所属时间</label>
                    <div class="col-md-9">{{financePayInfo.performanceBondStartTime | simpleDate}}-- {{financePayInfo.performanceBondEndTime | simpleDate}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">付款所属日期</label>
                    <div class="col-md-9">{{financePayInfo.payStartTime | simpleDate }} -- {{financePayInfo.payEndTime | simpleDate }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">需付款最晚时间</label>
                    <div class="col-md-9">{{financePayInfo.lastTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">本次需付会员费</label>
                    <div class="col-md-9">{{financePayInfo.memberFeePay}}元</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">应收滞纳金</label>
                    <div class="col-md-9">{{financePayInfo.lateFee}}元</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">合计</label>
                    <div class="col-md-9">{{financePayInfo.total}}元</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">开户银行</label>
                    <div class="col-md-9">{{financePayInfo.bank}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行户名</label>
                    <div class="col-md-9">
                      {{financePayInfo.bankName}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行账号</label>
                    <div class="col-md-9">
                      {{financePayInfo.bankAccount}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">联系人</label>
                    <div class="col-md-9">
                      {{financePayInfo.financeContact}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">联系电话</label>
                    <div class="col-md-9">
                      {{financePayInfo.financePhone}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">地址</label>
                    <div class="col-md-9">
                      {{financePayInfo.financeAddress}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">所属空间</label>
                    <div class="col-md-9">
                      {{financePayInfo.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">状态</label>
                    <div class="col-md-9">
                      <span :style="'color:'+financePayInfo.getStatusStyle()">{{financePayInfo.getStatusName()}}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

            <div class="row mt20 ml20">
              <div class="col-md-12">
                <div class="cell-subtitle">付款通知 </div>
              </div>
            </div>

            <!--付款通知书-->
          <div class="row">
            <div class="mt30 col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body " style="border: 0;">
                  <div v-html="templateMap"></div>
                </div>
              </div>
            </div>
          </div>

            <div class="row mt20 ml20">
              <div class="col-md-12">
                <div class="cell-subtitle">大事记录 </div>
              </div>
            </div>

            <!---大事记录-->
            <div class="row mt30 ">
              <div class="col-md-12 ">
                  <MessageNotifyView ref="messageNotifyView" :entity="financePayInfo"/>
              </div>
            </div>

            <div class="row mt40 ml20">
              <div class="col-md-12">
                <div class="cell-subtitle">收款记录 </div>
              </div>
            </div>

            <!--付款通知书-->
          <div class="row">
            <div class="mt30 col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">
                  <div class="row">
                    <div class="col-md-12">此付款单：</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">已收履约保证金：{{ (financePayInfo.depositPaid)}}元</label>
                    <label class="col-md-3">待收履约保证金：{{ (financePayInfo.notDeposit)}}元</label>
                    <label class="col-md-3">超额履约保证金：{{ (financePayInfo.excessDeposit)}}元</label>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">已收租金：{{(financePayInfo.rentalPaid)}}元</label>
                    <label class="col-md-3">待收租金：{{financePayInfo.notRental}}元</label>
                    <label class="col-md-3">超额租金：{{(financePayInfo.excessRental)}}元</label>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">已抵扣租金：{{(financePayInfo.deductibleRent)}}元</label>
                    <label class="col-md-3">已抵扣履约保证金：{{financePayInfo.deductibleDeposit}}元</label>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">通知 </div>
            </div>
          </div>

            <!--操作面板-->
          <div class="row">
            <div class="mt30 col-md-12">
              <!--哪里用了自己定义的组建，就需要传过来-->
              <FinancePayInfoOperationPanel :financePayInfo="financePayInfo"
                                            :financeBillReceipt="financeBillReceipt"
                                            :financePos="financePos"
                                            :notify="notify"
                                            :sendNotifySuccessCallback="sendNotifySuccessCallback"
                                            :sendReminderSuccessCallback="sendReminderSuccessCallback"
                                            :sendReceiptSuccessCallback="sendReceiptSuccessCallback"/>
            </div>
          </div>

          <div class="row mt20 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">操作</div>
            </div>
          </div>

          <div class="row mt20 bg-white ml1 mr0 ">
            <div class="col-md-12 mt35 mb20">
              <label class="col-md-3 control-label">当前状态：</label>
              <div class="col-md-3">
                <span v-if="financePayInfo.isClearZero">滞纳金已清零</span>
                <span v-else>滞纳金未清零</span>
              </div>
              <div v-if="!financePayInfo.isClearZero || financePayInfo.isClearZero === null">
                <button style="width: 100px;height: 37px;" class="mr30 f14 mb10 btn btn-theme pull-right" @click="updateClearZero">滞纳金清零</button>
              </div>
            </div>
          </div>

        </NbLoadingFrame>
      </div>
    </div>
  </div>
</template>

<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbLoadingFrame from "../../../../components/NbLoadingFrame";
  import FinancePayInfoOperationPanel from "./widget/FinancePayInfoOperationPanel";
  import FinanceBillReceipt from "../../../../common/model/finance/FinanceBillReceipt";
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";
  import Notify from "../../../../common/model/finance/Notify";
  import MessageNotifyView from "../../../../components/NbRecord";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import { Message, MessageBox, Notification } from 'element-ui';
  import FinancePos from "../../../../common/model/finance/FinancePos";

  export default {
    data () {
      return {
        financePayInfo: new FinancePayInfo(),
        financeBillReceipt: new FinanceBillReceipt(),
        financePos: new FinancePos(),
        StatusMap: FinancePayInfo.prototype.StatusMap,
        notify: new Notify(),
        templateMap:null
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      FinancePayInfoOperationPanel,
      MessageNotifyView,
      NbLoadingButton
    },
    methods: {
      refreshEvent(){ //大事记录
        this.$refs.messageNotifyView.refresh();
      },
      sendNotifySuccessCallback(){
        this.refreshEvent();
        //smoothScroll(this.$refs.flexFlow);
      },
      sendReminderSuccessCallback(){
        this.refreshEvent();
        //smoothScroll(this.$refs.flowNode);
      },
      sendReceiptSuccessCallback(){
        this.refresh();
        this.refreshEvent();
        //smoothScroll(this.$refs.flowNode);
      },
      refresh(){
        let that = this;
        this.financePayInfo.uuid = this.$route.query.uuid;
        if(this.financePayInfo.uuid){
          this.financePayInfo.httpDetail(function () {
            that.financePayInfo.renderEmail('PAY_NOTIFY',function (response) {
              that.financePayInfo.payEmail = response.data.data.payEmail;
              that.notify.fillByFinancePayInfo(that.financePayInfo);
            });
            that.financePayInfo.renderEmail('PAY_REMINDER',function (response) {
              that.financePayInfo.payPressEmail = response.data.data.payPressEmail;
              that.notify.fillByFinancePayInfo(that.financePayInfo);
            });

            that.financeBillReceipt.fillByFinancePayInfo(that.financePayInfo);

            that.financePayInfo.notDeposit = (that.financePayInfo.performanceBond - that.financePayInfo.depositPaid).toFixed(2);
            that.financePayInfo.notRental = (that.financePayInfo.total - that.financePayInfo.performanceBond - that.financePayInfo.rentalPaid).toFixed(2);

            that.financePayInfo.depositPaid = that.financePayInfo.depositPaid.toFixed(2);
            that.financePayInfo.excessDeposit =  that.financePayInfo.excessDeposit.toFixed(2);
            that.financePayInfo.rentalPaid = that.financePayInfo.rentalPaid.toFixed(2);
            that.financePayInfo.excessRental = that.financePayInfo.excessRental.toFixed(2);

          });
        }
        this.financePayInfo.fetchTemplate(function (response) {
          that.templateMap = response.data.data.templateMap;
        })

      },
      updateClearZero(){
        let that = this;
        MessageBox.confirm('确定要将此付款信息单滞纳金清零吗?清零后不可撤回！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {

          that.financePayInfo.httpClearZero(function (response) {
            Notification.success({
              message: '清零成功！'
            });
            that.refresh();
            that.refreshEvent();
          });

        }, function () {
        });
      }
    },
    mounted(){
      let that = this;

      this.refresh();
      this.refreshEvent();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .pay-detail{
    padding: 20px 120px 0 30px;
    .cell-subtitle{
      font-size: 18px;
      color: #888888;
    }
  }
</style>

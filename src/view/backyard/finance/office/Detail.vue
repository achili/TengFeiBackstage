<template>
  <div class="animated fadeIn office-detail">
    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="financeOfficePay.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div class="pull-left f24">
                <div title="返回" class="cursor-pointer"  @click.stop.prevent="$router.go(-1)">
                  <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
                  <span class="ml10 cell-max-title">会议室付款信息详情</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt20">
            <div class="col-md-12">
              <div class="segmenting-line"></div>
            </div>
          </div>

          <div class="row mt35 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">基本内容 </div>
            </div>
          </div>

          <div class="row mt30">
            <div class="col-md-12">
              <div class="mail-box" style="border: 0;">
                <div class="mail-body ml15" style="border: 0;">

                  <div class="row mt10">
                    <label class="col-md-3">关联的会议室订单</label>
                    <div class="col-md-9">
                      <a style="color: #00b5e2;" title="关联的会议室订单" @click.stop.prevent="$router.push({path:'/by/spaceReservation/edit',query:{uuid:financeOfficePay.spaceReservation.uuid}})">
                        {{financeOfficePay.spaceReservation.name}}
                      </a>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">创建时间</label>
                    <div class="col-md-9">{{financeOfficePay.createTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">通知用户</label>
                    <div class="col-md-9">{{financeOfficePay.spaceReservation.creator.name}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">公司名/公司负责人</label>
                    <div class="col-md-9">{{financeOfficePay.companyPrincipal}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">会议室订单编号</label>
                    <div class="col-md-9">{{financeOfficePay.spaceReservation.no}}</div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">备注</label>
                    <div class="col-md-9">
                      <span >{{financeOfficePay.remarks}}</span>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">付款项名称</label>
                    <div class="col-md-9">
                      <span >会议室付款单</span>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">应付合计</label>
                    <div class="col-md-9">
                      <span >{{financeOfficePay.handleTotal}}</span>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">已付金额</label>
                    <div class="col-md-9">
                      <span >{{financeOfficePay.amountPaid}}</span>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">应付余额</label>
                    <div class="col-md-9">
                      <span >{{financeOfficePay.amountPayable}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">使用时间</label>
                    <div class="col-md-9">{{financeOfficePay.lastTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">状态</label>
                    <div class="col-md-9"><span :style="'color:'+ financeOfficePay.getStatusStyle()">{{financeOfficePay.getStatusName()}}</span></div>
                  </div>


                  <div class="row mt10">
                    <label class="col-md-3">开户银行</label>
                    <div class="col-md-9">{{financeOfficePay.bank}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行户名</label>
                    <div class="col-md-9">
                      {{financeOfficePay.bankName}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行账号</label>
                    <div class="col-md-9">
                      {{financeOfficePay.bankAccount}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">联系人</label>
                    <div class="col-md-9">
                     {{financeOfficePay.financeContact}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">联系电话</label>
                    <div class="col-md-9">
                      {{financeOfficePay.financePhone}}
                    </div>
                  </div>
                  <div class="row mt10" >
                    <label class="col-md-3">地址</label>
                    <div class="col-md-9">
                      {{financeOfficePay.financeAddress}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">PDF下载</label>
                    <div class="col-md-9">
                      <a class="btn" style="background-color:#00b5e2;color: #ffffff;" target="_blank" :href="financeOfficePay.downloadPdfUrl()">
                        <i class="fa fa-file-pdf-o"></i>
                        下载
                      </a>
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">所属空间</label>
                    <div class="col-md-9">
                      {{financeOfficePay.spaceRegional.name}}
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
                <div class="mail-body ml15" style="border: 0;">
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
          <div class="row mt30">
            <div class="col-md-12">
              <MessageNotifyView ref="messageNotifyView" :entity="financeOfficePay"/>
            </div>
          </div>

          <div class="row mt40 ml20">
            <div class="col-md-12">
              <div class="cell-subtitle">通知 </div>
            </div>
          </div>

          <div class="row">
            <!---操作面板-->
            <div class="mt30 col-md-12">
              <FinanceOfficePayOperationPanel :financeOfficePay="financeOfficePay"
                                              :financeBillReceipt="financeBillReceipt"
                                              :financePos="financePos"
                                              :notify = "notify"
                                              :sendNotifySuccessCallback="sendNotifySuccessCallback"
                                              :sendReminderSuccessCallback="sendReminderSuccessCallback"
                                              :sendReceiptSuccessCallback="sendReceiptSuccessCallback"/>
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
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import FinanceOfficePayOperationPanel from "./widget/FinanceOfficePayOperationPanel";
  import {smoothScroll} from "../../../../common/util/AnimationUtils";
  import FinanceBillReceipt from "../../../../common/model/finance/FinanceBillReceipt";
  import Notify from "../../../../common/model/finance/Notify";
  import MessageNotifyView from "../../../../components/NbRecord";
  import $ from "jquery";
  import FinancePos from "../../../../common/model/finance/FinancePos";


  export default {
    data () {
      return {
        financeOfficePay: new FinanceOfficePay(),
        financeBillReceipt: new FinanceBillReceipt(),
        notify: new Notify(),
        StatusMap: FinanceOfficePay.prototype.StatusMap,
        content:'',
        templateMap:'',
        financePos: new FinancePos()
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      FinanceOfficePayOperationPanel,
      MessageNotifyView
    },
    methods: {
      refreshEvent(){
        //大事记录
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
        this.financeOfficePay.uuid = this.$route.query.uuid;
        if(this.financeOfficePay.uuid){
          this.financeOfficePay.httpDetail(function () {
            that.financeOfficePay.renderEmail(function (response) {
              that.financeOfficePay.officePayEmail = response.data.data.officePayEmail;
              that.notify.fillByFinanceOfficePay(that.financeOfficePay);
            });
            that.financeBillReceipt.fillByFinanceOfficePay(that.financeOfficePay);

          });
          this.financeOfficePay.fetchTemplate(function (response) {
            that.templateMap = response.data.data.templateMap;
          })
        }
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
  .office-detail{
    padding: 20px 120px 0 30px;
    .cell-subtitle{
      font-size: 18px;
      color: #888888;
    }
  }
</style>

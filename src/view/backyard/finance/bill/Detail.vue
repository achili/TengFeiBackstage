<template>
  <div class="animated fadeIn bill-detail">
    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="financeBillReceipt.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
                <span><img class="logo" width="30" height="30" src="../../../../assets/img/return.png"/></span>
              </div>
              <div class="pull-left ">
                <span class="ml15 cell-max-title">已收账款信息详情</span>
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

                  <div class="row mt10" v-if="financeBillReceipt.financePayInfo.uuid">
                    <span class="col-md-3">关联的付款信息单订单</span>
                    <a class="f14 cell-blue" @click.stop.prevent="$router.push({path:'/by/finance/pay/info/detail',query:{uuid:financeBillReceipt.financePayInfo.uuid}})">
                      <div class="col-md-9">{{financeBillReceipt.financePayInfo.name}}</div>
                    </a>
                  </div>

                  <div class="row mt10" v-if="financeBillReceipt.financeOfficePay.uuid">
                    <span class="col-md-3">关联的会议室付款信息单</span>
                    <a @click.stop.prevent="$router.push({path:'/by/finance/office/pay/detail',query:{uuid:financeBillReceipt.financeOfficePay.uuid}})">
                      <div class="col-md-9">{{financeBillReceipt.financeOfficePay.name}}</div>
                    </a>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">付款方名称</div>
                    <div class="col-md-9">{{financeBillReceipt.companyName }}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">通知用户</div>
                    <div class="col-md-9" v-if="financeBillReceipt.financeOfficePay.uuid">{{financeBillReceipt.financeOfficePay.spaceReservation.creator.name}}</div>
                    <div class="col-md-9" v-if="financeBillReceipt.financePayInfo.uuid">{{financeBillReceipt.financePayInfo.protocolSpace.spaceOrder.creator.name}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">金额</div>
                    <div class="col-md-9">{{financeBillReceipt.amount}}</div>
                  </div>

                  <div v-if="financeBillReceipt.financeOfficePay.uuid" class="row mt10">
                    <div class="col-md-3">用户类型</div>
                    <div class="col-md-9">{{financeBillReceipt.spaceReservation.getTypeName()}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">收款时间</div>
                    <div class="col-md-9">{{financeBillReceipt.receiveTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">收款类别</div>
                    <div class="col-md-9">{{financeBillReceipt.getCategoryName()}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">支付方式</div>
                    <div class="col-md-9"><span :style="'color:'+ financeBillReceipt.getTypeStyle()">{{financeBillReceipt.getTypeName()}}</span></div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">支付单号(退款凭证号)</div>
                    <div class="col-md-9">{{financeBillReceipt.paymentNo}}</div>
                  </div>

                  <div class="row mt10" >
                    <div class="col-md-3">备注</div>
                    <div class="col-md-9">
                      <span >{{financeBillReceipt.remark}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3 ">附件供下载：</div>
                    <div class="col-md-9 ">
                      <NbTank :tank="financeBillReceipt.poster" :edit="false"/>
                    </div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">收款人</div>
                    <div class="col-md-9">{{financeBillReceipt.creator.name}}</div>
                  </div>

                  <div class="row mt10">
                    <div class="col-md-3">所属空间</div>
                    <div class="col-md-9">{{financeBillReceipt.spaceRegional.name}}</div>
                  </div>

                  <!--<div class="row mt10" v-if="financeBillReceipt.status === 'CONFIRMATION'">-->
                    <!--<div class="col-md-12 text-right">-->
                      <!--<button class="btn btn-danger btn-sm btn-file" @click="upstatus(financeBillReceipt)">确认</button>-->
                    <!--</div>-->
                  <!--</div>-->

                </div>
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
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import FinanceBillReceipt from "../../../../common/model/finance/FinanceBillReceipt";
  import {Notification} from 'element-ui'
  import NbTank from "../../../../components/NbTank";
  import SpaceReservation from "../../../../common/model/spacereservation/SpaceReservation";

  export default {
    data () {
      return {
        financeBillReceipt: new FinanceBillReceipt(),
        spaceReservation: new SpaceReservation()
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      NbLoadingFrame,
      NbTank
    },
    methods: {
      refresh(){
        let that = this;
        this.financeBillReceipt.uuid = this.$route.query.uuid;
        if(this.financeBillReceipt.uuid){
          this.financeBillReceipt.httpDetail(function () {
          });
        }
      },
      upstatus(financeBillReceipt){
        financeBillReceipt.httpStatus(financeBillReceipt.Status.OK, function () {
          financeBillReceipt.status = financeBillReceipt.Status.OK;
          Notification.success({
            message:  '修改成功！'
          });
        });
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .bill-detail{
    padding: 20px 120px 0 30px;
    .btn{
      color: #ffffff;
      font-size: 16px;
      width: 122px;
      height: 46px;
      background-color: #ff9a9a;
      border: solid 1px #e2e2e2;
    }
    .cell-subtitle{
      font-size: 18px;
      color: #888888;
    }
  }
</style>

<template>
  <div class="animated fadeIn hedging-detail">
    <div class="row">
      <div class="col-md-12">
        <NbLoadingFrame :loading="financeHedgingPay.detailLoading">

          <div class="row">
            <div class="col-md-12">
              <div title="返回" class="pull-left mt5 cursor-pointer" @click.stop.prevent="$router.go(-1)">
                <span><img  width="30" height="30" src="../../../../assets/img/return.png"/></span>
              </div>
              <div class="pull-left ">
                <span class="ml15 cell-max-title" >对冲付款信息详情</span>
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

                  <div class="row mt10" v-if="financeHedgingPay.financePayInfo.uuid">
                    <label class="col-md-3">关联的会议室订单</label>
                    <div class="col-md-9"><a  style="color: #00b5e2;" @click.stop.prevent="$router.push({path:'/by/finance/pay/info/detail',query:{uuid:financeHedgingPay.financePayInfo.uuid}})">
                      {{financeHedgingPay.financePayInfo.name}}
                    </a></div>
                  </div>

                  <div class="row mt10" v-if="financeHedgingPay.financeOfficePay.uuid">
                    <label class="col-md-3">关联的会议室订单</label>
                    <div class="col-md-9"><a style="color: #00b5e2;" @click.stop.prevent="$router.push({path:'/by/finance/office/pay/detail',query:{uuid:financeHedgingPay.financeOfficePay.uuid}})">
                     {{financeHedgingPay.financeOfficePay.name}}
                    </a></div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">公司负责人</label>
                    <div class="col-md-9">{{financeHedgingPay.companyName }}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">应付总额</label>
                    <div class="col-md-9">{{financeHedgingPay.payTotal}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">付款时间</label>
                    <div class="col-md-9">{{financeHedgingPay.payTime | simpleDateMinute }}</div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3">备注</label>
                    <div class="col-md-9">
                      <span >{{financeHedgingPay.remarks}}</span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">开户银行</label>
                    <div class="col-md-9">{{financeHedgingPay.bank}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行户名</label>
                    <div class="col-md-9">{{financeHedgingPay.bankName}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">银行账号</label>
                    <div class="col-md-9">{{financeHedgingPay.bankAccount}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">联系人</label>
                    <div class="col-md-9">{{financeHedgingPay.contacts}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">联系电话</label>
                    <div class="col-md-9">{{financeHedgingPay.phone}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">地址</label>
                    <div class="col-md-9">{{financeHedgingPay.address}}</div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3">所属空间</label>
                    <div class="col-md-9">{{financeHedgingPay.spaceRegional.name}}</div>
                  </div>

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
  import {Notification} from 'element-ui'
  import NbTank from "../../../../components/NbTank";
  import FinanceHedgingPay from "../../../../common/model/finance/FinanceHedgingPay";

  export default {
    data () {
      return {
        financeHedgingPay: new FinanceHedgingPay(),
        templateMap:''
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
        this.financeHedgingPay.uuid = this.$route.query.uuid;
        if(this.financeHedgingPay.uuid){
          this.financeHedgingPay.httpDetail();
        }
      }
    },
    mounted(){
      this.refresh();
      let that = this;
      this.financeHedgingPay.fetchTemplate(function (response) {
        that.templateMap = response.data.data.templateMap;
      })
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .hedging-detail{
    padding: 20px 120px 0 30px;
    .cell-subtitle{
      font-size: 18px;
      color: #888888;
    }
  }
</style>

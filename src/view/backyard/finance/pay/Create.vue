<template>
  <div class="animated fadeIn pay-create">
    <div class="row">
      <div class="col-xs-12">
        <div title="返回" class="pull-left mt5 cursor-pointer"  @click.stop.prevent="$router.go(-1)">
          <span><img class=" mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!financePayInfo.editMode">创建付款信息单</span>
          <span v-show="financePayInfo.editMode">编辑付款信息单</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line" > </div>
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
            <div class="row">
              <div class="col-md-3 compulsory">关联租赁合同</div>
              <div class="col-md-9">
                <ProtocolSpaceSelection :activeProtocolSpace="financePayInfo.protocolSpace" :initFilter="{status:'PROCESSING',orderCreateTime:'DESC',record:'false'}"></ProtocolSpaceSelection>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">合同编号</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.contractNo" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">付款公司名称</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.companyPrincipal" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">租金收款所属月份</div>
              <div class="col-md-9">
                <el-date-picker disabled
                                v-model="financePayInfo.reportingTime"
                                type="date" format="yyyy-MM"
                                placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt50" v-if="oldFinancePayInfo.uuid == null">
              <div class="col-md-3 compulsory">首月/首期会员费</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model="financePayInfo.memberFirstFee" readonly/>
              </div>元
            </div>

            <div class="row mt10" v-if="oldFinancePayInfo.uuid != null">
              <div class="col-md-3 compulsory">每月会员费</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model="financePayInfo.membershipFee" readonly/>
              </div>元/月
            </div>

            <div class="row mt10" v-if="oldFinancePayInfo.uuid == null">
              <div class="col-md-3 compulsory">履约保证金</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model="financePayInfo.performanceBond" readonly/>
              </div>元
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">履约保证时间</div>
              <div class="col-md-9" :aria-disabled="true">
                <NbDateRange :startTime="financePayInfo.performanceBondStartTime"
                             v-on:startTimeChange="startTime = arguments[0]"
                             :endTime="financePayInfo.performanceBondEndTime"
                             v-on:endTimeChange="endTime = arguments[0]" :disabled="true" ></NbDateRange>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">付款所属日期</div>
              <div class="col-md-9">
                <NbDateRange :startTime="financePayInfo.payStartTime"
                             v-on:startTimeChange="startTime = arguments[0]"
                             :endTime="financePayInfo.payEndTime"
                             v-on:endTimeChange="endTime = arguments[0]" :disabled="true" ></NbDateRange>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">需付款最晚时间</div>
              <div class="col-md-9">
                <el-date-picker v-model="financePayInfo.lastTime" type="date" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">本次需付会员费</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model="financePayInfo.memberFeePay" readonly/>
              </div>元
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">滞纳金</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model="financePayInfo.lateFee" readonly/>
              </div>元
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">合计</div>
              <div class="col-md-6">
                <input type="number" class="form-control" v-model.number="financePayInfo.total" readonly/>
              </div>元
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">合计大写</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.capitalTotal" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">开户银行</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.bank" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">银行户名</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.bankName" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">银行账户</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.bankAccount" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">联系人</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.financeContact" readonly/>
              </div>
            </div>

            <div class="row mt10">

              <div class="col-md-3 compulsory">联系电话</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.financePhone" readonly/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 compulsory">地址</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financePayInfo.financeAddress" readonly/>
              </div>
            </div>

            <div class="btn btn-success mt20" @click="refreshTemplate">刷新付款信息单预览</div>

            <div class="row mt10">
              <div class="col-md-12">
                <div class="mail-box">
                  <div class="mail-body ml15">
                    <div v-html="templateMap"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="alert alert-danger mt20" v-show="financePayInfo.errorMessage">
              {{financePayInfo.errorMessage}}
            </div>

            <div class="row mr2">
              <NbLoadingButton :entity="financePayInfo" :callback="save"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import {Notification} from 'element-ui'
  import FinancePayInfo from "../../../../common/model/finance/FinancePayInfo";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import NbDateRange from "../../../../components/NbDateRange";
  import ProtocolSpaceSelection from "../../protocol/space/Selection";
  import {numberCapital} from "../../../../common/filter/str";
  import {simpleDate, simpleDateTime, str2Date, str2DateTime} from "../../../../common/filter/time";
  import SpaceSetting from "../../../../common/model/spacesetting/SpaceSetting";
  import ProtocolSpace from "../../../../common/model/protocol/space/ProtocolSpace";

  export default {
    data () {
      return {
        financePayInfo: new FinancePayInfo(),
        oldFinancePayInfo: new FinancePayInfo(),
        templateMap:"",
        spaceSetting: new SpaceSetting(),
        isSubmit: true
        //httpCreate: new FinancePayInfo().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      NbLoadingButton,
      NbDateRange,
      ProtocolSpaceSelection
    },
    computed: {

    },
    watch: {
      "financePayInfo.protocolSpace.uuid"(newVal, oldVal){
        let that = this;
        if(this.financePayInfo.protocolSpace.mainType === "公司" ){
          this.financePayInfo.companyPrincipal = this.financePayInfo.protocolSpace.companyName;
        }else{
          this.financePayInfo.companyPrincipal = this.financePayInfo.protocolSpace.personName;
        }
        this.financePayInfo.contractNo = this.financePayInfo.protocolSpace.no;
        //会员费
        this.financePayInfo.membershipFee = this.financePayInfo.protocolSpace.memberFee;
        //履约保证金
        this.financePayInfo.performanceBond = this.financePayInfo.protocolSpace.deposit;
        //履约保证金 起止时间
        this.financePayInfo.performanceBondStartTime = this.financePayInfo.protocolSpace.startTime;
        this.financePayInfo.performanceBondEndTime = this.financePayInfo.protocolSpace.endTime;

        this.financePayInfo.bank = this.financePayInfo.protocolSpace.baseBank;
        this.financePayInfo.bankName = this.financePayInfo.protocolSpace.baseBank;

        this.financePayInfo.bank = this.financePayInfo.protocolSpace.baseBank;
        this.financePayInfo.bankName = this.financePayInfo.protocolSpace.baseBankName;
        this.financePayInfo.bankAccount = this.financePayInfo.protocolSpace.baseBankNumber;

        this.updateSpace();

        // this.financePayInfo.financeContact = this.financePayInfo.protocolSpace.basePerson;
        // this.financePayInfo.financePhone = this.financePayInfo.protocolSpace.basePhone;
        // this.financePayInfo.financeAddress = this.financePayInfo.protocolSpace.baseAddress;

        this.financePayInfo.capitalTotal = numberCapital(this.financePayInfo.total);

        if(this.financePayInfo.protocolSpace.memberFeePayStyle === '大于一个月' || this.financePayInfo.protocolSpace.memberFeePayStyle === null || this.financePayInfo.protocolSpace.memberFeePayStyle === ''){

          this.financePayInfo.httpSearch(this.financePayInfo.protocolSpace.uuid,function (response) {
            that.oldFinancePayInfo = response.data.data.lastFinancePayInfo;
            if(that.oldFinancePayInfo != null){
              that.oldFinancePayInfo.payEndTime = str2Date(that.oldFinancePayInfo.payEndTime);
            }
            that.countPayStartTime();
            that.countTime();
          });

          if(this.oldFinancePayInfo.uuid != null){
            let startTime = new Date(this.oldFinancePayInfo.payEndTime);
            let endTime = new Date(this.financePayInfo.protocolSpace.startTime);
            if(startTime.getDate() === endTime.getDate()){
              this.financePayInfo.protocolSpace = new ProtocolSpace();
              this.financePayInfo.protocolSpace.uuid = null;
            }
          }

        }

        if(this.financePayInfo.protocolSpace.memberFeePayStyle === '小于一个月' || this.financePayInfo.protocolSpace.memberFeePayStyle === '一个月'){
          this.financePayInfo.httpSearch(this.financePayInfo.protocolSpace.uuid,function (response) {
            that.oldFinancePayInfo = response.data.data.lastFinancePayInfo;
            if(that.oldFinancePayInfo != null){
              that.oldFinancePayInfo.payEndTime = str2Date(that.oldFinancePayInfo.payEndTime);
            }
            that.countDateTime();
          });
          if(this.oldFinancePayInfo.uuid != null) {
            let startTime = new Date(this.oldFinancePayInfo.payEndTime);
            let endTime = new Date(this.financePayInfo.protocolSpace.startTime);
            if (startTime.getDate() === endTime.getDate()) {
              this.financePayInfo.protocolSpace = new ProtocolSpace();
              this.financePayInfo.protocolSpace.uuid = null;
            }
          }

        }


      }
    },
    methods: {
      countPayStartTime(){
        let dayProtocol = new Date(this.financePayInfo.protocolSpace.endTime);
        if(this.oldFinancePayInfo.uuid == null){
          this.financePayInfo.payStartTime = this.financePayInfo.protocolSpace.startTime;
          var day2 = new Date(this.financePayInfo.payStartTime);
          if(day2.getMonth() === dayProtocol.getMonth() && day2.getFullYear() === dayProtocol.getFullYear()){
            this.financePayInfo.payEndTime =  this.financePayInfo.protocolSpace.endTime;
          }else{
            day2.setDate(1);
            day2.setMonth(day2.getMonth() + 1);
            let s2 = new Date(day2.getTime() - 1000 * 60 * 60 * 24);
            this.financePayInfo.payEndTime =  s2;
          }

        }else{
          let day1 = this.oldFinancePayInfo.payEndTime;
          day1.setDate(day1.getDate() + 1);
          var s1 = day1;
          this.financePayInfo.payStartTime = s1;

          let day2 = new Date(this.financePayInfo.payStartTime);
          day2.setDate(1);
          day2.setMonth(day2.getMonth() + 1);
          let s2 = new Date(day2.getTime() - 1000 * 60 * 60 * 24);

          let day3 = new Date(this.financePayInfo.protocolSpace.endTime)

          if(s2.getMonth() === day3.getMonth() && s2.getFullYear() === day3.getFullYear()){
            this.financePayInfo.payEndTime = this.financePayInfo.protocolSpace.endTime;
          }else{
            this.financePayInfo.payEndTime =  s2;
          }

        }
      },
      countTime(){
        //最后付款时间
        let day1 = new Date(this.financePayInfo.payStartTime);
        day1.setDate(day1.getDate() - 1);
        var s1 = day1;
        this.financePayInfo.lastTime = s1;

        //租金所属月份
        this.financePayInfo.reportingTime = this.financePayInfo.payStartTime;
        //首月会员费 && this.financePayInfo.protocolSpace.memberType === 'MOBILE_STATION'
        if(this.financePayInfo.payStartTime.getTime() !== this.financePayInfo.protocolSpace.startTime.getTime() && this.financePayInfo.payEndTime.getTime() === this.financePayInfo.protocolSpace.endTime.getTime()){
          this.financePayInfo.memberFirstFee = this.financePayInfo.protocolSpace.lastMemberFee;
        }else{
          this.financePayInfo.memberFirstFee = this.financePayInfo.protocolSpace.firstMouthMemberFee;
        }

        //本次需付会员费
        if(this.oldFinancePayInfo.uuid == null){
          this.financePayInfo.memberFeePay = this.financePayInfo.memberFirstFee;
          //总计
          this.financePayInfo.total = Number(this.financePayInfo.memberFeePay) + Number(this.financePayInfo.performanceBond);
        }else{
          if(this.financePayInfo.payStartTime.getTime() !== this.financePayInfo.protocolSpace.startTime.getTime() && this.financePayInfo.payEndTime.getTime() === this.financePayInfo.protocolSpace.endTime.getTime()){
            this.financePayInfo.memberFeePay = this.financePayInfo.protocolSpace.lastMemberFee;
          }else{
            this.financePayInfo.memberFeePay = this.financePayInfo.membershipFee;
          }
          this.financePayInfo.total = Number(this.financePayInfo.memberFeePay);
        }
        this.financePayInfo.capitalTotal = numberCapital(this.financePayInfo.total);

      },
      countDateTime(){
        //首期会员费
        this.financePayInfo.memberFirstFee = this.financePayInfo.protocolSpace.totalInnoToken;
        //付款所属日期
        this.financePayInfo.payStartTime = this.financePayInfo.protocolSpace.startTime;
        this.financePayInfo.payEndTime = this.financePayInfo.protocolSpace.endTime;
        //最后付款时间
        let day1 = new Date(this.financePayInfo.payStartTime);
        day1.setDate(day1.getDate() - 1);
        var s1 = day1;
        this.financePayInfo.lastTime = s1;

        //租金所属月份
        this.financePayInfo.reportingTime = this.financePayInfo.payStartTime;
        //本次需付会员费
        this.financePayInfo.memberFeePay = this.financePayInfo.protocolSpace.totalInnoToken;
        //总计
        this.financePayInfo.total = Number(this.financePayInfo.memberFeePay) + Number(this.financePayInfo.lateFee) + Number(this.financePayInfo.performanceBond);
        this.financePayInfo.capitalTotal = numberCapital(this.financePayInfo.total);
      },
      save(){
        let that = this;
        this.financePayInfo.httpSave(function (response) {
          Notification.success({
            message: that.financePayInfo.editMode ? '修改成功！' : '创建成功！'
          });
          that.$router.push("/by/finance/pay/info/detail?uuid=" + that.financePayInfo.uuid);
        });
      },
      refreshTemplate(){
        let that = this;
        this.financePayInfo.fetchTemplate(function (response) {
          that.templateMap = response.data.data.templateMap;
        })
      },
      updateSpace(){
        let that = this;
        // 杭州空间
        if(this.financePayInfo.protocolSpace.spaceRegional.uuid === 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af'){
          this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
        }

        // 大连空间
        if(this.financePayInfo.protocolSpace.spaceRegional.uuid === 'cbfe0f31-284f-4eff-b66c-a3e68c41cf03'){
          this.spaceSetting.uuid = "c68984c2-a3b2-45a5-b425-578d0136218a";
        }
        // 苏州空间
        if(this.financePayInfo.protocolSpace.spaceRegional.uuid === '10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c') {
          this.spaceSetting.uuid = "db4cdcc1-32b6-494f-a50a-12a16f642a6f";
        }
        this.spaceSetting.httpDetail(function () {
          that.financePayInfo.financeContact = that.spaceSetting.financeContact;
          that.financePayInfo.financePhone = that.spaceSetting.financeContactPhone;
          that.financePayInfo.financeAddress = that.spaceSetting.financeArea;
        });
      }
    },
    mounted(){
      let that = this;

      this.financePayInfo.uuid = this.$route.query.uuid;
      if (this.financePayInfo.uuid) {
        this.financePayInfo.editMode = true;
        this.financePayInfo.httpDetail(function (){
          that.financePayInfo.fetchTemplate(function (response) {
            that.templateMap = response.data.data.templateMap;

          })
        });
      }else{
        // this.financePayInfo.capitalTotal = numberCapital(this.financePayInfo.total);
        // this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
        // this.spaceSetting.httpDetail(function () {
        //   // that.financePayInfo.bank = that.spaceSetting.accountBank;
        //   // that.financePayInfo.bankName = that.spaceSetting.accountBankName;
        //   // that.financePayInfo.bankAccount = that.spaceSetting.openAccountBank;
        //   that.financePayInfo.financeContact = that.spaceSetting.financeContact;
        //   that.financePayInfo.financePhone = that.spaceSetting.financeContactPhone;
        //   that.financePayInfo.financeAddress = that.spaceSetting.financeArea;
        // });
      }


    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .pay-create {
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

<template>
  <div class="animated fadeIn office-pay-create">
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-left mt5 cursor-pointer" title="返回"  @click.stop.prevent="$router.go(-1)">
          <span><img class=" mr15" width="30" height="30" src="../../../../assets/img/return.png"/></span>
        </div>
        <div class="pull-left title">
          <span v-show="!financeOfficePay.editMode">创建会议室付款信息单</span>
          <span v-show="financeOfficePay.editMode">编辑会议室付款信息单</span>
        </div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="segmenting-line"> </div>
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
              <div class="col-md-3">会议室</div>
              <div class="col-md-9">
                <SpaceReservationSelection  :activeSpaceReservation ="financeOfficePay.spaceReservation" :initFilter="{orderCreateTime:'DESC',record:'false',status:'RECEIVE'}"></SpaceReservationSelection>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">客户名称</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.companyPrincipal" readonly="readonly"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">付款信息</div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <div class="col-md-3">付款项</div>
              <div class="col-md-9">会议室付款单</div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">应付总额</div>
              <div class="col-md-9">
                <input type="number" class="form-control" v-model="financeOfficePay.handleTotal" readonly/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">使用时间</div>
              <div class="col-md-9">
                <el-date-picker  v-model="financeOfficePay.lastTime" readonly type="datetime"></el-date-picker>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">备注</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.remarks"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt20 ml20">
      <div class="col-md-12">
        <div class="cell-subtitle">银行信息及联系人信息</div>
      </div>
    </div>

    <div class="row mt30">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div class="row">
              <div class="col-md-3">开户银行</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.bank" readonly />
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">银行户名</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.bankName" readonly/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">银行账号</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.bankAccount" readonly/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">联系人</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.financeContact" readonly/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">联系电话</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.financePhone" readonly/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-3">地址</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="financeOfficePay.financeAddress" readonly/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="btn btn-success mt20" @click="refreshTemplate">刷新付款通知书预览</div>

    <div class="row mt10">
      <div class="col-md-12">
        <div class="mail-box" style="border: 0;">
          <div class="mail-body ml15" style="border: 0;">
            <div v-html="templateMap"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-danger mt20" v-show="financeOfficePay.errorMessage">
      {{financeOfficePay.errorMessage}}
    </div>

    <div class="col-md-12">
      <NbLoadingButton :entity="financeOfficePay" :callback="save"/>
    </div>

  </div>
</template>
<script>
  import NbSlidePanel from "../../../../components/NbSlidePanel";
  import NbForm from "../../../../components/NbForm";
  import {Notification} from 'element-ui'
  import FinanceOfficePay from "../../../../common/model/finance/FinanceOfficePay";
  import SpaceReservationSelection from "../../../../view/backyard/spacereservation/Selection.vue";
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import {simpleDateTime} from "../../../../common/filter/time";
  import SpaceSetting from "../../../../common/model/spacesetting/SpaceSetting";


  export default {
    data () {
      return {
        financeOfficePay: new FinanceOfficePay(),
        templateMap:"",
        spaceSetting : new SpaceSetting()
       // httpCreate: new FinanceOfficePay().getHttpCreate()
      }
    },
    components: {
      NbSlidePanel,
      NbForm,
      SpaceReservationSelection,
      NbLoadingButton
    },
    computed: {},
    watch: {
      "financeOfficePay.spaceReservation.uuid"(){
        this.financeOfficePay.companyPrincipal = this.financeOfficePay.spaceReservation.creator.name;
        this.financeOfficePay.handleTotal = this.financeOfficePay.spaceReservation.price.slice(1);
        this.financeOfficePay.lastTime = this.financeOfficePay.spaceReservation.startTime;
        this.spaceUpdate();
      }
    },
    methods: {
      spaceUpdate(){
        let that = this;
        // 杭州空间
        if(this.financeOfficePay.spaceReservation.spaceRegional.uuid === 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af'){
          this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
          this.spaceSetting.httpDetail(function () {
            that.financeOfficePay.bank = that.spaceSetting.accountBank;
            that.financeOfficePay.bankName = that.spaceSetting.accountBankName;
            that.financeOfficePay.bankAccount = that.spaceSetting.openAccountBank;
            that.financeOfficePay.financeContact = that.spaceSetting.financeContact;
            that.financeOfficePay.financePhone = that.spaceSetting.financeContactPhone;
            that.financeOfficePay.financeAddress = that.spaceSetting.financeArea;
          });
        }

        // 大连空间
        if(this.financeOfficePay.spaceReservation.spaceRegional.uuid === 'cbfe0f31-284f-4eff-b66c-a3e68c41cf03'){
          this.spaceSetting.uuid = "c68984c2-a3b2-45a5-b425-578d0136218a";
          this.spaceSetting.httpDetail(function () {
            that.financeOfficePay.bank = that.spaceSetting.accountBank;
            that.financeOfficePay.bankName = that.spaceSetting.accountBankName;
            that.financeOfficePay.bankAccount = that.spaceSetting.openAccountBank;
            that.financeOfficePay.financeContact = that.spaceSetting.financeContact;
            that.financeOfficePay.financePhone = that.spaceSetting.financeContactPhone;
            that.financeOfficePay.financeAddress = that.spaceSetting.financeArea;
          });

        }
        // 苏州空间
        if(this.financeOfficePay.spaceReservation.spaceRegional.uuid === '10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c') {
          this.spaceSetting.uuid = "db4cdcc1-32b6-494f-a50a-12a16f642a6f";
          this.spaceSetting.httpDetail(function () {
            that.financeOfficePay.bank = that.spaceSetting.accountBank;
            that.financeOfficePay.bankName = that.spaceSetting.accountBankName;
            that.financeOfficePay.bankAccount = that.spaceSetting.openAccountBank;
            that.financeOfficePay.financeContact = that.spaceSetting.financeContact;
            that.financeOfficePay.financePhone = that.spaceSetting.financeContactPhone;
            that.financeOfficePay.financeAddress = that.spaceSetting.financeArea;
          });
        }
      },
      successCallback(res){
        let that = this;
        Notification.success({
          message: '提交成功!'
        });
        that.$router.push("/by/finance/office/pay/list");
      },
      save(){
        let that = this;
        this.financeOfficePay.httpSave(function (response) {
          Notification.success({
            message: that.financeOfficePay.editMode ? '修改成功！' : '创建成功！'
          });
          that.$router.push("/by/finance/office/pay/detail?uuid=" + that.financeOfficePay.uuid);
        });
      },
      refreshTemplate() {
        let that = this;
        this.financeOfficePay.fetchTemplate(function (response) {
            that.templateMap = response.data.data.templateMap;
          });
      }
    },
    mounted(){
      let that = this;

      this.financeOfficePay.uuid = this.$route.query.uuid;
      if (this.financeOfficePay.uuid) {
        //this.httpCreate.editMode = true;
        this.financeOfficePay.editMode = true;
        this.financeOfficePay.httpDetail(function (){
          //that.httpCreate.backFill({financeOfficePay: that.financeOfficePay});
          // that.financeOfficePay.fetchTemplate(function (response) {
          //   that.templateMap = response.data.data.templateMap;
          // });
        });
      }else{

      }
      //this.httpCreate.backFill({financeOfficePay: this.financeOfficePay});
      this.refreshTemplate();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .office-pay-create {
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

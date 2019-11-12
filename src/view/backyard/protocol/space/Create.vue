<template>
  <div class="animated fadeIn protocol-create">

    <NbLoadingFrame :loading="protocolSpace.detailLoading">
      <div class="row">

        <div class="col-xs-12">
          <div class="pull-left f24">
            <div title="返回" class="cursor-pointer"  @click.stop.prevent="$router.go(-1)">
              <span><img class="logo mr10" width="30" height="30" src="../../../../assets/img/return.png"/></span>
              <span v-show="!protocolSpace.editMode">创建租赁协议</span>
              <span v-show="protocolSpace.editMode">修改租赁协议</span>
            </div>
          </div>
        </div>

        <div class="mt30 col-md-12">
          <div class="segmenting-line"> </div>
        </div>

        <div class="mt35 ml40 col-md-12">
          <div class="cell-subtitle">基本内容 </div>
        </div>

        <div class="col-xs-12 text-right mb10" style="margin-top: -30px;">
          <div class="alert alert-danger text-center" v-show="protocolSpace.errorMessage">
            {{protocolSpace.errorMessage}}
          </div>
          <NbLoadingButton :entity="protocolSpace" :callback="save"/>
        </div>

        <div class="col-md-12">
          <div class="mail-box" style="border: 0;">
            <div class="mail-body ml15" style="border: 0;">
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">关联空间申请</label>
                <div class="col-md-9" v-if="!protocolSpace.editMode">
                  <SpaceOrderSelection :activeSpaceOrder="protocolSpace.spaceOrder" :initFilter="{status:'ACCEPT',orderCreateTime:'DESC',archive: 'false'}"></SpaceOrderSelection>
                </div>
                <div class="col-md-9" v-else>
                  {{protocolSpace.spaceOrder.applyName}}
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签约主体类型</label>
                <div class="col-md-9">
                  <select v-model="protocolSpace.mainType" class="form-control">
                    <option value="公司">公司</option>
                    <option value="个人">个人</option>
                  </select>
                </div>
              </div>

              <div v-if="isCompany">
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">公司名称:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.companyName">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">统一信用代码:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.registerNumber">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">注册地址:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.registerAddress">
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">个人姓名:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.personName">
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">身份证/护照</label>
                  <div class="col-md-9">
                    <select class="form-control" v-model="protocolSpace.idType">
                      <option value="护照">护照</option>
                      <option value="身份证">身份证</option>
                    </select>
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">身份证号/护照号码:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.idNumber">
                  </div>
                </div>

                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 compulsory">联系地址:</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" v-model="protocolSpace.registerAddress">
                  </div>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签署日期:</label>
                <div class="col-md-9">
                  <el-date-picker
                    v-model="protocolSpace.applyTime"
                    type="date"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">会员类型/产品类型:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.memberType">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签约空间名称:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.accountSpaceName">
                </div>
              </div>

              <div class="row mt10" v-if="isSeat">
                <label class="col-md-3 control-label mt5 no-compulsory">租赁方式</label>
                <div class="col-md-9">
                  <!--<input type="text" class="form-control" disabled v-model="protocolSpace.memberFeePayStyle">-->
                  <select class="form-control" v-model="protocolSpace.memberFeePayStyle">
                    <option value="小于一个月">小于一个月</option>
                    <!--30天-->
                    <option value="大于一个月">大于一个月</option>
                    <!--31天算整月-->
                    <option value="一个月">一个月</option>
                  </select>
                </div>
              </div>

              <div class="row mt10">
                <label v-if="protocolSpace.memberFeePayStyle === '小于一个月'" class="col-md-3 control-label mt5 no-compulsory">签约空间价格(单位: 元/日):</label>
                <label v-else class="col-md-3 control-label mt5 no-compulsory">签约空间价格(单位: 元/月):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.accountSpacePrice">
                </div>
              </div>

              <div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 no-compulsory">签约空间时间</label>
                  <div class="col-md-9">
                    <NbDateRange :startTime="protocolSpace.startTime"
                                 v-on:startTimeChange="protocolSpace.startTime = arguments[0]"
                                 :isDateRange="true"
                                 :endTime="protocolSpace.endTime"
                                 v-on:endTimeChange="protocolSpace.endTime = arguments[0]"></NbDateRange>
                  </div>
                </div>
              </div>

              <!--<div v-else>-->
                <!--<div class="row mt10">-->
                  <!--<label class="col-md-3 control-label mt5 compulsory">起始日:</label>-->
                  <!--<div class="col-md-9">-->
                    <!--<el-date-picker-->
                      <!--v-model="protocolSpace.startTime"-->
                      <!--type="date"-->
                      <!--:picker-options="pickerOptions0"-->
                      <!--placeholder="选择日期时间">-->
                    <!--</el-date-picker>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="row mt10">-->
                  <!--<label class="col-md-3 control-label mt5 compulsory">终止日:</label>-->
                  <!--<div class="col-md-9">-->
                    <!--<el-date-picker-->
                      <!--v-model="protocolSpace.endTime"-->
                      <!--type="month"-->
                      <!--format="yyyy-MM-dd"-->
                      <!--:picker-options="pickerOptions0"-->
                      <!--@change="changeTime"-->
                      <!--placeholder="选择日期时间">-->
                    <!--</el-date-picker>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">授权使用人数/空间容量</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.spaceCapactiy">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">总会员费(单位: 元):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.totalPrice">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">抵扣比例(单位: %):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.ratioInnoToken">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">优惠后总会员费(单位: 元):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.totalInnoToken">
                </div>
              </div>

              <div v-if="!isSeat">
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 no-compulsory">首月会员费(单位: 元):</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" disabled v-model="protocolSpace.firstMouthMemberFee">
                  </div>
                </div>
                <div class="row mt10">
                  <label class="col-md-3 control-label mt5 no-compulsory">每月会员费(单位: 元/月):</label>
                  <div class="col-md-9">
                    <input type="text" class="form-control" disabled v-model="protocolSpace.memberFee">
                  </div>
                </div>
              </div>

              <div v-else>
                <div v-if="isMonth">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">首月会员费(单位: 元):</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.firstMouthMemberFee">
                    </div>
                  </div>
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">每月会员费(单位: 元/月):</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.memberFee">
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">最后一月会员费(单位: 元):</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.lastMemberFee">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">首期会员费缴纳时间</label>
                <div class="col-md-9">
                  <el-date-picker
                    v-model="protocolSpace.firstPhaseMemberFeePayTime"
                    type="date"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">首期会员费(单位: 元):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.firstPhaseMemberFee">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">履约保证金缴纳月数</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" :disabled="protocolSpace.spaceOrder.characteristic === 'MOBILE_STATION'" v-model="protocolSpace.depositMonth">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">履约保证金金额(单位: 元):</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" disabled v-model="protocolSpace.deposit">
                </div>
              </div>
              <!--<div class="row mt10">-->
                <!--<label class="col-md-3 control-label mt5 no-compulsory">会议室使用限额(每月):</label>-->
                <!--<div class="col-md-9" style="display: flex;">-->
                  <!--总计<input style="width: 60px;margin-top: -10px;resize: none;outline: none;border: 0;border-bottom: 1px solid #ccc;" type="text" class="form-control" v-model="protocolSpace.qiaoCoin"> 个奕桥币-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="row mt10">-->
                <!--<label class="col-md-3 control-label mt5 no-compulsory">打印和复印设备使用限额(每月):</label>-->
                <!--<div class="col-md-9" style="display: flex;">-->
                  <!--总计<input style="width: 60px;margin-top: -10px;resize: none;outline: none;border: 0;border-bottom: 1px solid #ccc;" type="text" class="form-control" v-model="protocolSpace.useLimit"> 元免费额度-->
                <!--</div>-->
              <!--</div>-->
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签约会员银行户名:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.accountName">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签约会员银行账号:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.accountBankNumber">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">纳税人类型</label>
                <div class="col-md-9">
                  <select v-model="protocolSpace.taxType" class="form-control">
                    <option value="一般纳税人">一般纳税人</option>
                    <option value="小规模纳税人">小规模纳税人</option>
                  </select>
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">签约会员银行开户行:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.accountBank">
                </div>
              </div>
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">客户公司电话:</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.clientTelephone">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 no-compulsory">备注: </label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="protocolSpace.description">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="mail-box" style="border: 0;">
            <div class="mail-body ml15" style="border: 0;">
              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">运营方公司名称：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.baseName">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">甲方地址：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.baseAddress">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">联系地址：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.contactAddress">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">联系人：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.basePerson">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">电话：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.basePhone">
                    </div>
                  </div>
                </div>
              </div>

              <!--<div class="row">-->
                <!--<div class="col-md-12">-->
                  <!--<div class="row mt10">-->
                    <!--<label class="col-md-3 control-label mt5 no-compulsory">电子邮箱：</label>-->
                    <!--<div class="col-md-9">-->
                      <!--<input type="text" class="form-control" v-model="protocolSpace.baseEmail">-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">银行账户名：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.baseBankName">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">银行账号：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.baseBankNumber">
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 no-compulsory">开户银行：</label>
                    <div class="col-md-9">
                      <input type="text" class="form-control" disabled v-model="protocolSpace.baseBank">
                    </div>
                  </div>
                </div>
              </div>

              <!--<div class="row">-->
                <!--<div class="col-md-12">-->
                  <!--<div class="row mt10">-->
                    <!--<label class="col-md-3 control-label mt5 no-compulsory">备注：</label>-->
                    <!--<div class="col-md-9">-->
                      <!--<textarea type="text" rows="4" class="form-control" v-model="protocolSpace.baseDescription"  placeholder="备注"></textarea>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            </div>
          </div>
        </div>

        <div class="col-xs-12 mv10 text-right">
          <div class="alert alert-danger text-center" v-show="protocolSpace.errorMessage">
            {{protocolSpace.errorMessage}}
          </div>
          <NbLoadingButton :entity="protocolSpace" :callback="save"/>
        </div>

      </div>
    </NbLoadingFrame>

  </div>
</template>
<script>
  import ProtocolSpace from  "../../../../common/model/protocol/space/ProtocolSpace"
  import { Notification } from 'element-ui'
  import { numberCapital } from '../../../../common/filter/str'
  import {addMouthDate, reduceDate, reduceMouth, reduceFullMouth, addOneMouthDate, reduceRealDate, compareLastDay, simpleDateTime, reduceFirstDate} from '../../../../common/filter/time'
  import SpaceOrderSelection from  "../../spaceorder/Selection.vue";
  import NbSlidePanel from "../../../../components/NbSlidePanel.vue";
  import NbLoadingFrame from "../../../../components/NbLoadingFrame";
  import ChooseStationRoom from './ChooseStationOffice'
  import NbLoadingButton from "../../../../components/NbLoadingButton";
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceSeat from "../../../../common/model/space/SpaceSeat";
  import UserRole from "../../../../common/model/user/role/UserRole";
  import NbDateRange from "../../../../components/NbDateRange";
  import SpaceSetting from "../../../../common/model/spacesetting/SpaceSetting";

  export default{
    data(){
      return {
        protocolSpace: new ProtocolSpace(),
        isCompany: true,
        isSeat: true,
        isMonth: true,
        seatPager: new Pager(SpaceSeat,50),
        priceList: [],
        user: this.$store.state.user,
        userRole: new UserRole(),
        startTestTime: new Date(),
        endTestTime: new Date(),
        spaceSetting : new SpaceSetting(),
        pickerOptions0: {
          disabledDate(time) {
            // 选择今天以及今天之后的日期
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        isFirst: false,
        isFirstEndTiem: false
      }
    },
    components: {
      // TemplatePagerSelection,
      NbSlidePanel,
      NbLoadingFrame,
      ChooseStationRoom,
      NbLoadingButton,
      SpaceOrderSelection,
      NbDateRange
    },
    computed: {

    },
    watch: {
      "protocolSpace.ratioInnoToken"(newVal, oldVal) {
        if (reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) >= 0) {
          if (this.protocolSpace.spaceOrder.characteristic === "MOBILE_STATION") {
            //优惠后总会员费
            this.protocolSpace.totalInnoToken = Math.round((this.protocolSpace.totalPrice * (1 - newVal / 100)) * 100) / 100;
            if (this.protocolSpace.startTime.getDate() === 1) {
              this.protocolSpace.firstMouthMemberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - newVal / 100)) * 100) / 100);
            } else {
              this.protocolSpace.firstMouthMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceDate(addMouthDate(this.protocolSpace.startTime), this.protocolSpace.startTime)) * (1 - newVal / 100)) * 100) / 100;
            }
            this.protocolSpace.memberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - newVal / 100)) * 100) / 100);
            if (this.protocolSpace.memberFeePayStyle === "小于一个月") {
              if (this.protocolSpace.totalInnoToken) {
                this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.totalInnoToken;
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "大于一个月") {
              this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.firstMouthMemberFee;
              if (compareLastDay(this.protocolSpace.endTime)) {
                this.protocolSpace.lastMemberFee = this.protocolSpace.memberFee;
              } else {
                this.protocolSpace.lastMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceFirstDate(this.protocolSpace.endTime)) * (1 - newVal / 100)) * 100) / 100;
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "一个月") {
              this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.totalInnoToken;
            }

          } else {
            if (this.protocolSpace.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
              if (!this.isLess3M(this.protocolSpace.endTime, this.protocolSpace.startTime) || this.user.checkFeatureType("RENTING_FREEDOM")) {
                this.protocolSpace.totalInnoToken = Math.round((this.protocolSpace.totalPrice * (1 - newVal / 100)) * 100) / 100;
                if (this.protocolSpace.startTime.getDate() === 1) {
                  this.protocolSpace.firstMouthMemberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - newVal / 100)) * 100) / 100);
                } else {
                  this.protocolSpace.firstMouthMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceDate(addMouthDate(this.protocolSpace.startTime), this.protocolSpace.startTime) * (1 - newVal / 100)) * 100)) / 100;
                }
                this.protocolSpace.memberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - newVal / 100)) * 100) / 100);
                if (compareLastDay(this.protocolSpace.endTime)) {
                  this.protocolSpace.lastMemberFee = this.protocolSpace.memberFee;
                } else {
                  this.protocolSpace.lastMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceFirstDate(this.protocolSpace.endTime)) * (1 - newVal / 100)) * 100) / 100;
                }
                this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.firstMouthMemberFee;
                this.protocolSpace.deposit = Math.round((this.protocolSpace.accountSpacePrice * this.protocolSpace.depositMonth * (1 - newVal / 100) * 100) / 100);
              }
            }
          }
        } else {
          Notification.error({
            message: '起租期少于1天！'
          });
        }
      },
      "protocolSpace.spaceOrder.uuid"(newVal, oldVal) {
        if (!this.protocolSpace.editMode) {
          this.protocolSpace.ratioInnoToken = null;
          this.protocolSpace.totalInnoToken = null;
          this.protocolSpace.firstMouthMemberFee = null;
          this.protocolSpace.lastMemberFee = null;
          this.protocolSpace.totalPrice = null;
          this.protocolSpace.memberFee = null;
          this.protocolSpace.firstPhaseMemberFee = null;
          this.protocolSpace.memberFeePayStyle = null;
          this.protocolSpace.startTime = new Date();
          this.protocolSpace.endTime = new Date();
          this.protocolSpace.accountSpaceName = null;
          this.spaceUpdate();
        }
        this.protocolSpace.memberType = this.protocolSpace.spaceOrder.getCharacteristicName();
        let nameList = [];
        if (this.protocolSpace.spaceOrder.spaceOrderList) {
          this.protocolSpace.spaceOrder.spaceOrderList.forEach(space => {
            nameList.push(space.name);
          });
          this.protocolSpace.accountSpaceName = nameList;
        }
        //如果是办公桌
        if (this.protocolSpace.spaceOrder.characteristic === "MOBILE_STATION") {
          this.isSeat = true;
          this.isMonth = false;
          if (!this.protocolSpace.editMode) {
            this.protocolSpace.spaceCapactiy = this.protocolSpace.spaceOrder.spaceOrderList.length;
          }
          this.protocolSpace.accountSpacePrice = 0;
          this.protocolSpace.depositMonth = 0;
          this.protocolSpace.deposit = 0;
        } else {
          //如果是办公室
          let that = this;
          this.isSeat = false;
          this.isMonth = true;
          this.protocolSpace.accountSpacePrice = 0;
          this.protocolSpace.spaceCapactiy = 0;
          this.protocolSpace.depositMonth = 2;

          for (let i = 0; i < this.protocolSpace.spaceOrder.spaceOrderList.length; i++) {
            this.protocolSpace.spaceCapactiy += this.protocolSpace.spaceOrder.spaceOrderList[i].seatNum;
            this.seatPager.setFilterValue("spaceOfficeUuid", this.protocolSpace.spaceOrder.spaceOrderList[i].uuid);
            this.seatPager.httpFastPage(function (response) {
              if (response.data.data.data.length !== null) {
                that.priceList = [];
                response.data.data.data.forEach(data => {
                  that.priceList.push(data);
                });
                for (let i = 0; i < that.priceList.length; i++) {
                  that.protocolSpace.accountSpacePrice += that.priceList[i].month;
                }
              } else {
                return;
              }
              that.protocolSpace.deposit = Math.round((that.protocolSpace.accountSpacePrice * that.protocolSpace.depositMonth * (1 - that.protocolSpace.ratioInnoToken / 100) * 100) / 100);
            });
          }
        }
      },
      'protocolSpace.mainType' (newVal, oldVal) {
        this.isCompany = !this.isCompany;
      },
      'protocolSpace.depositMonth'() {
        if (this.protocolSpace.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
          this.protocolSpace.deposit = Math.round((this.protocolSpace.accountSpacePrice * this.protocolSpace.depositMonth * (1 - this.protocolSpace.ratioInnoToken / 100) * 100) / 100);
        }
      },
      'protocolSpace.memberFeePayStyle'(newVal, oldVal) {
        if(this.isFirst) {
          this.isFirst = false;
        } else {
          this.protocolSpace.startTime = new Date();
          this.protocolSpace.endTime = new Date();
        }
        this.protocolSpace.accountSpacePrice = 0;
        for (let i = 0; i < this.protocolSpace.spaceOrder.spaceOrderList.length; i++) {
          if (newVal !== "") {
            if (newVal === "小于一个月") {
              this.protocolSpace.accountSpacePrice += this.protocolSpace.spaceOrder.spaceOrderList[i].day;
            } else {
              this.protocolSpace.accountSpacePrice += this.protocolSpace.spaceOrder.spaceOrderList[i].month;
            }
          }
        }
        if (newVal === "大于一个月") {
          this.isMonth = true;
        } else {
          this.isMonth = false;
        }
      },
      'protocolSpace.endTime'(newVal,oldVal) {
        if(this.isFirstEndTiem) {
          this.isFirstEndTiem = false;
        } else {
          if ((reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) - 1) > 0) {
            this.startTestTime = this.protocolSpace.startTime;
            this.endTestTime = this.protocolSpace.endTime;
            this.changeTime(this.startTestTime, this.endTestTime);
          } else {
            this.errorMessage = '时间选择错误！';
            return false;
          }
        }
      }
    },
    methods: {
      spaceUpdate(){
        let that = this;
        // 杭州空间
        if(this.protocolSpace.spaceOrder.spaceRegional.uuid === 'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af'){
          this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
        }

        // 大连空间
        if(this.protocolSpace.spaceOrder.spaceRegional.uuid === 'cbfe0f31-284f-4eff-b66c-a3e68c41cf03'){
          this.spaceSetting.uuid = "c68984c2-a3b2-45a5-b425-578d0136218a";
        }
        // 苏州空间
        if(this.protocolSpace.spaceOrder.spaceRegional.uuid === '10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c') {
          this.spaceSetting.uuid = "db4cdcc1-32b6-494f-a50a-12a16f642a6f";
        }
        this.spaceSetting.httpDetail(function () {
          //公司名称
          that.protocolSpace.baseName = that.spaceSetting.contractParty;
          //联系地址 甲方地址
          that.protocolSpace.baseAddress = that.spaceSetting.partAddress;
          //财务部联系人
          that.protocolSpace.basePerson = that.spaceSetting.financeContact;
          //电话
          that.protocolSpace.basePhone = that.spaceSetting.partPhone;
          //银行户名
          that.protocolSpace.baseBankName = that.spaceSetting.accountBankName;
          //银行账号
          that.protocolSpace.baseBankNumber = that.spaceSetting.openAccountBank;
          //开户银行
          that.protocolSpace.baseBank = that.spaceSetting.accountBank;
          //联系地址
          that.protocolSpace.contactAddress = that.spaceSetting.financeArea;
        });
      },
      isLess3M(time1,time2) {
        return reduceRealDate(time1, time2) < 89;
      },
      save() {
        let that = this;
        //验证参数。
        if (!this.protocolSpace.spaceOrder.uuid) {
          this.protocolSpace.errorMessage = '空间申请必填';
          return
        }
        if (!this.protocolSpace.mainType) {
          this.errorMessage = '签约主体类型必填';
          return
        }
        if (this.protocolSpace.mainType === "公司") {
          if (!this.protocolSpace.companyName) {
            this.protocolSpace.errorMessage = '公司名称必填';
            return
          }
          if (!this.protocolSpace.registerNumber) {
            this.protocolSpace.errorMessage = '统一信用代码必填';
            return
          }
          if (!this.protocolSpace.registerAddress) {
            this.protocolSpace.errorMessage = '注册地址必填';
            return
          }
        }
        if (this.protocolSpace.mainType === '个人') {
          if (!this.protocolSpace.personName) {
            this.protocolSpace.errorMessage = '个人姓名必填';
            return
          }
          if (!this.protocolSpace.idType) {
            this.protocolSpace.errorMessage = '身份证/护照必填';
            return
          }
          if (!this.protocolSpace.idNumber) {
            this.protocolSpace.errorMessage = '身份证号码/护照号码必填';
            return
          }
          if (!this.protocolSpace.registerAddress) {
            this.protocolSpace.errorMessage = '联系地址必填';
            return
          }
        }
        if (reduceDate(this.protocolSpace.startTime, new Date()) > 60) {
          this.protocolSpace.errorMessage = '创建合同的起始日期和创建时间的间距 不能超60天！';
          return
        }
        if (!this.protocolSpace.accountName) {
          this.protocolSpace.errorMessage = '签约会员银行户名必填';
          return
        }
        if (!this.protocolSpace.accountBankNumber) {
          this.protocolSpace.errorMessage = '签约会员银行账号必填';
          return
        }
        if (!this.protocolSpace.taxType) {
          this.errorMessage = '纳税人类型必填';
          return
        }
        if (!this.protocolSpace.clientTelephone) {
          this.protocolSpace.errorMessage = '客户公司电话必填';
          return
        }
        if (reduceRealDate(this.protocolSpace.endTime, this.protocolSpace.startTime) <= 0) {
          this.protocolSpace.errorMessage = '合同开始日期和合同终止日期不能是同一天';
          return
        }
        if (reduceRealDate(this.protocolSpace.applyTime, this.protocolSpace.startTime) > 0) {
          this.protocolSpace.errorMessage = '合同签署日期不能晚于合同开始日期';
          return
        }
        if (this.protocolSpace.spaceOrder.characteristic === "MOBILE_STATION") {
          if (this.protocolSpace.memberFeePayStyle) {
            if (this.protocolSpace.memberFeePayStyle === "大于一个月") {
              //上一步赋值，这一步计算
              if (reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) < 28) {
                this.protocolSpace.errorMessage = '起租期必须大于28天！';
                return
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "一个月") {
              if (reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) < 28 || reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) > 31) {
                this.protocolSpace.errorMessage = '起租期须大于28天，小于等于31天！';
                return
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "小于一个月") {
              if (reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) > 31 || reduceDate(this.protocolSpace.endTime, this.protocolSpace.startTime) <= 1) {
                this.protocolSpace.errorMessage = '起租期不超过31天且至少大于1天！';
                return
              }
            }
          } else {
            this.protocolSpace.errorMessage = '请先选择租赁方式！';
            return
          }
        } else {
          if (this.protocolSpace.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
            if (this.isLess3M(this.protocolSpace.endTime, this.protocolSpace.startTime) && !this.user.checkFeatureType("RENTING_FREEDOM")) {
              this.protocolSpace.errorMessage = '起租期不少于3个月！';
              return
            }
          }
        }
        let form = {
          spaceOrderUuid: this.protocolSpace.spaceOrder.uuid,
          mainType: this.protocolSpace.mainType,
          taxType: this.protocolSpace.taxType,
          applyTime:simpleDateTime(this.protocolSpace.applyTime),
          memberType:this.protocolSpace.spaceOrder.characteristic,
          spaceUuids: JSON.stringify(this.spaceUuids),
          accountSpaceName:JSON.stringify(this.protocolSpace.accountSpaceName),
          accountSpacePrice:this.protocolSpace.accountSpacePrice,
          startTime:simpleDateTime(this.protocolSpace.startTime),
          endTime:simpleDateTime(this.protocolSpace.endTime),
          spaceCapactiy:this.protocolSpace.spaceCapactiy,
          totalPrice:this.protocolSpace.totalPrice,
          ratioInnoToken:this.protocolSpace.ratioInnoToken,
          totalInnoToken:this.protocolSpace.totalInnoToken,
          memberFeePayStyle:this.protocolSpace.memberFeePayStyle,
          firstMouthMemberFee:this.protocolSpace.firstMouthMemberFee,
          memberFee:this.protocolSpace.memberFee,
          lastMemberFee: this.protocolSpace.lastMemberFee,
          firstPhaseMemberFeePayTime:simpleDateTime(this.protocolSpace.firstPhaseMemberFeePayTime),
          firstPhaseMemberFee:this.protocolSpace.firstPhaseMemberFee,
          depositMonth:this.protocolSpace.depositMonth,
          deposit:this.protocolSpace.deposit,
          // qiaoCoin:this.protocolSpace.qiaoCoin,
          // useLimit:this.protocolSpace.useLimit,
          accountName:this.protocolSpace.accountName,
          accountBankNumber:this.protocolSpace.accountBankNumber,
          accountBank:this.protocolSpace.accountBank,
          description:this.protocolSpace.description,

          baseName:this.protocolSpace.baseName,
          baseAddress:this.protocolSpace.baseAddress,
          basePerson:this.protocolSpace.basePerson,
          basePhone:this.protocolSpace.basePhone,
          baseEmail:this.protocolSpace.baseEmail,
          baseBankName:this.protocolSpace.baseBankName,
          baseBankNumber:this.protocolSpace.baseBankNumber,
          baseBank:this.protocolSpace.baseBank,
          baseDescription:this.protocolSpace.baseDescription,
          clientTelephone:this.protocolSpace.clientTelephone,
          contactAddress:this.protocolSpace.contactAddress
        };
        if (!this.protocolSpace.editMode) {
          form.status = "NEW";
        } else {
          form.status = this.protocolSpace.status;
        }
        if (this.protocolSpace.uuid) {
          form.uuid = this.protocolSpace.uuid;
        }
        if (this.protocolSpace.mainType === '公司') {
          form.companyName = this.protocolSpace.companyName;
          form.registerNumber = this.protocolSpace.registerNumber;
        } else {
          if (this.protocolSpace.mainType === '个人') {
            form.personName = this.protocolSpace.personName;
            form.idType = this.protocolSpace.idType;
            form.idNumber = this.protocolSpace.idNumber;
          }
        }
        form.registerAddress = this.protocolSpace.registerAddress;
        this.protocolSpace.httpSave(form , function (response) {
          Notification.success({
            message: that.protocolSpace.editMode ? '修改租赁协议成功！' : '创建租赁协议成功！'
          });
          that.$router.push({path:'/by/protocol/space/detail/',query:{ uuid: that.protocolSpace.uuid }});
        });
      },
      fetchDetail() {
        let that = this;
        this.protocolSpace.httpDetail(function (response) {
          that.isFirst = true;
          that.isFirstEndTiem = true;
          that.protocolSpace.accountSpaceName = response.data.data.accountSpaceName;
        });
      },
      changeTime(startTime, endTime) {
        this.protocolSpace.ratioInnoToken = 0;
        this.protocolSpace.totalInnoToken = 0;
        this.protocolSpace.firstMouthMemberFee = 0;
        this.protocolSpace.memberFee = 0;
        this.protocolSpace.firstPhaseMemberFee = 0;
        this.protocolSpace.lastMemberFee = 0;
        if (this.protocolSpace.spaceOrder.characteristic === "MOBILE_STATION") {
          if (this.protocolSpace.memberFeePayStyle) {
            if (this.protocolSpace.memberFeePayStyle === "大于一个月") {
              //上一步赋值，这一步计算
              if (reduceDate(endTime, startTime) >= 28) {
                //优惠后总会员费
                if (startTime.getDate() === 1) {
                  this.protocolSpace.firstMouthMemberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100);
                } else {
                  this.protocolSpace.firstMouthMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceDate(addMouthDate(startTime), startTime)) * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;
                }
                this.protocolSpace.memberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100);
                this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.firstMouthMemberFee;
                if (compareLastDay(endTime)) {
                  this.protocolSpace.lastMemberFee = this.protocolSpace.memberFee;
                } else {
                  this.protocolSpace.lastMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceFirstDate(endTime)) * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;
                }
                // this.protocolSpace.lastMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceFirstDate(endTime)) * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;

                if (startTime.getDate() === 1) {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.memberFee * reduceFullMouth(endTime, startTime) + this.protocolSpace.lastMemberFee) * 100) / 100;
                } else {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.firstMouthMemberFee + this.protocolSpace.memberFee * reduceFullMouth(this.protocolSpace.endTime, this.protocolSpace.startTime) + this.protocolSpace.lastMemberFee) * 100) / 100;
                }
                this.protocolSpace.totalInnoToken = Math.round((this.protocolSpace.totalPrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;

              } else {
                this.protocolSpace.totalPrice = null;
                startTime = new Date();
                endTime = new Date();
                this.protocolSpace.startTime = new Date();
                this.protocolSpace.endTime = new Date();
                Notification.error({
                  message: '起租期必须大于28天！'
                });
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "一个月") {
              if (reduceDate(endTime, startTime) >= 28 && reduceDate(endTime, startTime) <= 31) {
                //优惠后总会员费
                this.protocolSpace.accountSpacePrice = 0;
                for (let i = 0; i < this.protocolSpace.spaceOrder.spaceOrderList.length; i++) {
                  this.protocolSpace.accountSpacePrice += this.protocolSpace.spaceOrder.spaceOrderList[i].month;
                }
                this.protocolSpace.totalPrice = this.protocolSpace.accountSpacePrice;
                this.protocolSpace.totalInnoToken = Math.round((this.protocolSpace.totalPrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;

                this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.totalInnoToken;
              } else {
                this.protocolSpace.totalPrice = 0;
                this.protocolSpace.startTime = new Date();
                this.protocolSpace.endTime = new Date();
                startTime = new Date();
                endTime = new Date();
                Notification.error({
                  message: '起租期须大于28天，小于等于31天！'
                });
              }
            }
            if (this.protocolSpace.memberFeePayStyle === "小于一个月") {
              if (reduceDate(endTime, startTime) <= 31) {
                this.protocolSpace.totalPrice = Math.round((this.protocolSpace.accountSpacePrice * (reduceDate(endTime, startTime))) * 100) / 100;

                this.protocolSpace.totalInnoToken = Math.round((this.protocolSpace.totalPrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;
                if (this.protocolSpace.totalInnoToken) {
                  this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.totalInnoToken;
                }
              } else {
                this.protocolSpace.totalPrice = null;
                startTime = new Date();
                endTime = new Date();
                this.protocolSpace.startTime = new Date();
                this.protocolSpace.endTime = new Date();
                Notification.error({
                  message: '起租期不超过31天！'
                });
              }
            }
          } else {
            startTime = new Date();
            endTime = new Date();
            this.protocolSpace.startTime = new Date();
            this.protocolSpace.endTime = new Date();
            this.protocolSpace.totalPrice = null;
            Notification.error({
              message: '请先选择租赁方式！'
            });
          }
        } else {
          if (this.protocolSpace.spaceOrder.characteristic === "INDEPENDENT_SPACE") {
            if (!this.isLess3M(this.protocolSpace.endTime, this.protocolSpace.startTime) || this.user.checkFeatureType("RENTING_FREEDOM")) {
              if (this.protocolSpace.startTime.getDate() === 1) {
                this.protocolSpace.firstMouthMemberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100);
              } else {
                this.protocolSpace.firstMouthMemberFee = Math.round(((((this.protocolSpace.accountSpacePrice * 12) / 365) * reduceDate(addMouthDate(this.protocolSpace.startTime), this.protocolSpace.startTime)) * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100;
              }
              this.protocolSpace.firstPhaseMemberFee = this.protocolSpace.firstMouthMemberFee;
              this.protocolSpace.memberFee = Math.round(((this.protocolSpace.accountSpacePrice * (1 - this.protocolSpace.ratioInnoToken / 100)) * 100) / 100);
              if (!compareLastDay(endTime)) {
                this.protocolSpace.lastMemberFee =  Math.round(((this.protocolSpace.accountSpacePrice * 12) / 365) * this.protocolSpace.endTime.getDate() * (1 - this.protocolSpace.ratioInnoToken / 100) * 100) / 100;
                if (startTime.getDate() === 1) {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.memberFee * reduceMouth(this.protocolSpace.endTime, this.protocolSpace.startTime, true) + this.protocolSpace.lastMemberFee) * 100) / 100;
                } else {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.firstMouthMemberFee + this.protocolSpace.memberFee * reduceMouth(this.protocolSpace.endTime, this.protocolSpace.startTime, true) + this.protocolSpace.lastMemberFee) * 100) / 100;
                }
              } else {
                this.protocolSpace.lastMemberFee = this.protocolSpace.memberFee;
                if (this.protocolSpace.startTime.getDate() === 1) {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.firstMouthMemberFee + this.protocolSpace.memberFee * reduceMouth(this.protocolSpace.endTime, this.protocolSpace.startTime, true)) * 100) / 100;
                } else {
                  this.protocolSpace.totalPrice = Math.round((this.protocolSpace.firstMouthMemberFee + this.protocolSpace.memberFee * (reduceMouth(this.protocolSpace.endTime, this.protocolSpace.startTime, true) + 1)) * 100) / 100;
                }
              }
              this.protocolSpace.totalInnoToken = this.protocolSpace.totalPrice;

            } else {
              this.protocolSpace.startTime = new Date();
              this.protocolSpace.endTime = new Date();
              this.protocolSpace.totalPrice = null;
              Notification.error({
                message: '起租期不少于3个月！'
              });
            }
          }
        }
      }
    },
    mounted(){
      let that = this;

      this.protocolSpace.uuid = this.$store.state.route.query.uuid;
      if (this.protocolSpace.uuid) {
        this.protocolSpace.editMode = true;
        this.fetchDetail();
      } else{
        // this.spaceSetting.uuid = "d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
        // this.spaceSetting.httpDetail(function () {
        //   //公司名称
        //   that.protocolSpace.baseName = that.spaceSetting.contractParty;
        //   //联系地址 甲方地址
        //   that.protocolSpace.baseAddress = that.spaceSetting.partAddress;
        //   //财务部联系人
        //   that.protocolSpace.basePerson = that.spaceSetting.financeContact;
        //   //电话
        //   that.protocolSpace.basePhone = that.spaceSetting.partPhone;
        //   //银行户名
        //   that.protocolSpace.baseBankName = that.spaceSetting.accountBankName;
        //   //银行账号
        //   that.protocolSpace.baseBankNumber = that.spaceSetting.openAccountBank;
        //   //开户银行
        //   that.protocolSpace.baseBank = that.spaceSetting.accountBank;
        //   //联系地址
        //   that.protocolSpace.contactAddress = that.spaceSetting.financeArea;
        // });
      }


      if(this.$store.state.debug) {
        this.protocolSpace.companyName = "合同公司名称-" + this.$store.state.user.name;
        this.protocolSpace.registerNumber = "DXXXX(统一信用代码)";
        this.protocolSpace.registerAddress = "注册地址/联系地址";

        this.protocolSpace.personName = "个人姓名" + this.$store.state.user.name;
        this.protocolSpace.idType = "身份证";
        this.protocolSpace.idNumber = "450xxx(身份证)";

        this.protocolSpace.accountName = "签约户名(签约银行户名)";
        this.protocolSpace.accountBankNumber = "450xxx(签约银行账号)";
        this.protocolSpace.accountBank = "签约银行(签约银行开户行)";
        this.protocolSpace.clientTelephone = "186xxxxx(客户公司电话)";


        this.protocolSpace.description = "此为测试合同，测试10/20";
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .protocol-create {
    padding: 20px 100px 0 30px;
  }
</style>

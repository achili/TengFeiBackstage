import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date,simpleMinute} from "../../filter/time";
import ProtocolSpace from "../protocol/space/ProtocolSpace";
import ProtocolCompany from "../protocol/company/ProtocolCompany";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  FINISH:'FINISH',
  PAYING:'PAYING',
  REFUND:'REFUND'
};
let StatusMap = {
  FINISH:{
    value: "FINISH",
    name:"已完成",
    style: "#84e599"
  },
  PAYING:{
    value: "PAYING",
    name:"缴费中",
    style: "#ffdc6f"
  },
  REFUND:{
    value: "REFUND",
    name:"已退款",
    style: "#ffdc6f"
  }
};
let Type = {
  MONTH: "MONTH",
  DAY:"DAY"
};
let TypeMap = {
  MONTH:{
    value: "MONTH",
    name:"按月计算"
  },
  DAY:{
    value: "DAY",
    name:"按天计算"
  }
};
export default class FinancePayInfo extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    //租赁合同
    this.protocolSpace = new ProtocolSpace();
    //
    this.no = null;
    this.name = null;
    //合同编号
    this.contractNo = null;
    this.companyPrincipal = null;
    this.reportingTime = new Date();
    this.memberFirstFee = 0;
    this.membershipFee = 0;
    this.performanceBond = 0;
    this.performanceBondStartTime = new Date();
    this.performanceBondEndTime = new Date();
    this.payStartTime = new Date();
    this.payEndTime = new Date();
    this.lastTime = new Date();
    this.memberFeePay = 0;
    this.lateFee = 0;
    this.total = 0;
    this.capitalTotal = null;
    this.bank = null;
    this.bankName = null;
    this.bankAccount = null;
    this.financeContact = null;
    this.financePhone = null;
    this.financeAddress = null;

    //履约保证金已付
    this.depositPaid = 0;
    //租金已付
    this.rentalPaid = 0;
    //应付余额。
    this.remainTotal = 0;

    this.status = Status.PAYING;
    //归档
    this.archive = false;

    //
    this.payEmail = null;
    this.payApp = null;
    this.paySMS = null;
    this.payPressEmail = null;

    this.templateMap = null;

    //履约保证金已付
    this.depositPaid = null;
    //租金已付
    this.rentalPaid = null;
    //滞纳金已付
    this.lateFeePaid = null;
    //应付余额。
    this.remainTotal = null;
    //已付余额
    this.alreadyPay = null;

    //超额 总计
    this.excessTotal = null;
    //超额 履约金
    this.excessDeposit = null;
    //超额 滞纳金
    this.excessLateFee = null;
    //超额 租金
    this.excessRental = null;

    this.protocolCompany = new ProtocolCompany();

    //代收
    this.notDeposit = null; //待收履约保证金
    this.notRental = null; //待收租金

    //已抵扣租金
    this.deductibleRent = null;
    //已收履约保证金
    this.deductibleDeposit = null;
    //已收滞纳金
    this.deductibleLateFee = null;

    this.isClearZero = false
  }

  getTAG() {
    return "FinancePayInfo"
  }

  static URL_ARCHIVE = "/finance/office/pay/archive";
  static URL_REMINDER = "/finance/pay/info/reminder";
  static URL_SEND = "/finance/pay/info/send";
  static URL_SEARCH = "/finance/pay/info/search";
  static URL_RENDER_PDF = "/finance/pay/info/render";
  static URL_RENDER_EMAIL = "/finance/pay/info/render/email";
  static URL_BATCH = "/finance/pay/info/batch";
  static URL_CLEAR = "/finance/pay/info/clear";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
      new Filter(Filter.prototype.Type.CHECK,"已有收款记录",'receipts'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('protocolSpace', ProtocolSpace);
    this.renderEntity('reportingTime', Date);
    this.renderEntity('performanceBondStartTime', Date);
    this.renderEntity('performanceBondEndTime', Date);
    this.renderEntity('payStartTime', Date);
    this.renderEntity('payEndTime', Date);
    this.renderEntity('lastTime', Date);
    this.renderEntity('protocolCompany', ProtocolCompany);
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      protocolSpace: this.protocolSpace.uuid,
      name: this.name,
      no:this.no,
      contractNo:this.contractNo,
      companyPrincipal: this.companyPrincipal,
      reportingTime:simpleDateTime(this.reportingTime),
      memberFirstFee:this.memberFirstFee,
      membershipFee: this.membershipFee,
      performanceBond: this.performanceBond,
      performanceBondStartTime:simpleDateTime(this.performanceBondStartTime),
      performanceBondEndTime:simpleDateTime(this.performanceBondEndTime),
      payStartTime:simpleDateTime(this.payStartTime),
      payEndTime: simpleDateTime(this.payEndTime),
      lastTime: simpleDateTime(this.lastTime),
      memberFeePay: this.memberFeePay,
      lateFee: this.lateFee,
      total: this.total,
      capitalTotal: this.capitalTotal,
      bank: this.bank,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      financeContact: this.financeContact,
      financePhone: this.financePhone,
      financeAddress: this.financeAddress,
      excessTotal: this.excessTotal,
      excessDeposit: this.excessDeposit,
      excessLateFee: this.excessLateFee,
      excessRental: this.excessRental,
      depositPaid:this.depositPaid,
      rentalPaid:this.rentalPaid,
      lateFeePaid:this.lateFeePaid,
      remainTotal:this.remainTotal,
      alreadyPay:this.alreadyPay
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/finance/pay/info/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "financePayInfo.uuid"),
        //new FormItem(FormItem.prototype.Type.SPACE_BUILDING_SELECTION, "关联合同",true, "spaceBuilding", "spaceOffice.spaceBuilding", new SpaceBuilding(),{  },FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "合同编号",true, "contractNo", "financePayInfo.contractNo", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "公司负责人",true, "companyPrincipal", "financePayInfo.companyPrincipal", null,{}),
        new FormItem(FormItem.prototype.Type.SELECT,"按月计算",true,"type","financePayInfo.type",null,{list:FinancePayInfo.prototype.TypeList}),
        new FormItem(FormItem.prototype.Type.NUMBER, "租金收款月数",true, "month", "financePayInfo.month", null,{max:99}),
        new FormItem(FormItem.prototype.Type.DATE, "合同签约时间", true, "contractSigningTime", "financePayInfo.contractSigningTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "租金起算时间", true, "rentTime", "financePayInfo.rentTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.NUMBER, "保证履约金",true, "performanceBond", "financePayInfo.performanceBond", null,{max:99}),
        new FormItem(FormItem.prototype.Type.DATE, "保证履约金时间范围", true, "performanceBondStartTime", "financePayInfo.performanceBondStartTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE,"保证履约金时间范围", true, "performanceBondEndTime", "financePayInfo.performanceBondEndTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.NUMBER, "租金/月",true, "rent", "financePayInfo.rent", null,{max:99}),
        new FormItem(FormItem.prototype.Type.DATE, "租金起算范围", true, "rentStartTime", "financePayInfo.rentStartTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE,"租金起算范围", true, "rentEndTime", "financePayInfo.rentEndTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.NUMBER, "一个月租金",true, "monthRent", "financePayInfo.monthRent", null,{max:99}),
        new FormItem(FormItem.prototype.Type.NUMBER, "折扣金额",true, "discountAmount", "financePayInfo.discountAmount", null,{max:99}),

        new FormItem(FormItem.prototype.Type.NUMBER, "合计",true, "total", "financePayInfo.total", null,{max:99}),
        new FormItem(FormItem.prototype.Type.INPUT, "大写合计",true, "capitalTotal", "financePayInfo.capitalTotal", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "开户银行",true, "bank", "financePayInfo.bank", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "银行户名",true, "bankName", "financePayInfo.bankName", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "银行账户", false, "bankAccount", "financePayInfo.bankAccount", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部联系人",true, "financeContact", "financePayInfo.financeContact", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部电话",true, "financePhone", "financePayInfo.financePhone", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部地址", false, "financeAddress", "financePayInfo.financeAddress", null,{})
      ]
    );
  };

  validate(){
    if(!this.protocolSpace.uuid){
      this.errorMessage = '请选择一个租赁合同！';
      return
    }
    if(!this.lastTime){
      this.errorMessage = '付款最晚时间必填';
      return
    }
    if(!this.bank){
      this.errorMessage = '开户银行';
      return
    }
    if(!this.bankName){
      this.errorMessage = '银行户名';
      return
    }
    if(!this.bankAccount){
      this.errorMessage = '银行账号';
      return
    }
    if(!this.financeContact){
      this.errorMessage = '财务部联系人';
      return
    }
    if(!this.financePhone){
      this.errorMessage = '财务部电话';
      return
    }
    if(!this.financeAddress){
      this.errorMessage = '财务部地址';
      return
    }
    this.errorMessage = null;
    return true
  }

  httpArchive(reason, successCallback, failureCallback){
    let that = this;
    let form = {
      uuid: this.uuid,
      archive: !this.archive,
      reason: reason
    };
    this.httpPost(FinancePayInfo.URL_ARCHIVE,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, failureCallback)
  }

  httpReminder(uuIds, successCallback, failureCallback){
    let that = this;
    if (uuIds instanceof Array) {
      this.httpPost(FinancePayInfo.URL_REMINDER, {"uuIds": uuIds.join(",")}, successCallback, failureCallback);
    } else {
      this.errorMessage = "uuId格式不正确";
    }
  }

  //发送邮件
  httpSend(name,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,mailPressContent,messageEnable,
           messageSubject,messageContent,smsEnable,smsPhone,smsContent,mode,successCallback,errorCallback){
    let that = this;
    this.httpPost(FinancePayInfo.URL_SEND,{ "uuid":this.uuid , name ,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,"mailPressContent":mailPressContent,messageEnable,messageSubject,messageContent,smsEnable,smsPhone,smsContent,mode }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpSearch(protocolSpaceUuid,successCallback, failureCallback){
    let that = this;
    this.httpPost(FinancePayInfo.URL_SEARCH,{protocolSpaceUuid}, function (response) {
      successCallback && successCallback(response);
    }, failureCallback)
  }

  //批量创建付款单
  httpBatch(selectTime,spaceRegionalUuid,successCallback, failureCallback){
    let that = this;
    this.httpPost(FinancePayInfo.URL_BATCH,{ "selectTime":simpleDateTime(selectTime),"spaceRegionalUuid":spaceRegionalUuid }, function (response) {
      successCallback && successCallback(response);
    }, failureCallback)
  }

  fetchTemplate (successCallback, errorCallback) {
    this.httpPost(FinancePayInfo.URL_RENDER_PDF, this.getFrom(), function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  //渲染邮件
  renderEmail(mode,successCallback, errorCallback) {
    this.httpPost(FinancePayInfo.URL_RENDER_EMAIL, { "uuid":this.uuid,mode }, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  //滞纳金清零
  httpClearZero( successCallback, failureCallback){
    let that = this;
    let form = {
      uuid: this.uuid,
      isClearZero: !this.isClearZero
    };
    this.httpPost(FinancePayInfo.URL_CLEAR,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response)
    }, failureCallback)
  }


  getFrom() {
    let form = {
      protocolSpace: this.protocolSpace.uuid,
      name: this.name,
      no:this.no,
      contractNo:this.contractNo,
      companyPrincipal: this.companyPrincipal,
      reportingTime:simpleDateTime(this.reportingTime),
      memberFirstFee:this.memberFirstFee,
      membershipFee: this.membershipFee,
      performanceBond: this.performanceBond,
      performanceBondStartTime:simpleDateTime(this.performanceBondStartTime),
      performanceBondEndTime:simpleDateTime(this.performanceBondEndTime),
      payStartTime:simpleDateTime(this.payStartTime),
      payEndTime: simpleDateTime(this.payEndTime),
      lastTime: simpleDateTime(this.lastTime),
      memberFeePay: this.memberFeePay,
      lateFee: this.lateFee,
      total: this.total,
      capitalTotal: this.capitalTotal,
      bank: this.bank,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      financeContact: this.financeContact,
      financePhone: this.financePhone,
      financeAddress: this.financeAddress,
      excessTotal: this.excessTotal,
      excessDeposit: this.excessDeposit,
      excessLateFee: this.excessLateFee,
      excessRental: this.excessRental,
      depositPaid:this.depositPaid,
      rentalPaid:this.rentalPaid,
      lateFeePaid:this.lateFeePaid,
      remainTotal:this.remainTotal,
      alreadyPay:this.alreadyPay
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

}
FinancePayInfo.registerEnum("Type", TypeMap);
FinancePayInfo.prototype.Status = Status;
FinancePayInfo.prototype.StatusMap = StatusMap;
FinancePayInfo.prototype.StatusList = FinancePayInfo.prototype.getStatusList();

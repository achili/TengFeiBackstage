import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date,simpleMinute} from "../../filter/time";
import SpaceReservation from "../spacereservation/SpaceReservation";
import Vue from 'vue'
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  FINISH:'FINISH',
  PAYING:'PAYING',
  REFUND:'REFUND',
  CANCEL:'CANCEL'
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
  },
  CANCEL:{
    value: "CANCEL",
    name:"已取消",
    style: "#ffdc6f"
  }
};

export default class FinanceOfficePay extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    //会议室 预定
    this.spaceReservation = new SpaceReservation();
    this.no = null;
    this.companyPrincipal = null;
    this.handleTotal = null;
    this.lastTime = new Date();
    this.remarks = null;
    this.bank = null;
    this.bankName = null;
    this.bankAccount = null;
    this.financeContact = null;
    this.financePhone = null;
    this.financeAddress = null;

    this.status = Status.PAYING;
    //归档
    this.archive = false;
    this.amountPaid = 0;
    this.amountPayable = null;

    //
    this.list = [];

    //
    this.officePayEmail = null;
    this.officePaySMS = null;
    this.officePayAPP = null;

    this.templateMap = null;

    this.amountPayable = null;
  }

  getTAG() {
    return "FinanceOfficePay"
  }

  static URL_ARCHIVE = "/finance/office/pay/archive";
  static URL_SEND = "/finance/office/pay/send";
  static URL_NOTIFY = "/finance/office/pay/notify";
  static URL_SEND_MESSAGE = "/finance/office/pay/sendMessage";
  static URL_DOWNLOAD_PDF = "/finance/office/pay/download/pdf/{uuid}";
  static URL_RENDER_PDF = "/finance/office/pay/render";
  static URL_RENDER_EMAIL = "/finance/office/pay/render/email";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
      new Filter(Filter.prototype.Type.CHECK,"已有收款记录",'record'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('spaceReservation', SpaceReservation);
    this.renderEntity('lastTime', Date);
   // this.officePayEmail = JSON.stringify(this.officePayEmail)
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/finance/office/pay/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "financeOfficePay.uuid"),
        new FormItem(FormItem.prototype.Type.SPACE_RESERVATION_SELECTION, "会议室订单",true, "spaceReservation", "financeOfficePay.spaceReservation", new SpaceReservation(),{  },FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "公司负责人",true, "companyPrincipal", "financeOfficePay.companyPrincipal", null,{}),
        new FormItem(FormItem.prototype.Type.NUMBER, "应付总额",true, "handleTotal", "financeOfficePay.handleTotal", null,{max:999999999}),
        new FormItem(FormItem.prototype.Type.DATE, "最后落款时间", true, "lastTime", "financeOfficePay.lastTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "备注",true, "remarks", "financeOfficePay.remarks", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "开户银行",true, "bank", "financeOfficePay.bank", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "银行户名",true, "bankName", "financeOfficePay.bankName", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "银行账户", true, "bankAccount", "financeOfficePay.bankAccount", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部联系人",true, "financeContact", "financeOfficePay.financeContact", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部电话",true, "financePhone", "financeOfficePay.financePhone", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "财务部地址", true, "financeAddress", "financeOfficePay.financeAddress", null,{})

      ]
    );
  };

  validate(){
    if(!this.spaceReservation.uuid){
      this.errorMessage = '会议室订单必填';
      return
    }
    if(!this.handleTotal){
      this.errorMessage = '应付总额';
      return
    }
    if(!this.lastTime){
      this.errorMessage = '付款时间';
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

  downloadPdfUrl(){
    return Vue.http.options.root + FinanceOfficePay.URL_DOWNLOAD_PDF.replace("{uuid}", this.uuid);
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      spaceReservation: this.spaceReservation.uuid,
      companyPrincipal: this.companyPrincipal,
      handleTotal: this.handleTotal,
      lastTime: simpleDateTime(this.lastTime),
      bank: this.bank,
      remarks: this.remarks,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      financeContact: this.financeContact,
      financePhone: this.financePhone,
      financeAddress: this.financeAddress,
      amountPayable:this.amountPayable,
      amountPaid: this.amountPaid

    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  httpArchive(reason, successCallback, failureCallback){
    let that = this;
    let form = {
      uuid: this.uuid,
      archive: !this.archive,
      reason: reason
    };
    console.log(this.archive)
    this.httpPost(FinanceOfficePay.URL_ARCHIVE,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, failureCallback)
  }

  httpSend(name,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,messageEnable,
           messageSubject,messageContent,smsEnable,smsPhone,smsContent,typess,successCallback,errorCallback){
    let that = this;
    this.httpPost(FinanceOfficePay.URL_SEND,{ "uuid":this.uuid , name ,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,messageEnable,messageSubject,messageContent,smsEnable,smsPhone,smsContent,typess }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpNotify(successCallback,errorCallback){
    let that = this;
    this.httpPost(FinanceOfficePay.URL_NOTIFY,{ "uuid":this.uuid }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  fetchTemplate (successCallback, errorCallback) {
    this.httpPost(FinanceOfficePay.URL_RENDER_PDF, this.getFrom(), function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  renderEmail(successCallback, errorCallback) {
    this.httpPost(FinanceOfficePay.URL_RENDER_EMAIL, { "uuid":this.uuid }, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  getFrom() {
    let form = {
      spaceReservation: this.spaceReservation.uuid,
      companyPrincipal: this.companyPrincipal,
      handleTotal: this.handleTotal,
      lastTime: simpleDateTime(this.lastTime),
      bank: this.bank,
      remarks: this.remarks,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      financeContact: this.financeContact,
      financePhone: this.financePhone,
      financeAddress: this.financeAddress,
      amountPayable:this.amountPayable,
      amountPaid: this.amountPaid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

}
FinanceOfficePay.prototype.Status = Status;
FinanceOfficePay.prototype.StatusMap = StatusMap;
FinanceOfficePay.prototype.StatusList = FinanceOfficePay.prototype.getStatusList();

import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date,simpleMinute} from "../../filter/time";
import SpaceReservation from "../spacereservation/SpaceReservation";
import FinancePayInfo from "./FinancePayInfo";
import FinanceOfficePay from "./FinanceOfficePay";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  FINISH:'FINISH',
  PAYING:'PAYING'
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
  }
};

export default class FinanceHedgingPay extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.financePayInfo = new FinancePayInfo();
    this.financeOfficePay = new FinanceOfficePay();
    this.no = null;
    this.companyName = null;
    this.payTotal = null;
    this.payTime = new Date();
    this.remarks = null;
    this.bank = null;
    this.bankName = null;
    this.bankAccount = null;
    this.contacts = null;
    this.phone = null;
    this.address = null;
    this.status = Status.PAYING;
    this.receivingMoney = null;

  }

  getTAG() {
    return "FinanceHedgingPay"
  }
  static URL_RENDER_PDF = "/finance/hedging/pay/render";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('financePayInfo', FinancePayInfo);
    this.renderEntity('financeOfficePay', FinanceOfficePay);
    this.renderEntity('payTime', Date);
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
    if(!this.financeOfficePay.uuid && !this.financePayInfo.uuid){
      this.errorMessage = '付款项目必填';
      return
    }
    if(!this.companyName){
      this.errorMessage = '公司或负责人必填';
      return
    }
    if(!this.payTotal){
      this.errorMessage = '应付总额必填';
      return
    }
    if(!this.payTime){
      this.errorMessage = '付款时间必选';
      return
    }
    if(!this.bank){
      this.errorMessage = '开户银行必填';
      return
    }
    if(!this.bankName){
      this.errorMessage = '银行户名必填';
      return
    }
    if(!this.bankAccount){
      this.errorMessage = '银行账号必填';
      return
    }
    if(!this.contacts){
      this.errorMessage = '财务部联系人必填';
      return
    }
    if(!this.phone){
      this.errorMessage = '财务部电话必填';
      return
    }
    if(!this.address){
      this.errorMessage = '财务部地址必填';
      return
    }
    if(!this.remarks){
      this.errorMessage = '备注必填';
      return
    }
    this.errorMessage = null;
    return true
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      financeOfficePay: this.financeOfficePay.uuid,
      financePayInfo: this.financePayInfo.uuid,
      companyName: this.companyName,
      payTotal: this.payTotal,
      payTime: simpleDateTime(this.payTime),
      bank: this.bank,
      remarks: this.remarks,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      contacts: this.contacts,
      phone: this.phone,
      address: this.address

    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }
  getForm(){
    let form = {
      financeOfficePay: this.financeOfficePay.uuid,
      financePayInfo: this.financePayInfo.uuid,
      companyName: this.companyName,
      payTotal: this.payTotal,
      payTime: simpleDateTime(this.payTime),
      bank: this.bank,
      remarks: this.remarks,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      contacts: this.contacts,
      phone: this.phone,
      address: this.address
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

  fetchTemplate (successCallback, errorCallback) {
    this.httpPost(FinanceHedgingPay.URL_RENDER_PDF, this.getForm(), function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }




}
FinanceHedgingPay.prototype.Status = Status;
FinanceHedgingPay.prototype.StatusMap = StatusMap;
FinanceHedgingPay.prototype.StatusList = FinanceHedgingPay.prototype.getStatusList();

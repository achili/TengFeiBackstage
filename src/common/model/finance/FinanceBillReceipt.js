import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import {simpleDateTime, str2Date,simpleMinute} from "../../filter/time";
import FinanceOfficePay from "./FinanceOfficePay";
import FinancePayInfo from "./FinancePayInfo";
import SpaceReservation from "../spacereservation/SpaceReservation";
import Tank from "../tank/Tank";
import ProtocolSpace from "../protocol/space/ProtocolSpace";

let Status = {
  WAIT:'WAIT',
  CONFIRMATION:'CONFIRMATION',
  REFUNDED:'REFUNDED',
  CANCEL:"CANCEL"
};
let StatusMap = {
  WAIT:{
    value: "WAIT",
    name:"等待支付",
    style: "#84e599"
  },
  CONFIRMATION:{
    value: "CONFIRMATION",
    name:"已确认支付",
    style: "#ff9a9a"
  },
  REFUNDED:{
    value: "REFUNDED",
    name:"已退款",
    style: "#ff9a9a"
  },
  CANCEL:{
    value: "CANCEL",
    name:"已取消",
    style: "#ff9a9a"
  }

};
let Category = {
  ROOM: "ROOM",
  OTHER: "OTHER",
  DEPOSIT: "DEPOSIT",
  RENTAL: "RENTAL",
  LATE_FEE:"LATE_FEE"
};

let CategoryMap = {
    ROOM: {
    name: "会议室",
    value: "ROOM",
    style: "info"
  },
  DEPOSIT: {
    name: "履约保证金",
    value: "DEPOSIT",
    style: "success"
  },
  RENTAL: {
    name: "租金",
    value: "RENTAL",
    style: "primary"
  },
  LATE_FEE: {
    name: "滞纳金",
    value: "LATE_FEE",
    style: "danger"
  },
  OTHER: {
    name: "其他",
    value: "OTHER",
    style: "warning"
  }
};

let Type = {
  UNKNOWN:"UNKNOWN",
  //银行转账
  BANK: "BANK",
  //支付宝 微信
  ALIPAY_WECHAT: "ALIPAY_WECHAT",
  //POS银行卡
  POS: "POS",
  APP_ALIPAY: "APP_ALIPAY",
  APP_WECHAT:"APP_WECHAT",
  APP_BANK:"APP_BANK",
  WEB_BANK:"WEB_BANK",
  WEB_ALIPAY:"WEB_ALIPAY",
  WEB_WECHAT:"WEB_WECHAT",
  MAIL_BANK:"MAIL_BANK",
  MAIL_COMPANY_BANK:"MAIL_COMPANY_BANK",
  MAIL_ALIPAY:"MAIL_ALIPAY",
  MAIL_WECHAT:"MAIL_WECHAT"
};

let TypeMap = {
  UNKNOWN: {
    name: "无支付方式",
    value: "UNKNOWN",
    style: "#84e599"
  },
  BANK: {
    name: "银行转账",
    value: "BANK",
    style: "#84e599"
  },
  POS: {
    name: "POS银行卡",
    value: "POS",
    style: "#84e599"
  },
  ALIPAY_WECHAT: {
    name: "支付宝微信",
    value: "ALIPAY_WECHAT",
    style: "#84e599"
  },
  APP_ALIPAY: {
    name: "支付宝支付",
    value: "APP_ALIPAY",
    style: "#84e599"
  },
  APP_WECHAT: {
    name: "微信支付",
    value: "APP_WECHAT",
    style: "#84e599"
  },
  APP_BANK: {
    name: "银行卡支付",
    value: "APP_BANK",
    style: "#84e599"
  },
  WEB_BANK: {
    name: "POS通银行卡支付",
    value: "WEB_BANK",
    style: "#84e599"
  },
  WEB_ALIPAY: {
    name: "POS通支付宝支付",
    value: "WEB_ALIPAY",
    style: "#84e599"
  },
  WEB_WECHAT: {
    name: "POS通微信支付",
    value: "WEB_WECHAT",
    style: "#84e599"
  },
  MAIL_BANK: {
    name: "邮件个人网银",
    value: "MAIL_BANK",
    style: "#84e599"
  },
  MAIL_COMPANY_BANK: {
    name: "邮件企业网银",
    value: "MAIL_COMPANY_BANK",
    style: "#84e599"
  },
  MAIL_ALIPAY: {
    name: "邮件支付宝",
    value: "MAIL_ALIPAY",
    style: "#84e599"
  },
  MAIL_WECHAT: {
    name: "邮件银微信",
    value: "MAIL_WECHAT",
    style: "#84e599"
  }
};

export default class FinanceBillReceipt extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.operator = new User();
    //会议室 预定
    this.spaceReservation = new SpaceReservation();
    this.financePayInfo = new FinancePayInfo();
    this.financeOfficePay = new FinanceOfficePay();
    this.protocolSpace = new ProtocolSpace();
    //
    this.no = null;
    this.name = null;
    this.protocolNo = null;
    this.companyName = null;
    this.receiveTime = new Date();
    this.amount = 0;

    this.partyABank = null;
    this.partyABankAccount = null;
    this.partyABankNo = null;
    this.partyBBank = null;
    this.partyBBankAccount = null;
    this.partyBBankNo = null;
    this.remark = null;
//
    this.category = Category.DEPOSIT;
    this.type = Type.BANK;
    this.status = Status.WAIT;

    this.poster = new Tank('.jpg|.jpeg|.png|.pdf|.PDF|.JPG|.JPEG|.PNG', false, 1024 * 1024 * 5, '大小不能超过5M');
    this.posterUrl = null;
    this.paymentNo = null;
  }

  getTAG() {
    return "FinanceBillReceipt"
  }

  static URL_STATUS = "/finance/bill/receipt/status";
  static URL_OFFICE_POS_REFUND = "/finance/bill/receipt/office/pos/refund";
  static URL_POS_REFUND = "/finance/bill/receipt/pos/refund";
  static URL_POS_TEST = "/finance/bill/receipt/pos/test";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '付款信息单编号', 'orderNo'),
      new Filter(Filter.prototype.Type.SELECTION, '类型', 'type',this.getTypeList()),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, '付款信息单', 'financePayInfoUuid', null, FinancePayInfo),
      new Filter(Filter.prototype.Type.HTTP_SELECTION, '会议室付款信息单', 'financeOfficePayUuid', null, FinanceOfficePay),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('spaceReservation', SpaceReservation);
    this.renderEntity("financePayInfo", FinancePayInfo);
    this.renderEntity("protocolSpace", ProtocolSpace);
    this.renderEntity("financeOfficePay", FinanceOfficePay);
    this.renderEntity('receiveTime', Date);
    this.renderEntity("posterTank", Tank);
    this.renderEntity("poster", Tank);

  }

  fillByFinancePayInfo(financePayInfo){
    this.financePayInfo = financePayInfo;
    this.name = financePayInfo.companyPrincipal + "的付款单";

    if(financePayInfo.performanceBond - financePayInfo.depositPaid > 0 ){
      this.category = Category.DEPOSIT;
      this.amount = Math.round((financePayInfo.performanceBond - financePayInfo.depositPaid) * 100) / 100;
    }else if(financePayInfo.total - financePayInfo.performanceBond - financePayInfo.rentalPaid){
      this.category = Category.RENTAL;
      this.amount = Math.round((financePayInfo.total - financePayInfo.performanceBond - financePayInfo.rentalPaid) * 100 ) / 100;
    }else{
      this.category = Category.LATE_FEE;
      this.amount = Math.round(financePayInfo.lateFee * 100) / 100;
    }

    this.companyName = financePayInfo.companyPrincipal;
    this.partyABank = financePayInfo.bank;
    this.partyABankAccount = financePayInfo.bankName;
    this.partyABankNo = financePayInfo.bankAccount;
    this.partyBBank = financePayInfo.protocolSpace.accountBank;
    this.partyBBankAccount = financePayInfo.protocolSpace.accountName;
    this.partyBBankNo = financePayInfo.protocolSpace.accountBankNumber;
  }

  fillByFinanceOfficePay(financeOfficePay){
    this.financeOfficePay = financeOfficePay;
    this.name = financeOfficePay.name;
    this.companyName = financeOfficePay.companyPrincipal;
    this.amount = financeOfficePay.amountPayable;
    this.category = Category.ROOM;
    this.partyABank = financeOfficePay.bank;
    this.partyABankAccount = financeOfficePay.bankName;
    this.partyABankNo = financeOfficePay.bankAccount;
  }

  validate() {
    if (this.category === Category.DEPOSIT) {
      if(this.type === Type.DEDUCTION) {
        this.errorMessage = "不能用扣除的履约保证金交履约保证金";
        return;
      }
    }
    if (!this.companyName) {
      this.errorMessage = "公司或负责人必填";
      return;
    }
    if (!this.amount) {
      this.errorMessage = "金额必填";
      return;
    }
    if (!this.receiveTime) {
      this.errorMessage = "收款时间必填";
      return;
    }
    if (!this.category) {
      this.errorMessage = "付款的类型必填";
      return;
    }
    if (!this.type) {
      this.errorMessage = "支付方式必填";
      return;
    }
    // if (this.type === Type.BANK) {
    //   if (!this.partyBBank) {
    //     this.errorMessage = "付款银行必填";
    //     return;
    //   }
    //   if (!this.partyBBankAccount) {
    //     this.errorMessage = "付款银行户名必填";
    //     return;
    //   }
    //   if (!this.partyBBankNo) {
    //     this.errorMessage = "付款银行账号必填";
    //     return;
    //   }
    // }
    if (!this.paymentNo) {
      this.errorMessage = "支付单号必填";
      return;
    }
    if (!this.poster.uuid) {
      this.errorMessage = "请上传支付凭证！";
      return;
    }
    this.errorMessage = null;
    return true;
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      financePayInfoUuid: this.financePayInfo.uuid,
      financeOfficePayUuid: this.financeOfficePay.uuid,
      companyName: this.companyName,
      amount: this.amount,
      receiveTime: simpleDateTime(this.receiveTime),
      partyABank:this.partyABank,
      partyABankAccount: this.partyABankAccount,
      partyABankNo: this.partyABankNo,
      partyBBank: this.partyBBank,
      partyBBankAccount: this.partyBBankAccount,
      partyBBankNo: this.partyBBankNo,
      remark: this.remark,
      category: this.category,
      type: this.type,
      status: this.status,
      poster:this.poster.uuid,
      posterUrl: this.posterUrl,
      paymentNo:this.paymentNo
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }
  httpReceivableSave (successCallback, errorCallback) {
    let that = this;
    let form = {
      financePayInfoUuid: this.financePayInfo.uuid,
      financeOfficePayUuid: this.financeOfficePay.uuid,
      companyName: this.companyName,
      amount: this.amount,
      receiveTime: simpleDateTime(this.receiveTime),
      partyABank:this.partyABank,
      partyABankAccount: this.partyABankAccount,
      partyABankNo: this.partyABankNo,
      partyBBank: this.partyBBank,
      partyBBankAccount: this.partyBBankAccount,
      partyBBankNo: this.partyBBankNo,
      remark: this.remark,
      category: this.category,
      type: this.type,
      status: this.status,
      poster:this.poster.uuid,
      posterUrl: this.posterUrl,
      paymentNo:this.paymentNo
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }
  httpOfficePosRefundDetail (uuid, successCallback, errorCallback) {
    let that = this;
    let form = {
      uuid: uuid
    };
    this.httpPost(FinanceBillReceipt.URL_OFFICE_POS_REFUND, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }
  httpPosRefundDetail (uuid, successCallback, errorCallback) {
    let that = this;
    let form = {
      uuid: uuid
    };
    this.httpPost(FinanceBillReceipt.URL_POS_REFUND, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpStatus(status, successCallback, errorCallback){
    let that = this;
    this.httpPost(FinanceBillReceipt.URL_STATUS, { "uuid": this.uuid,status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }
  //在pos支付或退款之前，测试后端是否正常
  httpPosTest (successCallback, errorCallback) {
    this.httpPost(FinanceBillReceipt.URL_POS_TEST, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
FinanceBillReceipt.registerEnum("Type", TypeMap);
FinanceBillReceipt.registerEnum("Category", CategoryMap);
FinanceBillReceipt.prototype.Status = Status;
FinanceBillReceipt.prototype.StatusMap = StatusMap;
FinanceBillReceipt.prototype.StatusList = FinanceBillReceipt.prototype.getStatusList();

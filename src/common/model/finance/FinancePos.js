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
  CONFIRMATION:'CONFIRMATION',
  REFUNDED:'REFUNDED'
};
let StatusMap = {
  CONFIRMATION:{
    value: "CONFIRMATION",
    name:"已确认支付",
    style: "#ff9a9a"
  },
  REFUNDED:{
    value: "REFUNDED",
    name:"已退款",
    style: "#ff9a9a"
  }
};
let Type = {
  //POS通消费 支付宝支付
  WEB_ALIPAY:"WEB_ALIPAY",
  //POS通消费 微信支付
  WEB_WECHAT:"WEB_WECHAT",
  //全民惠(银行卡)消费
  WEB_BANK:"WEB_BANK"
};

let TypeMap = {
  WEB_ALIPAY: {
    name: "支付宝二维码支付",
    value: "WEB_ALIPAY",
    style: "#84e599"
  },
  WEB_WECHAT: {
    name: "微信二维码支付",
    value: "WEB_WECHAT",
    style: "#84e599"
  },
  WEB_BANK: {
    name: "POS通银行卡支付",
    value: "WEB_BANK",
    style: "#84e599"
  }
};

export default class FinancePos extends BaseEntity {
  constructor(args) {
    super(args);
    //会议室 预定
    this.spaceReservation = new SpaceReservation();
    this.financePayInfo = new FinancePayInfo();
    this.financeOfficePay = new FinanceOfficePay();

    this.field_amt = null; //交易金额
    this.field_org_transno = null; //凭证号
    this.field_org_date = null; //交易日期
    this.field_org_ref = null; //交易参考号
    this.field_memo = null; //备注信息(pos通交易输入串码)
    this.fileUpload = new Tank('.rar|.zip', false, 1024 * 1024 * 50, '大小不能超过50M');
    this.payer = null;

    /*this.field_apptype = Type.POS_CONSUMER;*/
    this.pos_field_apptypes = Type.WEB_ALIPAY;
    this.status = Status.CONFIRMATION;
  }

  getTAG() {
    return "FinancePos"
  }
  /*render(obj) {
    super.render(obj);

  }*/
  static URL_STATUS = "/finance/bill/receipt/status";

  getFilters() {
    return []
  };

  render(obj) {
    super.render(obj);
  }
  validate() {
    /*if (!this.totalAmount) {
      this.errorMessage = "支付总金额必填";
      return;
    }*/
    this.errorMessage = null;
    return true;
  }

  httpSave (successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let url = "/api/finance/pay/info/pos";
    let form = {
    };
    this.httpPost(url, form, function (response) {
      that.render(response.data[that.getTAG()]);
      successCallback && successCallback(response);
    }, errorCallback);
  }

}
FinancePos.registerEnum("Type", TypeMap);
FinancePos.prototype.Status = Status;
FinancePos.prototype.StatusMap = StatusMap;
FinancePos.prototype.StatusList = FinancePos.prototype.getStatusList();

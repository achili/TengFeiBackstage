import BaseEntity from "../../_base/BaseEntity";
import FinanceBillReceipt from "../FinanceBillReceipt";

let Status = {
  OK: "OK"
}

let StatusMap = {
  OK: {
    name: "OK",
    value: "OK",
    style: "success",
    icon: "hourglass"
  }
}
export default class FinanceStatementItem extends BaseEntity {

  constructor(args) {
    super(args);
    //付款信息单发送日期
    this.sendTime = null;
    //付款信息单编号
    this.no = null;
    //款项描述
    this.category = null;
    //所属时间
//    this.payStartTime;
//    this.String payEndTime;
    this.payTime = null;
    //资产公司
    this.company = null;
    //付款公司
    this.companyName = null;

    //产品种类 p
    this.mainType = null;

    //合同编号
    this.contractNo = null;

    //押金
    this.performanceBond = 0;

    //不含税价 = 总额 - 增值税
    this.noTaxPrice = 0;

    //折扣额 P
    this.totalInnoToken = 0;

    //增值税额
    this.valueAddedTax = 0;

    //含税价= 总额
    this.taxPrice = 0;

    //状态
    this.status = Status.OK;

    //实际付款
    //付款时间 最后一次付款时间
    this.receiveTime = null;
    //应收金额
    this.total = 0;
    //实收金额
    this.alreadyPay = 0;


    //分次付款信息
    // this.bills = [];
    //实际渲染的时候需要一个
    //this.tds = [];
  }

  getTAG() {
    return "FinanceStatementItem"
  }

  render(obj) {
    super.render(obj);
  }

  getForm(){
    let form = {};
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    return form;
  }

  httpReport(params,successCallback,errorCallback){
    let that = this;

    this.httpPost(FinanceStatementItem.URL_REPORT,{ params }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
FinanceStatementItem.prototype.Status = Status;
FinanceStatementItem.prototype.StatusMap = StatusMap;
FinanceStatementItem.prototype.StatusList = FinanceStatementItem.prototype.getStatusList();

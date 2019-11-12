import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'

let Status = {
  OK: "OK"
};

let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "info"
  }
};

export default class Favour extends BaseEntity{

  constructor(args) {
    super(args);
    //合同签订方
    this.party = null;

    //法人或者授权人
    this.representative = null;

    //法人或者授权人电话
    this.representativePhone = null;

    //开户银行
    this.bank = null;

    //户名
    this.bankName = null;

    //开户银行账号
    this.bankNo = null;
    //纳税人识别号
    this.taxpayerCode = null
    //甲方地址
    this.partyAAddress = null
    //甲方电话
    this.partyASignPhone = null

    //签约地点
    this.signAddress = null;

    //财务信息，在付款信息单中用到
    //财务部联系人
    this.financeDuty = null;
    //财务部联系电话
    this.financePhone = null;
    //财务部地址
    this.financeAddress = null;

    //孵化空间
    this.incubatorSpace = null;

    //入驻地址
    this.entryAddress = null;

    this.status = Status.OK;
  }

  getTAG() {
    return "Favour"
  }

  static URL_FETCH = "/preference/fetch";

  getFilters() {
    return [
      new Filter("SORT", "ID", "orderId")
    ];
  };

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
  };

  httpFetch (successCallback, errorCallback) {
    let that = this;
    this.httpGet(Favour.URL_FETCH, {}, function (response) {
      that.render(response.data[that.getTAG()]);
      successCallback && successCallback(response);
    }, errorCallback);
  }
};






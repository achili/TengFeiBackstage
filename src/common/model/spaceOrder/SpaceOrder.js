import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date} from "../../filter/time";
import SpaceBuilding from "../space/SpaceBuilding";
import SpaceOffice from "../space/SpaceOffice";
import SpaceSeat from "../space/SpaceSeat";
import FinancePayInfo from "../finance/FinancePayInfo";
import SpaceRegional from "../space/SpaceRegional";
let Type = {
  'COMPANY': 'COMPANY',
  'SINGLE': 'SINGLE'
};
let TypeMap = {
  COMPANY: {
    name: "公司",
    value: "COMPANY",
    style: "success"
  },
  SINGLE: {
    name: "个人",
    value: "SINGLE",
    style: "warning"
  }
};
let Characteristic = {
  MOBILE_STATION: "MOBILE_STATION",
  INDEPENDENT_SPACE: "INDEPENDENT_SPACE"
};
let CharacteristicMap = {
  "MOBILE_STATION":{
    value: "MOBILE_STATION",
    val: "MOBILE_STATION",
    name:"移动办公桌",
    style: "warning"
  },
  "INDEPENDENT_SPACE":{
    value: "INDEPENDENT_SPACE",
    val: "INDEPENDENT_SPACE",
    name:"独立办公室",
    style: "success"
  }
};
let Status = {
  AUDITING:'AUDITING',
  ACCEPT:'ACCEPT',
  REFUSE:'REFUSE',
  HAVE_PAY:'HAVE_PAY',
  WAIT_PAY:'WAIT_PAY',
  REFUND:'REFUND'
};
let StatusMap = {
  AUDITING:{
    value: "AUDITING",
    name:"审核中",
    style: "#ffdc6f"
  },
  ACCEPT:{
    value: "ACCEPT",
    name:"已通过",
    style: "#84e599"
  },
  REFUSE:{
    value: "REFUSE",
    name:"未通过",
    style: "#ff9a9a"
  },
  HAVE_PAY:{
    value: "HAVE_PAY",
    name:"已支付",
    style: "#84e599"
  },
  WAIT_PAY:{
    value: "WAIT_PAY",
    name:"待支付",
    style: "#ff9a9a"
  },
  REFUND:{
    value: "REFUND",
    name:"已退款",
    style: "#ffdc6f"
  }
};

let AttributeMap = {
  "SOUTH":{
    val:"SOUTH",
    name:"朝南"
  },
  "BESIDE_THE_WINDOW":{
    val:"BESIDE_THE_WINDOW",
    name:"朝北"
  },
  "OFFICE_SUPPLIES":{
    val:"OFFICE_SUPPLIES",
    name:"靠窗"
  },
  "QUIET":{
    val:"QUIET",
    name:"带办公用品"
  },
  "NORTH":{
    val:"NORTH",
    name:"临近走道"
  },
  "NEAR_THE_AISLE":{
    val:"NEAR_THE_AISLE",
    name:"安静"
  }
};
export default class SpaceOrder extends BaseEntity {

  constructor(args) {
    super(args);
    //会议室类型
    this.name = "杭州";
    this.applyName = null;
    this.applyUser = new User();
    this.creator = new User();
    this.startTime = new Date();
    this.endTime = new Date();
    this.characteristic = CharacteristicMap.MOBILE_STATION.value;
    this.number = 0;
    this.remarks = null;
    this.status = Status.AUDITING;
    //中介机构
    this.agency = null;
    this.attribute = [];
    this.archive = null;
    //佣金
    this.commission = null;
    //所选空间集合
    this.spaceUuids = [];
    this.orderEmail = null;
    this.orderApp = null;
    this.orderSMS = null;
  }

  getTAG() {
    return "SpaceOrder"
  }

  static URL_STATUS = "/space/order/status";
  static URL_SEND = "/space/order/send";
  static URL_ADD_SPACE = "/space/order/add/space";
  static URL_ARCHIVE = "/space/order/archive";

  static SPACE_ORDER_REFUND = "/quick/order/offline/refund";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'创建者'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.INPUT, 'id', 'spaceOfficeUuid',null,null,null,false),
      new Filter(Filter.prototype.Type.INPUT, 'id', 'spaceSeatUuid',null,SpaceSeat,null,false),
      new Filter(Filter.prototype.Type.CHECK, '已删除', 'deleted'),
      new Filter("SORT", 'id', 'spaceOfficeUuid',null, SpaceOffice,null, false),
      new Filter("SORT", 'id', 'spaceSeatUuid',null, SpaceSeat,null, false),
      new Filter(Filter.prototype.Type.SELECTION,'类型','characteristic',this.getCharacteristicList()),
      new Filter("CHECK", "已归档", "archive"),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('applyUser', User);
    this.renderList("spaceOrderList", SpaceOrder);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }

  //修改状态
  httpStatus(status, spaceUuids, successCallback, errorCallback){
    let that = this;
    let form = {
      status: status,
      characteristic: this.characteristic,
      spaceUuids: JSON.stringify(this.spaceUuids)

  };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(SpaceOrder.URL_STATUS,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpSend(name,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,messageEnable,
           messageSubject,messageContent,smsEnable,smsPhone,smsContent,successCallback,errorCallback){
    let that = this;
    this.httpPost(SpaceOrder.URL_SEND,{ "uuid":this.uuid , name ,mailEnable,mailFromAddress,mailToAddress,mailSubject,mailContent,messageEnable,messageSubject,messageContent,smsEnable,smsPhone,smsContent }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpAddSpace (successCallback, errorCallback) {
    let that = this;
    let form = {
      characteristic: this.characteristic,
      spaceUuids: JSON.stringify(this.spaceUuids)
    };
    if (this.uuid != null) {
      form.uuid = this.uuid;
    }
    this.httpPost(SpaceOrder.URL_ADD_SPACE, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  availableStatusList() {
    let list = [];
    if (this.status === this.Status.AUDITING) {
      list.push(this.StatusMap[this.Status.ACCEPT]);
      list.push(this.StatusMap[this.Status.REFUSE]);
    }
    return list;
  }

  httpArchive(reason, successCallback, failureCallback){
    let that = this;
    let form = {
      uuid: this.uuid,
      archive: !this.archive,
      reason: reason
    };
    this.httpPost(SpaceOrder.URL_ARCHIVE,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, failureCallback)
  }

  spaceOrderRefund(uuid,successCallback, errorCallback){
    let that = this;
    this.httpPost(SpaceOrder.SPACE_ORDER_REFUND,{ "uuid":uuid }, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
SpaceOrder.registerEnum("Characteristic", CharacteristicMap);
SpaceOrder.prototype.Status = Status;
SpaceOrder.prototype.StatusMap = StatusMap;
SpaceOrder.prototype.StatusList = SpaceOrder.prototype.getStatusList();
SpaceOrder.prototype.Type = Type;
SpaceOrder.prototype.TypeMap = TypeMap;
SpaceOrder.prototype.TypeList = SpaceOrder.prototype.getTypeList();
SpaceOrder.registerEnum("Attribute", AttributeMap);

import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import Vue from 'vue';
import Filter from "../../_base/Filter";
import HttpForm from "../../_base/HttpForm";
import FormItem from "../../_base/FormItem";
import {simpleDateTime, str2Date} from "../../../filter/time";
import BookTour from "../../booktour/BookTour";
import FinancePayInfo from "../../finance/FinancePayInfo";

let CharacteristicMap = {
  "MOBILE_STATION":{
    val: "移动办公桌",
    name:"移动办公桌"
  },
  "PRIVATE_OFFICE":{
    val: "独立办公室",
    name:"独立办公室"
  },
  "ACTIVE_SITE":{
    val: "活动场地",
    name:"活动场地"
  },
  "CONFERENCE_ROOM":{
    val: "会议室",
    name:"会议室"
  }
};

let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE'
};
let StatusMap = {
  NOT_RECEIVE:{
    value: "NOT_RECEIVE",
    name:"未接待",
    style: "danger"
  },
  RECEIVE:{
    value: "RECEIVE",
    name:"已接待",
    style: "success"
  }
};

export default class AppointmentVisit extends BaseEntity{
  constructor(args) {
    super(args);
    this.creator = new User();
    this.address = '杭州';
    this.name = null;
    this.phone = null;
    this.mail = null;
    this.startTime = new Date();
    this.characteristic = [];
    this.remarks = null;
    this.status = Status.NOT_RECEIVE;
  }
  static STATUS_CHANGE_URL = "/appointment/visit/status";
  getTAG() {
    return "AppointmentVisit"
  }
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'姓名/电话'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '预约日期', 'startTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.INPUT, "所属空间", 'address'),
      new Filter(Filter.prototype.Type.INPUT, "所属月份", 'startMonth')
    ]
  };

  downloadEtlXLSUrl(address,month) {
    return Vue.http.options.root + "/appointment/visit/export/table?address=" + address + "&startMonth=" + month;
  }
  httpStatusChange(status, successCallback, failureCallback){
    let that = this;
    this.httpPost(AppointmentVisit.STATUS_CHANGE_URL,{ "uuid":this.uuid , status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, failureCallback)
  }

}
AppointmentVisit.registerEnum("Characteristic", CharacteristicMap);
AppointmentVisit.prototype.Status = Status;
AppointmentVisit.prototype.StatusMap = StatusMap;
AppointmentVisit.prototype.StatusList = AppointmentVisit.prototype.getStatusList();

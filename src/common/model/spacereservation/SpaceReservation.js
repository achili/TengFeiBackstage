import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDate, simpleDateTime, str2Date} from "../../filter/time";
import BookTour from "../booktour/BookTour";
import ConferenceRoom from "../conferenceroom/ConferenceRoom";
import SpaceRegional from "../space/SpaceRegional";

let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE',
  BE_OVERDUE:'BE_OVERDUE',
  WAIT_PAY:'WAIT_PAY',
  HAVE_PAY:'HAVE_PAY',
  REFUND:'REFUND',
  CANCEL:'CANCEL'
};
let StatusMap = {
  NOT_RECEIVE:{
    value: "NOT_RECEIVE",
    name:"未处理",
    style: "#ff9a9a"
  },
  RECEIVE:{
    value: "RECEIVE",
    name:"已处理",
    style: "#84e599"
  },
  BE_OVERDUE:{
    value: "BE_OVERDUE",
    name:"已过期",
    style: "#ff9a9a"
  },
  WAIT_PAY:{
    value: "WAIT_PAY",
    name:"付款中",
    style: "#ff9a9a"
  },
  HAVE_PAY:{
    value: "HAVE_PAY",
    name:"已付款",
    style: "#84e599"
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
let Type = {
  ORDINARY:'ORDINARY',
  VIP:'VIP',
  MANAGER:'MANAGER'
};

let TypeMap = {
  ORDINARY:{
    value: "ORDINARY",
    name:"普通用户"
  },
  VIP:{
    value: "VIP",
    name:"会员"
  },
  MANAGER:{
    value: "MANAGER",
    name:"社区经理"
  }
};
export default class SpaceReservation extends BaseEntity {

  constructor(args) {
    super(args);
    //会议室类型
    this.name = "默认类型";
    this.creator = new User();
    this.conferenceRoom = new ConferenceRoom();
    this.startTime = new Date();
    this.endTime = new Date();
    this.introduce = "详细说明";
    //封面图片
    this.posterTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.address = "详细地址";

    this.status = Status.AUDIT;
    this.type = Type.ORDINARY;
  }

  getTAG() {
    return "SpaceReservation"
  }
  static URL_STATUS = "/space/reservation/status";
  static OFFLINE_REFUND = "/space/reservation/offline/refund";
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'名称/简介/创建者'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '创建日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted',null,null,null,false),
      new Filter(Filter.prototype.Type.CHECK,"已创建完会议室付款信息",'record',null,null,null,false),
      new Filter(Filter.prototype.Type.SORT, '开始时间', 'orderStartTime'),
      new Filter(Filter.prototype.Type.SORT, '结束时间', 'orderEndTime'),
      new Filter(Filter.prototype.Type.SORT, '编号', 'orderNo'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null),
      new Filter(Filter.prototype.Type.SPACE_MULTI_SELECTION, "所属空间", "spaceRegionalUuids", null, SpaceRegional,null),
      new Filter(Filter.prototype.Type.CHECK,"我的会议室保留两个月",'isTwo',null,null,null,false)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('posterTank', Tank);
    this.renderEntity("conferenceRoom",ConferenceRoom);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/space/reservation/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "spaceReservation.uuid"),
        new FormItem(FormItem.prototype.Type.CONFERENCE_ROOM_SELECTION, "会议室", true, "conferenceRoom", "spaceReservation.conferenceRoom", new ConferenceRoom(),{ },FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.DATE,"开始时间",true,"startTime","spaceReservation.startTime",null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE,"结束时间",true,"endTime","spaceReservation.endTime",null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室价格", true, "price", "spaceReservation.price", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室地点", true, "location", "spaceReservation.location", null,{}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "要求备注", false, "remarks", "spaceReservation.remarks", null,{height: "300px"})
      ]
    );
  };
  //修改状态
  httpStatus(status,successCallback, errorCallback){
    let that = this;
    this.httpPost(SpaceReservation.URL_STATUS,{ "uuid":this.uuid , status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  offlineRefund(uuid,successCallback, errorCallback){
    let that = this;
    this.httpPost(SpaceReservation.OFFLINE_REFUND,{ "uuid":uuid }, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
SpaceReservation.prototype.Status = Status;
SpaceReservation.prototype.StatusMap = StatusMap;
SpaceReservation.prototype.StatusList = SpaceReservation.prototype.getStatusList();
SpaceReservation.prototype.Type = Type;
SpaceReservation.prototype.TypeMap = TypeMap;
SpaceReservation.prototype.TypeList = SpaceReservation.prototype.getTypeList();

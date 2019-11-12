import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import {simpleDateTime, str2Date} from "../../filter/time";

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

export default class BookTour extends BaseEntity{
  constructor(args) {
    super(args);
    this.creator = new User();
    this.address = '杭州';
    this.name = null;
    this.phone = null;
    this.startTime = new Date();
    this.characteristic = [];
    this.remarks = null;
    this.status = Status.NOT_RECEIVE;
  }
  getTAG() {
    return "BookTour"
  }

  static URL_STATUS = "/book/tour/status";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,'姓名/电话'),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '预约日期', 'orderStartTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)

    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.startTime = str2Date(this.startTime);
    if(this.characteristic && !(this.characteristic instanceof Array)){
      this.characteristic = JSON.parse( this.characteristic );
    }

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/book/tour/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "bookTour.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "预约参观地点", true, "address", "bookTour.address", null,{max: 20, placeholder: "这里填写地址"}),
        new FormItem(FormItem.prototype.Type.INPUT, "姓名", true, "name", "bookTour.name", null,{max: 30, placeholder: "姓名"}),
        new FormItem(FormItem.prototype.Type.INPUT, "电话", true, "phone", "bookTour.phone", null,{max: 11,min: 11, placeholder: "电话"}),
        new FormItem(FormItem.prototype.Type.DATE, "预约日期", true, "startTime", "bookTour.startTime",new Date(),{},function (){ return simpleDateTime(this.value) }),
        new FormItem(FormItem.prototype.Type.CHECKBOX,"我感兴趣的是(可多选)",true,"characteristic","bookTour.characteristic", null, {
          list: BookTour.prototype.CharacteristicList},FormItem.jsonTransformation  ),
        new FormItem(FormItem.prototype.Type.INPUT, "备注", false, "remarks", "bookTour.remarks", null,{max: 30, placeholder: "备注"})
      ]
    );
  };

  //修改状态
  httpStatus(status,successCallback, errorCallback){
    let that = this;
    this.httpPost(BookTour.URL_STATUS,{ "uuid":this.uuid , status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
BookTour.registerEnum("Characteristic", CharacteristicMap);
BookTour.prototype.Status = Status;
BookTour.prototype.StatusMap = StatusMap;
BookTour.prototype.StatusList = BookTour.prototype.getStatusList();

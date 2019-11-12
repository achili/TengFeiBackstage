import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime, str2Date} from "../../filter/time";
import ActiveSite from "../activesite/ActiveSite";
let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE'
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
  }
};
export default class SiteReservation extends BaseEntity {

  constructor(args) {
    super(args);

    this.name = "默认类型";
    this.creator = new User();
    this.startTime = new Date();
    this.endTime = new Date();
    this.introduce = "详细说明";
    //封面图片
    this.posterTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.address = "杭州";
    this.status = Status.NOT_RECEIVE;
  this.remarks =  null;
    //
    this.user = new User();
    this.activeSite = new ActiveSite()
  }

  getTAG() {
    return "SiteReservation"
  }
  static URL_STATUS = "/site/reservation/status";
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword',null,null,"备注/创建者"),
      new Filter(Filter.prototype.Type.SELECTION, '状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT, '使用日期', 'orderStartTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('posterTank', Tank);

    this.renderEntity('user', User);
    this.renderEntity('activeSite', ActiveSite);

    this.startTime = str2Date(this.startTime);
    //this.endTime = str2Date(this.endTime);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/site/reservation/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "siteReservation.uuid"),
        new FormItem(FormItem.prototype.Type.DATE, "预约日期", true, "startTime", "siteReservation.startTime", new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "场地地点", true, "address", "siteReservation.address", null,{}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "备注", false, "remarks", "siteReservation.remarks", null,{height: "300px"})
      ]
    );
  };
  //修改状态
  httpStatus(status,successCallback, errorCallback){
    let that = this;
    this.httpPost(SiteReservation.URL_STATUS,{ "uuid":this.uuid , status }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  validate() {
    if (!this.startTime) {
      this.errorMessage = '预约日期必填！';
      return
    }
    if(!this.name){
      this.errorMessage = '场地地点必填！';
      return
    }
    if(!this.user.uuid){
      this.errorMessage = '请选择一个用户！';
      return
    }
    if(!this.activeSite.uuid){
      this.errorMessage = '请选择一个活动场地！';
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
      startTime: simpleDateTime(this.startTime),
      name: this.name,
      address: this.address,
      remarks: this.remarks,
      user: this.user.uuid,
      activeSite: this.activeSite.uuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

}
SiteReservation.prototype.Status = Status;
SiteReservation.prototype.StatusMap = StatusMap;
SiteReservation.prototype.StatusList = SiteReservation.prototype.getStatusList();

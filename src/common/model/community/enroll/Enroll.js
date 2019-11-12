import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import CommunityEvents from "../CommunityEvents";

let Status = {
  REVIEW:'REVIEW',
  REVIEW_PASS:'REVIEW_PASS',
  REVIEW_REJECT:'REVIEW_REJECT'
};
let StatusMap = {
  REVIEW: {
    name: "审核中",
    value: "REVIEW",
    style: "warning"
  },
  REVIEW_PASS: {
    name: "审核通过",
    value: "REVIEW_PASS",
    style: "success"
  },
  REVIEW_REJECT: {
    name: "审核未通过",
    value: "REVIEW_REJECT",
    style: "danger"
  }
};

export default class Enroll extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.communityEvents = new CommunityEvents();

    this.status = StatusMap.REVIEW.value;
    this.reason = null;
    this.checked = false;
  }

  static URL_STATUS = "/enroll/status";
  static URL_SMS = "/enroll/sms";
  static URL_EMAIL= "/enroll/email";

  getTAG() {
    return "Enroll"
  }

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("communityEvents", CommunityEvents);
  }

  //修改状态
  httpStatus(status,reason,successCallback, errorCallback){
    let that = this;
    this.httpPost(Enroll.URL_STATUS,{ "uuid":this.uuid , status ,reason }, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //短信通知
  httpSMS(uuIds,successCallback, errorCallback){
    let that = this;
    this.httpPost(Enroll.URL_SMS,{ uuIds }, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //邮件通知
  httpEmail(uuIds,successCallback, errorCallback){
    let that = this;
    this.httpPost(Enroll.URL_EMAIL,{ uuIds }, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }
}
Enroll.prototype.Status = Status;
Enroll.prototype.StatusMap = StatusMap;
Enroll.prototype.StatusList = Enroll.prototype.getStatusList();

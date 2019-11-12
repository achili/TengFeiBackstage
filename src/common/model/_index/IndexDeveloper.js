import BaseEntity from "../_base/BaseEntity";

export default class IndexDeveloper extends BaseEntity {
  constructor() {
      super();

   //首页
    this.userCount = 0;
    this.conferenceRoomCount = 0;
    this.privilegeCorporateCount = 0;

    this.mobileStationCount = 0;
    this.independentSpaceCount = 0;

    //空闲工位数
    this.freeStationCount = 0;
    //预分配工位数
    this.preStationCount = 0;
    //占用工位数
    this.occupyStationCount = 0;

    //空闲房间数
    this.freeOfficeCount = 0;
    //预分配房间数
    this.preOfficeCount = 0;
    //占用房间数
    this.occupyOfficeCount = 0;

  //开发者中心
  //tank计算文件总数
    this.tankTotal = 0;
  //tank计算文件的总大小
    this.sizeTotal = 0;
    //日志
    this.logList = [];

  }

  getTAG() {
    return "IndexDeveloper"
  }

  static URL_STATISTIC = '/index/sta';
  static URL_MANAGE = '/index/manage';
  static URL_QR = '/qr/code';

  render(obj) {
    super.render(obj);
  }

  //获取计算总和
  httpManage(spaceRegional,successCallback, errorCallback) {
    let that = this;
    this.httpPost(IndexDeveloper.URL_MANAGE,{"spaceRegional":spaceRegional}, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //获取计算总和 和 获取日志
  httpStatistic(successCallback, errorCallback) {
    let that = this;
    this.httpGet(IndexDeveloper.URL_STATISTIC,{}, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //获取计算总和 和 获取日志
  httpQRCode(user,successCallback, errorCallback) {
    let that = this;
    this.httpGet(IndexDeveloper.URL_QR,{"user":user.uuid}, function (response) {
      // that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}

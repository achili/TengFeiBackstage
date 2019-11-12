import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import Tank from "../tank/Tank";
import {simpleDateTime, str2Date} from "../../../common/filter/time";
import Enroll from "./enroll/Enroll";
import SpaceRegional from "../space/SpaceRegional";

export default class CommunityEvents extends BaseEntity{
  constructor(args) {
    super(args);
    //图片
    this.poster = new Tank('image', false, 5 * 1024 * 1024, '图片不能超过1M');
    this.posterUrl = null;
    this.creator = new User();
    //标题
    this.title = null;
    this.startTime = new Date();
    this.endTime = new Date();

    this.timeStart = new Date();
    this.timeEnd = new Date();

    this.place = null;
    this.description = null;
    this.address = {lng: null, lat: null, address: ""};

    //报名
    this.enrolls = [];
  }
  getTAG() {
    return "CommunityEvents"
  }

  static URL_ENROLL = "/community/events/enroll";

  //获取静态地图
  getStaticImage(){  //&size=750*300 宽 * 高
    return 'http://restapi.amap.com/v3/staticmap?location=' + this.address.lng + ',' + this.address.lat + '&size=750*300&zoom=10&markers=mid,,A:' + this.address.lng + ',' + this.address.lat + '&key=0bc4ea1d32f89194bc7840b91afc7cc0';
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,'已删除','deleted'),
      new Filter(Filter.prototype.Type.CHECK, '已过期', 'overdue'),
      new Filter(Filter.prototype.Type.CHECK,"所有",'all'),
      new Filter(Filter.prototype.Type.SPACE_SELECTION, "所属空间", "spaceRegionalUuid", null, null,null)
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('startTime', Date);
    this.renderEntity('endTime', Date);
    this.renderEntity('timeStart', Date);
    this.renderEntity('timeEnd', Date);

    this.renderEntity('poster', Tank);
    this.renderList("enrolls", Enroll);
    this.address = JSON.parse(this.address);
  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/community/events/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "communityEvents.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT_SPACE, "所属空间", true, "spaceRegional", "communityEvents.spaceRegional", new SpaceRegional(),{},FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "communityEvents.poster",  new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "title", "communityEvents.title", null,{max: 20, placeholder: "这里填写名称"}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "描述", true, "description", "communityEvents.description", null,{max: 500, placeholder: "提示文字"}),
        new FormItem(FormItem.prototype.Type.DATE, "报名开始时间", true, "startTime", "communityEvents.startTime",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "报名结束时间", true, "endTime", "communityEvents.endTime",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "活动开始时间", true, "timeStart", "communityEvents.timeStart",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "活动结束时间", true, "timeEnd", "communityEvents.timeEnd",new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.MAP_ADDRESS, "地图地址", true, "address", "communityEvents.address", {lng: null, lat: null, address: ""}, {}, function () {
          return JSON.stringify(this.value)
        })
      ]
    );
  };

  httpEnroll(successCallback, errorCallback){
    let that = this;
    let form = {
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityEvents.URL_ENROLL,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

}
